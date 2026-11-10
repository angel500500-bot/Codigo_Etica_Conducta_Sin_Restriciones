"use strict";
/* ============================================================
   EVALUACIÓN FINAL
   10 preguntas (orden y alternativas aleatorias), 2 puntos c/u,
   nota mínima 14/20, hasta 3 intentos, se conserva la mejor nota.
   Registra en el LMS: nota, estado (passed/failed) e interacciones.
   Las preguntas están en content/preguntas.js.
   ============================================================ */
function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
function range(n) { var a = []; for (var i = 0; i < n; i++) a.push(i); return a; }

/** Entrada a la pantalla de evaluación: continúa, muestra el resultado o inicia un intento. */
function quizEnter(sc) {
  if (QZ.phase === "q" && QZ.order) { quizQuestion(sc); return; }
  if (QZ.best >= PASS_SCORE || QZ.attempts.length >= MAX_ATTEMPTS || QZ.phase === "result") { quizResult(sc); return; }
  quizStart(sc);
}
function quizStart(sc) {
  QZ.order = shuffle(range(QUESTIONS.length)).map(function (q) { return { q: q, o: shuffle(range(4)) }; });
  QZ.answers = QZ.order.map(function () { return -1; }); QZ.cur = 0; QZ.phase = "q"; QZ.last = null;
  quizQuestion(sc); refreshNav();
}
function quizQuestion(sc) {
  var it = QZ.order[QZ.cur], Q = QUESTIONS[it.q], n = QZ.order.length, att = QZ.attempts.length + 1, bars = "";
  for (var k = 0; k < n; k++) bars += '<i class="' + (k < QZ.cur ? "on" : k === QZ.cur ? "cur" : "") + '"></i>';
  $("[data-quiz]", sc).innerHTML = '<span class="kicker">Intento ' + att + " de " + MAX_ATTEMPTS + '</span><div class="qhead"><b style="color:var(--muted)">Pregunta ' + (QZ.cur + 1) + " de " + n + '</b><span class="qprog">' + bars + "</span></div>" +
    '<h2 class="t qtext">' + Q.q + '</h2><div class="opts" role="radiogroup">' + it.o.map(function (oi, k) {
      var on = QZ.answers[QZ.cur] === oi;
      return '<button type="button" class="opt' + (on ? " sel" : "") + '" role="radio" aria-checked="' + on + '" data-qo="' + oi + '"><span class="k">' + "ABCD"[k] + "</span><span>" + Q.o[oi] + "</span></button>";
    }).join("") + "</div>" +
    '<div class="submitrow" style="justify-content:space-between;margin-top:18px"><button type="button" class="btn ghost" data-qprev' + (QZ.cur === 0 ? " disabled" : "") + ">" + svg("chevL", 16) + " Anterior</button>" +
    '<button type="button" class="btn primary" data-qnext' + (QZ.answers[QZ.cur] < 0 ? " disabled" : "") + ">" + (QZ.cur === n - 1 ? "Finalizar evaluación" : "Siguiente pregunta") + " " + svg("chevR", 16) + "</button></div>";
  $$("[data-qo]", sc).forEach(function (b) {
    b.addEventListener("click", function () {
      QZ.answers[QZ.cur] = +b.dataset.qo;
      $$("[data-qo]", sc).forEach(function (x) { x.classList.toggle("sel", x === b); x.setAttribute("aria-checked", x === b); });
      $("[data-qnext]", sc).disabled = false;
    });
  });
  $("[data-qprev]", sc).addEventListener("click", function () { if (QZ.cur > 0) { QZ.cur--; quizQuestion(sc); } });
  $("[data-qnext]", sc).addEventListener("click", function () { if (QZ.answers[QZ.cur] < 0) return; if (QZ.cur < n - 1) { QZ.cur++; quizQuestion(sc); } else quizGrade(sc); });
  var h = $(".qtext", sc); if (h) { h.setAttribute("tabindex", "-1"); try { h.focus({ preventScroll: true }); } catch (e) {} }
  fitScene(sc);
}
/** Califica el intento y lo registra en el LMS. */
function quizGrade(sc) {
  var ok = 0; QZ.order.forEach(function (it, k) { if (QZ.answers[k] === QUESTIONS[it.q].c) ok++; });
  var score = ok * PTS; QZ.attempts.push(score); QZ.best = Math.max(QZ.best, score); QZ.phase = "result";
  QZ.last = { order: QZ.order, answers: QZ.answers, score: score };
  try {
    var base = parseInt(SCORM.get("cmi.interactions._count") || "0", 10) || 0, a = QZ.attempts.length, L = "abcd";
    QZ.order.forEach(function (it, k) {
      var n = base + k, Q = QUESTIONS[it.q];
      SCORM.set("cmi.interactions." + n + ".id", "I" + a + "_P" + (it.q + 1));
      SCORM.set("cmi.interactions." + n + ".type", "choice");
      SCORM.set("cmi.interactions." + n + ".student_response", L[QZ.answers[k]]);
      SCORM.set("cmi.interactions." + n + ".correct_responses.0.pattern", L[Q.c]);
      SCORM.set("cmi.interactions." + n + ".result", QZ.answers[k] === Q.c ? "correct" : "wrong");
      SCORM.set("cmi.interactions." + n + ".weighting", String(PTS));
    });
  } catch (e) {}
  SCORM.set("cmi.core.score.raw", String(Math.round(QZ.best / MAX_SCORE * 100)));
  var passed = QZ.best >= PASS_SCORE;
  SCORM.set("cmi.core.lesson_status", passed ? "passed" : (QZ.attempts.length >= MAX_ATTEMPTS ? "failed" : "incomplete"));
  if (passed) markSlide(idx);
  save(); SCORM.commit();
  quizResult(sc); refreshNav(); refreshProgressUI();
}
/** Resultado: si desaprueba solo ve qué preguntas falló; ve las respuestas correctas al aprobar o agotar intentos. */
function quizResult(sc) {
  var passed = QZ.best >= PASS_SCORE, left = MAX_ATTEMPTS - QZ.attempts.length, L = QZ.last, cur = L ? L.score : QZ.best, showAns = passed || left <= 0;
  var badge = '<div class="resbadge ' + (passed ? "ok" : "no") + '" aria-live="polite"><span class="ri">' + svg(passed ? "award" : "refresh", 34) + '</span><span class="sc">' + cur + '<small style="font-size:.45em">/' + MAX_SCORE + "</small></span>" +
    '<div class="rtx"><h3>' + (passed ? "¡Aprobaste la evaluación!" : left > 0 ? "Aún no alcanzas la nota mínima" : "No alcanzaste la nota mínima") + "</h3><p>" +
    (passed ? "Tu mejor nota es <b>" + QZ.best + "/" + MAX_SCORE + "</b>. Ya puedes acceder a los recursos y descargar tu certificado."
      : left > 0 ? "Necesitas <b>" + PASS_SCORE + "/" + MAX_SCORE + "</b> para aprobar. Revisa en qué preguntas fallaste y vuelve a intentarlo. Te quedan <b>" + left + " intento" + (left > 1 ? "s" : "") + "</b>."
      : "Has utilizado los " + MAX_ATTEMPTS + " intentos. Comunícate con " + COURSE.consultas + ".") + "</p></div>" +
    '<div class="rbtn">' + (passed ? '<button type="button" class="btn good" data-qcont>Continuar ' + svg("chevR", 16) + "</button>" : left > 0 ? '<button type="button" class="btn primary" data-qretry>' + svg("refresh", 16) + " Reintentar (intento " + (QZ.attempts.length + 1) + " de " + MAX_ATTEMPTS + ")</button>" : "") +
    '<small style="opacity:.8">Intentos utilizados: ' + QZ.attempts.length + " de " + MAX_ATTEMPTS + "</small></div></div>";
  var rev = "";
  if (L) {
    rev = "<div>" + lbl(showAns ? "Revisión de respuestas" : "Resultado por pregunta", "", "list") + '<div class="review">' + L.order.map(function (it, k) {
      var Q = QUESTIONS[it.q], a = L.answers[k], ok = a === Q.c;
      return '<div class="rv ' + (ok ? "ok" : "no") + '"><span class="rs">' + svg(ok ? "check" : "x", 13) + "</span><div><b>" + (k + 1) + ". " + Q.q + "</b>" +
        (ok ? '<span class="ca">' + Q.o[Q.c] + "</span>" : (showAns ? '<span class="ya">' + Q.o[a] + '</span><br><span class="ca">Correcta: ' + Q.o[Q.c] + "</span>" : '<span style="color:var(--bad);font-weight:600">Respuesta incorrecta</span>')) + "</div></div>";
    }).join("") + "</div></div>";
  }
  $("[data-quiz]", sc).innerHTML = '<span class="kicker">Evaluación final</span><h2 class="t">Resultado</h2><div class="tbar"></div><div class="result">' + badge + rev + "</div>";
  var c = $("[data-qcont]", sc); if (c) c.addEventListener("click", function () { var ni = nextIndex(idx); if (ni >= 0) show(ni); });
  var r = $("[data-qretry]", sc); if (r) r.addEventListener("click", function () { quizStart(sc); });
  fitScene(sc);
}
