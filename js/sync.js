"use strict";
/* ============================================================
   NARRACIÓN DE PANTALLA Y SINCRONIZACIÓN TEXTO–AUDIO
   ------------------------------------------------------------
   Cada pantalla tiene una lista de audios (s.narr) que suenan en
   orden como una sola pista. Los elementos con data-g="n" pertenecen
   al audio n y se muestran y resaltan en el momento en que la
   narración llega a su frase (data-cue).

   Cómo se determina el momento de cada bloque:
   1. MP3 con marcas en SYNC_TIMES → segundo exacto indicado.
   2. Voz del sistema → posición exacta de la frase que se pronuncia.
   3. MP3 sin marcas → posición de la frase dentro del guion
      convertida al tiempo del audio.
   Los elementos sin data-cue se reparten a lo largo del audio.
   ============================================================ */

function narrHeard(i) { var s = SLIDES[i]; return !s.narr || s.narr.every(function (a) { return heard[a.k]; }); }
function groupEls(i, g) { return $$('[data-g="' + g + '"]', scenes[i]); }
function allSyncEls(i) { return $$("[data-g]", scenes[i]); }
function hideGroup(i, g) { groupEls(i, g).forEach(function (e) { e.classList.remove("in", "now"); }); }
function revealGroup(i, g) { groupEls(i, g).forEach(function (e) { e.classList.add("in"); e.classList.remove("now"); }); fitScene(scenes[i]); }
function clearNow(i) { $$(".now", scenes[i]).forEach(function (e) { e.classList.remove("now"); }); }
function hideAll(i) { allSyncEls(i).forEach(function (e) { e.classList.remove("in", "now"); }); }
/** Muestra todo (pantalla ya vista o versión sin restricciones). */
function revealAll(i, stagger) {
  allSyncEls(i).forEach(function (e, k) {
    e.classList.remove("now");
    if (stagger) setTimeout(function () { e.classList.add("in"); fitScene(scenes[i]); }, 80 + k * stagger); else e.classList.add("in");
  });
  fitScene(scenes[i]);
}

/**
 * Calcula el punto de activación de cada elemento del audio g.
 * Devuelve [{el, pos (carácter del guion), time (s o null)}] en orden.
 */
function cueList(i, g, a) {
  var els = groupEls(i, g), n = els.length, low = a.t.toLowerCase(), times = SYNC_TIMES[a.k], prev = 0;
  return els.map(function (el, k) {
    var cue = el.getAttribute("data-cue"), pos = -1;
    if (cue) {
      pos = low.indexOf(cue.toLowerCase(), prev);
      if (pos < 0) pos = low.indexOf(cue.toLowerCase());
      if (pos < 0 && window.console) console.warn("[sync] Frase no encontrada en el guion de " + a.k + ": «" + cue + "»");
    }
    if (pos < 0) pos = Math.round((k / Math.max(1, n)) * 0.82 * a.t.length);
    pos = Math.max(pos, prev); prev = pos;
    return { el: el, pos: pos, time: times && times[k] != null ? +times[k] : null };
  });
}

/** Muestra los bloques alcanzados por la narración y resalta el que se está narrando. */
function applyCues(i, cues, pos, sec) {
  var useTime = (P.mode === "webaudio" || P.mode === "audio") && cues.length && cues[0].time !== null;
  var now = null;
  cues.forEach(function (c) {
    var reached = useTime ? sec >= c.time - 0.05 : pos >= c.pos - 1;
    if (reached) { if (!c.el.classList.contains("in")) { c.el.classList.add("in"); fitScene(scenes[i]); } now = c.el; }
  });
  cues.forEach(function (c) { c.el.classList.toggle("now", c.el === now); });
}

/**
 * Reproduce el audio `seg` de la pantalla i (y luego los siguientes).
 * @param {boolean} force   reproducir aunque ya se haya escuchado (repetición)
 * @param {number}  startAt posición inicial 0-1 dentro de ese audio (al saltar en la barra)
 */
function startNarr(i, seg, force, startAt) {
  var s = SLIDES[i]; if (!s.narr || !s.narr[seg]) return;
  var a = s.narr[seg];
  var willPlay = audioUnlocked && (force || !heard[a.k] || !RESTRICT);
  if (willPlay) {
    // Pantalla limpia desde el punto que se va a narrar: lo anterior visible, lo siguiente oculto.
    for (var g = 0; g < s.narr.length; g++) { if (g < seg) revealGroup(i, g); else hideGroup(i, g); }
    clearNow(i);
  }
  var cues = cueList(i, seg, a);
  prepare(a.k, a.t, function () {
    if (idx !== i) return;
    revealGroup(i, seg);
    if (seg + 1 < s.narr.length) startNarr(i, seg + 1, force);
    else { clearNow(i); if (s.afterNarr) s.afterNarr(scenes[i], s); introUnlock(i); tryComplete(i); }
  });
  P.itemAudio = false;
  P.track = { slide: i, seg: seg, base: 0, total: 0 }; refreshTrack();
  P.onTick = function (r, pos, sec) { applyCues(i, cues, pos, sec); };
  if (startAt) P.startAt = startAt;
  renderProgress(0);
  if (willPlay) play();
}
/** Deja la barra en estado "escuchado" al volver a una pantalla ya completada. */
function showHeardTrack(i) {
  var s = SLIDES[i], last = s.narr.length - 1, a = s.narr[last];
  prepare(a.k, a.t, null); P.itemAudio = false;
  P.track = { slide: i, seg: last, base: 0, total: 0 }; refreshTrack();
  P.ended = true; P.syncPos = P.len; renderProgress(1); updateSeekLock();
}
function introUnlock(i) { scenes[i].classList.remove("introlock"); }
