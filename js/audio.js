"use strict";
/* ============================================================
   REPRODUCTOR DE AUDIO
   ------------------------------------------------------------
   · Busca AUDIO_DIR + <clave>.mp3. Si no existe, usa la voz del
     sistema (texto a voz) con el guion de la pantalla.
   · La barra de progreso es continua: avanza cuadro a cuadro y, si
     una pantalla tiene varios audios, los muestra como una sola pista.
   · Informa en cada cuadro la posición exacta de la narración
     (carácter del guion y segundo) para sincronizar el contenido.
   ============================================================ */

var heard = {};            // claves de audio escuchadas completas
var audioUnlocked = false; // el navegador exige un clic antes de reproducir
var knownDur = {};         // duraciones reales conocidas (s) por clave

var AU = new Audio(); AU.preload = "auto";
var _primer = new Audio("data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAIlYAAESsAAACABAAZGF0YQAAAAA=");
var _primed = false, AC = null, GAIN = null, bufCache = {}, missing = {}, curSrc = null, startedAt = 0;

function ensureAC() {
  if (AC) return AC;
  try { var C = window.AudioContext || window.webkitAudioContext; if (!C) return null; AC = new C(); GAIN = AC.createGain(); GAIN.gain.value = 1; GAIN.connect(AC.destination); } catch (e) { AC = null; }
  return AC;
}
/** Desbloquea el audio del navegador (debe llamarse dentro de un clic). */
function primeAudio() {
  if (!_primed) { _primed = true; try { _primer.volume = 0.001; var pp = _primer.play(); if (pp && pp.catch) pp.catch(function () {}); } catch (e) {} }
  try { var ac = ensureAC(); if (ac) { if (ac.state === "suspended") ac.resume(); var b = ac.createBuffer(1, 1, 22050), sN = ac.createBufferSource(); sN.buffer = b; sN.connect(ac.destination); try { sN.start(0); } catch (e) {} } } catch (e) {}
}

/* ---------- Voz del sistema: prioriza español latinoamericano ---------- */
var synth = window.speechSynthesis || null, VOICE = null, TOK = 0;
function pickVoice() {
  if (!synth) return null; var v = []; try { v = synth.getVoices() || []; } catch (e) {}
  var pref = ["es-PE", "es-419", "es-MX", "es-US", "es-CO", "es-CL", "es-AR", "es-ES"];
  for (var p = 0; p < pref.length; p++) {
    var f = v.filter(function (x) { return (x.lang || "").replace("_", "-").toLowerCase() === pref[p].toLowerCase(); });
    if (f.length) { VOICE = f.find(function (x) { return /natural|online|google/i.test(x.name); }) || f[0]; return VOICE; }
  }
  VOICE = v.find(function (x) { return /^es/i.test(x.lang || ""); }) || null; return VOICE;
}
if (synth) { pickVoice(); try { synth.onvoiceschanged = pickVoice; } catch (e) {} }

/* ---------- Estado del reproductor ---------- */
var P = {
  key: "", text: "", mode: "", playing: false, vol: 1, ccOn: false,
  onEnd: null, onTick: null, est: 3, raf: null, offset: 0, len: 0, words: [],
  pendingPlay: false, decided: false, ended: false, gen: 0, startAt: 0,
  track: null,      // {base, total, seg, slide}: pista continua de la pantalla
  dispG: 0,         // progreso mostrado (0-1), siempre creciente durante la reproducción
  syncPos: 0,       // carácter exacto que se está narrando
  itemAudio: false  // true = audio de una tarjeta o retroalimentación
};
var playBtn = $("#playBtn"), seek = $("#seek"), seekFill = $("#seekFill"), knob = $("#knob"), tCur = $("#tCur"), tTot = $("#tTot"),
    volEl = $("#vol"), volBtn = $("#volBtn"), ccBtn = $("#ccBtn"), transcript = $("#transcript"), transcriptText = $("#transcriptText"),
    lockBadge = $("#lockBadge"), srcBadge = $("#srcBadge");

