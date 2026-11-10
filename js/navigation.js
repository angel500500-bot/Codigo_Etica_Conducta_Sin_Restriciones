"use strict";
/* ============================================================
   NAVEGACIÓN
   Construcción de pantallas, cambio de pantalla, botones
   Anterior/Siguiente, menú superior con indicadores circulares,
   ajuste automático al tamaño de pantalla y teclado.
   ============================================================ */
var stage = document.getElementById("stage");
var scenes = [];

/** Crea una <section> por pantalla a partir de SLIDES. */
function buildScenes() {
  SLIDES.forEach(function (s, i) {
    s.i = i; slideDone[i] = false;
    var el = document.createElement("section");
    el.className = "scene"; el.dataset.i = i; el.dataset.id = s.id;
    el.setAttribute("aria-label", (s.title || "").replace(/<[^>]+>/g, ""));
    el.innerHTML = '<div class="fitwrap"><div class="card' + (s.cardClass ? " " + s.cardClass : "") + '"><div class="pad">' + s.render(s, i) + "</div></div></div>";
    stage.appendChild(el); s.el = el; scenes.push(el);
  });
}

/* ---------- Indicador circular de avance ---------- */
var RING_C = 56.55; // circunferencia (r = 9)
function ringHTML() {
  return '<span class="ring"><svg viewBox="0 0 22 22" aria-hidden="true"><circle class="rb" cx="11" cy="11" r="9"/><circle class="rp" cx="11" cy="11" r="9" stroke-dasharray="' + RING_C + '" stroke-dashoffset="' + RING_C + '"/></svg><span class="rk">' + svg("check", 12) + "</span></span>";
}
function setRing(el, frac) { var c = el.querySelector(".rp"); if (c) c.setAttribute("stroke-dashoffset", (RING_C * (1 - frac)).toFixed(2)); }
function secFrac(key) { var l = secSlides(key); return l.length ? l.filter(function (i) { return slideDone[i]; }).length / l.length : 0; }

/* ---------- Menú superior ---------- */
function buildMenu() {
  var c = $("#mitems"); c.innerHTML = "";
  MENU.forEach(function (m) {
    var d = document.createElement("button"); d.type = "button"; d.className = "mitem"; d.dataset.key = m.key; d.style.setProperty("--am", TH[m.key].c);
    d.innerHTML = ringHTML() + '<span class="lbltxt">' + m.full + '</span><span class="mabbr">' + m.abbr + '</span><span class="lock">' + svg("lock", 13) + "</span>";
    d.addEventListener("click", function () { var t = groupTarget(secSlides(m.key)); go(t); });
    c.appendChild(d);
  });
}
function refreshMenu() {
  var cur = SLIDES[idx].menu;
  $$(".mitem").forEach(function (d) {
    var k = d.dataset.key, list = secSlides(k), g = groupState(list), frac = secFrac(k);
    setRing(d, frac);
    d.classList.toggle("active", k === cur);
    d.classList.toggle("done", g.done);
    ["next", "pending", "locked"].forEach(function (c) { d.classList.toggle(c, k !== cur && g.st === c); });
    d.setAttribute("aria-disabled", g.st === "locked");
    d.title = MENU.filter(function (m) { return m.key === k; })[0].full + " · " + Math.round(frac * 100) + "% completado";
    if (k === cur) d.setAttribute("aria-current", "step"); else d.removeAttribute("aria-current");
  });
}
function applyTheme(key) {
  var t = TH[key] || TH.inicio, r = document.documentElement.style;
  r.setProperty("--theme", t.c); r.setProperty("--theme-soft", t.s);
  $("#band").style.background = "linear-gradient(90deg," + t.c + "," + t.c + "66)";
}

/* ---------- Ajuste automático: la pantalla se reduce si no cabe (sin barras de desplazamiento).
   En celulares se permite desplazamiento vertical. ---------- */
var _RO = window.ResizeObserver ? new ResizeObserver(function () { fitScene(); }) : null;
function fitScene(sc) {
  sc = sc || scenes[idx]; if (!sc) return; var p = sc.querySelector(".fitwrap"); if (!p) return;
  p.style.transform = "none";
  if (window.innerWidth < 700) { sc.style.overflowY = "auto"; return; }
  sc.style.overflowY = "hidden";
  var avail = sc.clientHeight, need = p.scrollHeight;
  if (avail > 0 && need > avail + 1) p.style.transform = "scale(" + Math.max(.55, avail / need) + ")";
}
function watchFit(sc) { if (!_RO || !sc) return; try { _RO.disconnect(); var p = sc.querySelector(".fitwrap"); if (p) _RO.observe(p); } catch (e) {} }
window.addEventListener("resize", function () { fitScene(); });

