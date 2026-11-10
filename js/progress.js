"use strict";
/* ============================================================
   SEGUIMIENTO DEL PROGRESO
   ------------------------------------------------------------
   · Una pantalla se completa solo cuando se escucharon todos sus
     audios y se cumplió su actividad (tarjetas, caso, evaluación).
   · Acceso: con restricciones, solo se puede ir a pantallas ya
     completadas o a la primera pendiente ("frontera").
   · Se guarda en el LMS: ubicación, pantallas completadas e intentos.
   ============================================================ */
var idx = 0;          // pantalla actual
var maxReached = 0;   // pantalla más avanzada visitada
var slideDone = [];   // true = pantalla completada
var QZ = { attempts: [], best: -1, order: null, answers: [], cur: 0, phase: "idle", last: null };

/** ¿Se cumplieron los requisitos de la pantalla i? */
function requirementsMet(i) {
  var s = SLIDES[i];
  if (s.type === "quiz") return QZ.best >= PASS_SCORE;
  if (!narrHeard(i)) return false;
  return s.ready ? !!s.ready(scenes[i], s) : true;
}
/** ¿Se puede avanzar desde la pantalla i? */
function isReady(i) { if (!RESTRICT) return true; return slideDone[i] || requirementsMet(i); }
/** Revisa si la pantalla i quedó completa y actualiza indicadores. */
function tryComplete(i) {
  if (i == null || i < 0) return;
  if (!slideDone[i] && requirementsMet(i)) markSlide(i);
  if (i === idx) refreshNav();
}
function markSlide(i) { slideDone[i] = true; refreshProgressUI(); save(); }

/** Primera pantalla no completada (punto en el que debe continuar). */
function frontier() { for (var i = 0; i < SLIDES.length; i++) if (!slideDone[i]) return i; return SLIDES.length - 1; }
/** ¿Se puede navegar directamente a la pantalla i? */
function canAccess(i) {
  if (!RESTRICT) return true;
  if (SLIDES[i].needsPass && QZ.best < PASS_SCORE) return false;
  return slideDone[i] || i <= frontier();
}
function overallPct() { return Math.round(slideDone.filter(Boolean).length / SLIDES.length * 100); }
/** Pantallas de una sección del menú. */
function secSlides(key) { var a = []; SLIDES.forEach(function (s, i) { if (s.menu === key) a.push(i); }); return a; }
/** Estado de un grupo de pantallas: done | current | next | pending | locked */
function groupState(list) {
  var done = list.every(function (i) { return slideDone[i]; }), f = frontier();
  if (list.indexOf(idx) >= 0) return { st: "current", done: done };
  if (done) return { st: "done", done: true };
  if (!canAccess(list[0])) return { st: "locked", done: false };
  if (list.indexOf(f) >= 0) return { st: "next", done: false };
  return { st: "pending", done: false };
}
/** Primera pantalla a la que conviene ir dentro de un grupo. */
function groupTarget(list) {
  for (var k = 0; k < list.length; k++) if (!slideDone[list[k]] && canAccess(list[k])) return list[k];
  return list[0];
}

/** Actualiza todos los indicadores de progreso (barra, menú, tabla de contenido). */
function refreshProgressUI() {
  $("#cprogFill").style.width = overallPct() + "%";
  if (typeof refreshMenu === "function") refreshMenu();
  if (typeof refreshToc === "function") refreshToc();
}

/* ---------- Guardado y recuperación en el LMS (cmi.suspend_data, máx. 4096 caracteres) ---------- */
var _saveT = null;
function save() {
  clearTimeout(_saveT);
  _saveT = setTimeout(function () {
    var d = { v: 2, i: idx, m: maxReached, d: slideDone.map(function (x) { return x ? 1 : 0; }).join(""), a: QZ.attempts, b: QZ.best };
    SCORM.set("cmi.core.lesson_location", String(idx));
    SCORM.set("cmi.suspend_data", JSON.stringify(d));
    SCORM.set("cmi.core.exit", QZ.best >= PASS_SCORE ? "" : "suspend");
    SCORM.commit();
  }, 250);
}
/** Recupera el avance guardado. Devuelve la pantalla donde se quedó (o null). */
function load() {
  var raw = SCORM.get("cmi.suspend_data"); if (!raw) return null;
  try {
    var d = JSON.parse(raw); if (!d || (d.v !== 1 && d.v !== 2)) return null;
    (d.d || "").split("").forEach(function (c, k) { if (k < slideDone.length) slideDone[k] = c === "1"; });
    maxReached = Math.min(d.m || 0, SLIDES.length - 1); QZ.attempts = d.a || []; QZ.best = typeof d.b === "number" ? d.b : -1;
    if (QZ.attempts.length) QZ.phase = "result";
    var at = Math.min(d.i || 0, SLIDES.length - 1);
    return canAccess(at) ? at : frontier();
  } catch (e) { return null; }
}