function setPlayIcon(p) { playBtn.innerHTML = svg(p ? "pause" : "play", 19); playBtn.setAttribute("aria-label", p ? "Pausar" : "Reproducir"); }
function fmt(t) { t = Math.max(0, Math.round(t)); var m = Math.floor(t / 60), s = t % 60; return m + ":" + (s < 10 ? "0" : "") + s; }
function volIcon() { volBtn.innerHTML = svg(P.vol === 0 ? "volOff" : P.vol < .5 ? "volLo" : "volHi", 19); }
function setSrc(m) { if (!srcBadge || RESTRICT) return; // indicador visible solo en la versión SIN (revisión)
  srcBadge.textContent = m === "tts" || m === "sim" ? "VOZ DEL SISTEMA" : m ? "MP3" : ""; }
function estimateDur(text) { return Math.max(2, ((text || "").match(/\S+/g) || []).length / 2.55); }
function durOf(k, t) { return knownDur[k] || estimateDur(t); }
function splitWords(t) { var a = [], re = /\S+\s*/g, m; while ((m = re.exec(t)) !== null) a.push({ w: m[0], start: m.index }); return a; }
function buildTranscript() { P.words = splitWords(P.text); transcriptText.innerHTML = P.words.map(function (o) { return '<span class="w">' + esc(o.w) + "</span>"; }).join(""); }
function wordSnap(pos) { var b = 0; for (var i = 0; i < P.words.length; i++) { if (P.words[i].start <= pos) b = P.words[i].start; else break; } return b; }

/** Recalcula la duración total de la pista cuando se conoce la duración real de un audio. */
function refreshTrack() {
  if (!P.track) return;
  var s = SLIDES[P.track.slide], base = 0, total = 0;
  s.narr.forEach(function (a, k) { var d = (k === P.track.seg) ? P.est : durOf(a.k, a.t); if (k < P.track.seg) base += d; total += d; });
  P.track.base = base; P.track.total = total;
}

var _lastWord = -1;
/**
 * Dibuja el avance. r = avance (0-1) del audio actual.
 * La barra muestra el avance de toda la pista de la pantalla.
 */
function renderProgress(r) {
  r = Math.max(0, Math.min(1, r));
  var cur = r * P.est, base = P.track ? P.track.base : 0, total = P.track ? P.track.total : P.est;
  var g = Math.min(1, (base + cur) / Math.max(0.01, total));
  if (P.playing && g < P.dispG && P.dispG - g < 0.03) g = P.dispG; // sin retrocesos visuales
  P.dispG = g;
  seekFill.style.transform = "scaleX(" + g.toFixed(4) + ")";
  knob.style.left = (g * 100).toFixed(3) + "%";
  tCur.textContent = fmt(base + cur); tTot.textContent = fmt(total);
  if (P.mode !== "tts") P.syncPos = r * P.len;
  if (P.onTick) P.onTick(r, P.syncPos, cur);
  if (!P.ccOn) return;
  var pos = P.syncPos, ai = -1;
  for (var i = 0; i < P.words.length; i++) { if (pos >= P.words[i].start) ai = i; else break; }
  if (ai !== _lastWord) { var sp = transcriptText.children; if (sp[_lastWord]) sp[_lastWord].classList.remove("act"); if (sp[ai]) sp[ai].classList.add("act"); _lastWord = ai; }
}
function isHeard() { return !!heard[P.key]; }
function updateSeekLock() { var locked = RESTRICT && !isHeard(); seek.classList.toggle("locked", locked); lockBadge.classList.toggle("show", locked && !!P.text); }

/**
 * Prepara un audio sin reproducirlo.
 * @param {string} key   nombre del archivo (sin .mp3)
 * @param {string} text  guion (subtítulos y voz del sistema)
 * @param {function} onEnd se ejecuta al escucharlo completo
 */