/* ---------- Cambio de pantalla ---------- */
/** Ir a una pantalla desde el menú o la tabla de contenido (respeta las restricciones). */
function go(i) {
  if (i == null || i < 0 || i >= SLIDES.length) return false;
  if (!canAccess(i)) return false;
  audioUnlocked = true; primeAudio(); closeToc(); show(i); return true;
}
/** Muestra la pantalla i y prepara su audio e interacción. */
function show(i) {
  stopPlayback(); idx = i; if (i > maxReached) maxReached = i;
  var s = SLIDES[i], sc = scenes[i];
  applyTheme(s.menu);
  scenes.forEach(function (x, k) { x.classList.toggle("active", k === i); x.setAttribute("aria-hidden", k === i ? "false" : "true"); });
  $("#player").classList.toggle("off", !s.narr);
  if (!s.narr) { prepare("", "", null); transcript.classList.remove("on"); } else if (P.ccOn) transcript.classList.add("on");
  var revisit = slideDone[i] || (s.narr && narrHeard(i));
  sc.classList.toggle("introlock", RESTRICT && !!s.narr && !narrHeard(i));
  if (s.reset) s.reset(sc, s, revisit);
  if (!s.wired) { s.wired = true; if (s.wire) s.wire(sc, s); }
  if (revisit || (!RESTRICT && !audioUnlocked)) revealAll(i, revisit ? 0 : 90); else hideAll(i);
  if (s.narr) { if (revisit) showHeardTrack(i); else startNarr(i, 0); }
  if (s.enter) s.enter(sc, s, revisit);
  $("#sceneLabel").textContent = "Pantalla " + (i + 1) + " de " + SLIDES.length;
  refreshProgressUI(); refreshNav();
  if (!s.narr && !s.ready && s.type !== "quiz") tryComplete(i);
  sc.scrollTop = 0; watchFit(sc); fitScene(sc);
  requestAnimationFrame(function () { fitScene(sc); }); setTimeout(function () { if (idx === i) fitScene(sc); }, 450);
  save();
  var h = sc.querySelector("h1,h2"); if (h) { h.setAttribute("tabindex", "-1"); try { h.focus({ preventScroll: true }); } catch (e) {} }
}
/** Siguiente pantalla permitida (o -1). */
function nextIndex(cur) { var n = cur + 1; if (n >= SLIDES.length) return -1; if (RESTRICT && SLIDES[n].needsPass && QZ.best < PASS_SCORE) return -1; return n; }
/** Estado de los botones Anterior / Siguiente y mensaje de ayuda. */
function refreshNav() {
  var prev = $("#prevBtn"), next = $("#nextBtn"), s = SLIDES[idx];
  var inQuiz = s.type === "quiz" && QZ.phase === "q";
  prev.disabled = idx === 0 || inQuiz;
  var ready = isReady(idx), ni = nextIndex(idx), last = !!s.last;
  next.disabled = last || ni < 0 || !ready;
  next.style.visibility = last || (s.type === "quiz" && QZ.best < PASS_SCORE && RESTRICT) ? "hidden" : "visible";
  next.innerHTML = (s.nextLabel || "Siguiente") + " " + svg("chevR", 16);
  var msg = "";
  if (!ready && !last && s.type !== "quiz") {
    if (!narrHeard(idx)) msg = audioUnlocked || idx > 0 ? "Escucha el audio completo para continuar" : "Presiona Iniciar para comenzar";
    else msg = s.hint || "Completa la actividad para continuar";
  }
  $("#hintTxt").textContent = msg; $("#hint").classList.toggle("show", !!msg);
}
$("#nextBtn").addEventListener("click", function () { audioUnlocked = true; primeAudio(); if (this.disabled) return; var ni = nextIndex(idx); if (ni >= 0) show(ni); });
$("#prevBtn").addEventListener("click", function () { if (idx > 0) show(idx - 1); });

/* ---------- Teclado: ← → navegan, espacio reproduce/pausa, Esc cierra paneles ---------- */
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") { closeToc(); return; }
  if (e.target.closest && e.target.closest("input,textarea,button,a,[contenteditable]")) return;
  if ($(".modal.on") || $(".drawer.on")) return;
  if (e.key === "ArrowRight") { var n = $("#nextBtn"); if (!n.disabled && n.style.visibility !== "hidden") n.click(); }
  if (e.key === "ArrowLeft") { var p = $("#prevBtn"); if (!p.disabled) p.click(); }
  if (e.key === " " && $("#player").className.indexOf("off") < 0) { e.preventDefault(); play(); }
});

/** Abre o cierra una ventana modal. */
function modal(id, on) { var m = $("#" + id); m.classList.toggle("on", on); if (on) { var b = m.querySelector("button"); if (b) setTimeout(function () { b.focus(); }, 50); } }