function prepare(key, text, onEnd) {
  stopPlayback(true); TOK++; var my = TOK;
  P.key = key || ""; P.text = text || ""; P.onEnd = onEnd || null; P.onTick = null; P.mode = ""; P.decided = false; P.ended = false;
  P.pendingPlay = false; P.len = P.text.length; P.offset = 0; P.buffer = null; P.startAt = 0; P.syncPos = 0; P.dispG = 0; P.track = null; _lastWord = -1;
  P.est = durOf(P.key, P.text);
  buildTranscript(); renderProgress(0); setPlayIcon(false); updateSeekLock(); playBtn.disabled = !P.text; setSrc("");
  if (!P.key || missing[P.key]) { P.decided = true; P.mode = "tts"; setSrc("tts"); return; }
  var C = window.AudioContext || window.webkitAudioContext;
  if (C) {
    if (bufCache[P.key]) { useBuffer(bufCache[P.key]); return; }
    loadArrayBuffer(AUDIO_DIR + encodeURIComponent(P.key) + ".mp3", function (ab) {
      if (my !== TOK) return; var ac = ensureAC(); if (!ac) { prepareHTML(my); return; }
      var fired = false;
      var okf = function (buf) { if (fired || my !== TOK) return; fired = true; bufCache[P.key] = buf; useBuffer(buf); if (P.pendingPlay) { P.pendingPlay = false; beginPlayback(); } };
      var erf = function () { if (fired) return; fired = true; if (my === TOK) prepareHTML(my); };
      try { var pr = ac.decodeAudioData(ab, okf, erf); if (pr && pr.then) pr.then(okf).catch(erf); } catch (e) { erf(); }
    }, function () { if (my !== TOK) return; prepareHTML(my); });
    return;
  }
  prepareHTML(my);
}
function useBuffer(buf) { P.buffer = buf; P.mode = "webaudio"; P.est = buf.duration; knownDur[P.key] = buf.duration; P.decided = true; refreshTrack(); renderProgress(0); setSrc("mp3"); }
function loadArrayBuffer(url, ok, fail) {
  try {
    var x = new XMLHttpRequest(); x.open("GET", url, true); x.responseType = "arraybuffer";
    x.onload = function () { if (x.response && x.response.byteLength > 256 && ((x.status >= 200 && x.status < 300) || x.status === 0)) ok(x.response); else fail(); };
    x.onerror = function () { fail(); }; x.send();
  } catch (e) { fail(); }
}
/** Alternativa con <audio> si Web Audio no puede decodificar el archivo. */
function prepareHTML(my) {
  try { AU.pause(); } catch (e) {}
  var toTTS = function () { if (my !== TOK || P.decided) return; missing[P.key] = true; P.decided = true; P.mode = "tts"; setSrc("tts"); if (P.pendingPlay) { P.pendingPlay = false; beginPlayback(); } };
  var decide = function () {
    if (my !== TOK || P.decided) return; P.decided = true; P.mode = "audio";
    if (isFinite(AU.duration) && AU.duration > 0) { P.est = AU.duration; knownDur[P.key] = AU.duration; refreshTrack(); }
    renderProgress(0); setSrc("mp3"); if (P.pendingPlay) { P.pendingPlay = false; beginPlayback(); }
  };
  AU.onloadeddata = decide; AU.oncanplay = decide;
  AU.ondurationchange = function () { if (isFinite(AU.duration) && AU.duration > 0 && P.mode === "audio") { P.est = AU.duration; knownDur[P.key] = AU.duration; refreshTrack(); } };
  AU.onerror = toTTS;
  AU.onended = function () { if (my !== TOK) return; onPlaybackEnd(); };
  AU.src = AUDIO_DIR + encodeURIComponent(P.key) + ".mp3"; try { AU.load(); } catch (e) {}
  setTimeout(toTTS, 3500);
}

/** Inicia la reproducción según el modo decidido, respetando P.startAt (0-1). */
function beginPlayback() {
  var r = P.startAt || 0; P.startAt = 0; P.ended = false;
  if (P.mode === "webaudio") startWeb(r ? r * P.buffer.duration : P.offset);
  else if (P.mode === "audio") { if (r) { try { AU.currentTime = r * (AU.duration || 0); } catch (e) {} } startAudio(); }
  else startTTS(r ? wordSnap(r * P.len) : P.offset);
}

/* ---------- Web Audio (MP3) ---------- */
function startWeb(offset) {
  var ac = ensureAC(); if (!ac || !P.buffer) return;
  P.offset = Math.max(0, Math.min(offset || 0, P.buffer.duration - 0.01)); P.mode = "webaudio"; P.ended = false; P.playing = true; setPlayIcon(true);
  var my = TOK;
  var begin = function () {
    if (TOK !== my || !P.playing) return;
    try { if (curSrc) { curSrc._stop = true; curSrc.stop(); } } catch (e) {}
    var node = ac.createBufferSource(); node.buffer = P.buffer; GAIN.gain.value = P.vol; node.connect(GAIN); curSrc = node; node._stop = false;
    node.onended = function () { if (TOK !== my || node._stop) return; onPlaybackEnd(); };
    startedAt = ac.currentTime - P.offset; try { node.start(0, P.offset); } catch (e) {}
    loopWeb();
  };
  if (ac.state === "suspended") { var pr = ac.resume(); if (pr && pr.then) pr.then(begin).catch(begin); else begin(); } else begin();
}
function loopWeb() { if (!P.playing || P.mode !== "webaudio") return; var r = P.buffer ? (AC.currentTime - startedAt) / P.buffer.duration : 0; renderProgress(Math.min(1, r)); if (r < 1) P.raf = requestAnimationFrame(loopWeb); }
function pauseWeb() { if (AC && P.buffer) P.offset = Math.max(0, Math.min(AC.currentTime - startedAt, P.buffer.duration)); try { if (curSrc) { curSrc._stop = true; curSrc.stop(); } } catch (e) {} P.playing = false; setPlayIcon(false); if (P.raf) cancelAnimationFrame(P.raf); }

/* ---------- <audio> ---------- */
function startAudio() {
  P.ended = false; P.playing = true; setPlayIcon(true); AU.volume = P.vol;
  try { if (AU.ended) AU.currentTime = 0; } catch (e) {}
  var my = TOK;
  var go = function () { if (TOK !== my || !P.playing) return; AU.oncanplaythrough = null; var pr = AU.play(); if (pr && pr.catch) pr.catch(function () {}); loopAudio(); };
  if (AU.readyState >= 3) go(); else { AU.oncanplaythrough = go; setTimeout(go, 1500); }
}
function loopAudio() { if (!P.playing || P.mode !== "audio") return; var d = (isFinite(AU.duration) && AU.duration > 0) ? AU.duration : P.est; renderProgress(d ? AU.currentTime / d : 0); P.raf = requestAnimationFrame(loopAudio); }

/* ---------- Voz del sistema ----------
   El guion se divide en frases (evita el corte de audios largos en Chrome).
   El inicio de cada frase es una posición exacta del guion: se usa para
   sincronizar los bloques. Si el navegador no tiene voz, se simula la
   duración real para que nadie avance sin esperar. */
function ttsChunks(text, from) {
  var out = [], sub = text.slice(from), re = /[^.!?;:]+[.!?;:]*["”»)]*\s*/g, m;
  while ((m = re.exec(sub)) !== null) {
    if (!m[0].trim()) continue; var t = m[0], s = from + m.index;
    while (t.length > 230) { var cut = t.lastIndexOf(",", 220); if (cut < 60) cut = t.lastIndexOf(" ", 220); out.push({ t: t.slice(0, cut + 1), s: s }); s += cut + 1; t = t.slice(cut + 1); }
    out.push({ t: t, s: s });
  }
  return out;
}
function startTTS(pos) {
  P.ended = false; P.playing = true; setPlayIcon(true); P.mode = P.mode === "sim" ? "sim" : "tts";
  P.offset = pos || 0; P.syncPos = P.offset; P.ttsBoundary = false; P.gen++; P.t0 = performance.now(); P.pos0 = P.offset;
  var gen = P.gen, my = TOK;
  if (!synth || P.mode === "sim") { startSim(P.offset); return; }
  try { synth.cancel(); } catch (e) {}
  if (!VOICE) pickVoice();
  var chunks = ttsChunks(P.text, P.offset), ci = 0;
  function next() {
    if (TOK !== my || gen !== P.gen || !P.playing) return;
    if (ci >= chunks.length) { knownDur[P.key] = knownDur[P.key] || (performance.now() - P.t0) / 1000 / Math.max(0.05, 1 - P.pos0 / Math.max(1, P.len)); renderProgress(1); onPlaybackEnd(); return; }
    var c = chunks[ci++], started = false, done = false, wd;
    P.chunk = c; P.chunkStart = performance.now(); P.chunkEst = Math.max(1, (c.t.match(/\S+/g) || []).length / 2.55); P.syncPos = c.s; P.ttsBoundary = false;
    var u = new SpeechSynthesisUtterance(c.t); u.lang = VOICE ? VOICE.lang : "es-ES"; if (VOICE) u.voice = VOICE; u.rate = 1; u.volume = P.vol;
    var fin = function () {
      if (done) return; done = true; clearTimeout(wd); if (gen !== P.gen) return;
      var el = performance.now() - P.chunkStart;
      if ((!started || el < P.chunkEst * 1000 * 0.3) && c.t.length > 25) { try { synth.cancel(); } catch (e) {} P.gen++; startSim(c.s); return; }
      setTimeout(next, 40);
    };
    u.onstart = function () { started = true; P.chunkStart = performance.now(); };
    u.onboundary = function (e) { if (gen !== P.gen) return; P.ttsBoundary = true; P.syncPos = Math.max(P.syncPos, c.s + (e.charIndex || 0)); };
    u.onend = fin;
    u.onerror = function (e) { if (e && (e.error === "interrupted" || e.error === "canceled")) return; fin(); };
    wd = setTimeout(function () {
      if (!started && gen === P.gen) { try { synth.cancel(); } catch (e) {} P.gen++; startSim(c.s); return; }
      fin();
    }, Math.max(4000, P.chunkEst * 2200 + 3000));
    try { synth.speak(u); } catch (e) { fin(); }
  }
  next(); loopTTS();
}
/** Avance mostrado con voz del sistema: interpolación continua dentro de la frase. */
function loopTTS() {
  if (!P.playing || P.mode !== "tts") return;
  var c = P.chunk, pos = P.syncPos;
  if (c) { var f = Math.min(1, (performance.now() - P.chunkStart) / (P.chunkEst * 1000)); pos = Math.max(pos, c.s + f * c.t.length * 0.98); }
  renderProgress(Math.min(.995, pos / Math.max(1, P.len)));
  P.raf = requestAnimationFrame(loopTTS);
}
/** Reproducción simulada (sin voz disponible): mismo tiempo que tomaría narrarla. */
function startSim(fromChar) {
  P.mode = "sim"; setSrc("sim"); P.playing = true; setPlayIcon(true);
  P.simStart = performance.now() - (fromChar / Math.max(1, P.len)) * P.est * 1000; loopSim();
}
function loopSim() {
  if (!P.playing || P.mode !== "sim") return;
  var r = (performance.now() - P.simStart) / (P.est * 1000);
  if (r >= 1) { renderProgress(1); onPlaybackEnd(); return; }
  renderProgress(r); P.raf = requestAnimationFrame(loopSim);
}
function curRatio() {
  if (P.mode === "sim") return Math.min(.999, (performance.now() - P.simStart) / (P.est * 1000));
  return Math.min(.999, (P.syncPos || 0) / Math.max(1, P.len));
}
function pausePlayback() {
  if (P.mode === "webaudio") { pauseWeb(); return; }
  if (P.mode === "audio") { try { AU.pause(); } catch (e) {} }
  else { P.offset = wordSnap(curRatio() * P.len); P.gen++; if (synth && P.mode === "tts") { try { synth.cancel(); } catch (e) {} } }
  P.playing = false; setPlayIcon(false); if (P.raf) cancelAnimationFrame(P.raf);
}
function stopPlayback(silent) {
  P.gen++; try { if (curSrc) { curSrc._stop = true; curSrc.stop(); } } catch (e) {} try { AU.pause(); } catch (e) {}
  if (synth) { try { synth.cancel(); } catch (e) {} }
  P.playing = false; if (P.raf) cancelAnimationFrame(P.raf); if (!silent) setPlayIcon(false);
}
/** Fin del audio: se marca como escuchado completo y se notifica. */
function onPlaybackEnd() {
  if (P.ended) return; P.ended = true; P.playing = false; setPlayIcon(false); if (P.raf) cancelAnimationFrame(P.raf);
  P.syncPos = P.len; renderProgress(1); P.offset = 0; heard[P.key] = true; updateSeekLock();
  var cb = P.onEnd; P.onEnd = null; P.onTick = null;
  if (cb) setTimeout(cb, 250);
  if (typeof tryComplete === "function") tryComplete(idx);
}

/** Botón reproducir / pausar. */
function play() {
  audioUnlocked = true; primeAudio();
  if (P.playing) { pausePlayback(); return; }
  if (!P.text) return;
  // Si ya terminó la narración de la pantalla, se vuelve a escuchar desde el inicio (con sincronización).
  if (P.ended && !P.itemAudio && SLIDES[idx] && SLIDES[idx].narr && narrHeard(idx)) { startNarr(idx, 0, true); return; }
  if (!P.decided) { P.pendingPlay = true; return; }
  beginPlayback();
}
/** Reproduce un audio puntual (tarjetas, retroalimentación de casos). */
function speak(key, text, onEnd, onTick) { prepare(key, text, onEnd); P.itemAudio = true; if (onTick) P.onTick = onTick; play(); }

/* ---------- Barra de progreso: arrastrar para avanzar (tras escuchar completo) ---------- */
function seekTo(x) {
  if (RESTRICT && !isHeard()) return;
  var r0 = seek.getBoundingClientRect(), g = Math.max(0, Math.min(1, (x - r0.left) / r0.width));
  if (P.track) {
    var s = SLIDES[P.track.slide], T = g * P.track.total, acc = 0;
    for (var k = 0; k < s.narr.length; k++) {
      var d = k === P.track.seg ? P.est : durOf(s.narr[k].k, s.narr[k].t);
      if (T <= acc + d || k === s.narr.length - 1) {
        var local = Math.max(0, Math.min(.999, (T - acc) / d));
        if (k !== P.track.seg) { startNarr(P.track.slide, k, true, local); return; }
        seekLocal(local); return;
      }
      acc += d;
    }
  }
  seekLocal(g);
}
function seekLocal(r) {
  P.dispG = 0;
  if (P.mode === "webaudio") { P.offset = r * (P.buffer ? P.buffer.duration : P.est); if (P.playing) startWeb(P.offset); else renderProgress(r); }
  else if (P.mode === "audio") { try { AU.currentTime = r * (AU.duration || 0); } catch (e) {} renderProgress(r); }
  else { P.offset = wordSnap(r * P.len); P.syncPos = P.offset; if (P.playing) { P.gen++; startTTS(P.offset); } else renderProgress(r); }
}
var seeking = false;
seek.addEventListener("mousedown", function (e) { if (RESTRICT && !isHeard()) return; seeking = true; seekTo(e.clientX); });
window.addEventListener("mousemove", function (e) { if (seeking && !P.track) seekTo(e.clientX); });
window.addEventListener("mouseup", function (e) { seeking = false; });
seek.addEventListener("touchstart", function (e) { seekTo(e.touches[0].clientX); }, { passive: true });

/* ---------- Volumen y subtítulos ---------- */
function applyVol() { if (P.mode === "webaudio") { if (GAIN) GAIN.gain.value = P.vol; } else if (P.mode === "audio") { AU.volume = P.vol; } else if (P.playing && P.mode === "tts") { P.gen++; startTTS(wordSnap(curRatio() * P.len)); } }
var volTimer = null;
volEl.addEventListener("input", function () { P.vol = parseInt(volEl.value, 10) / 100; volIcon(); clearTimeout(volTimer); volTimer = setTimeout(applyVol, 200); });
volBtn.addEventListener("click", function () { if (P.vol > 0) { P._prev = P.vol; P.vol = 0; volEl.value = 0; } else { P.vol = P._prev || 1; volEl.value = Math.round(P.vol * 100); } volIcon(); applyVol(); });
ccBtn.addEventListener("click", function () { P.ccOn = !P.ccOn; transcript.classList.toggle("on", P.ccOn); ccBtn.classList.toggle("on", P.ccOn); ccBtn.setAttribute("aria-pressed", P.ccOn); _lastWord = -1; fitScene(); });
playBtn.addEventListener("click", play);
setPlayIcon(false); volIcon();
