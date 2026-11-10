"use strict";
/* ============================================================
   SECCIÓN 5 · EVALUACIÓN  (pantallas 31 a 33)
   Lógica: js/quiz.js · Preguntas: content/preguntas.js
   Recursos y certificado: js/resources.js
   ============================================================ */
SLIDES.push(

/* ---------- 31 · Instrucciones ---------- */
{ id: "31", menu: "eval", tema: "Evaluación final", kicker: "Evaluación", title: "Evaluación final", nextLabel: "Iniciar evaluación",
  narr: [{ k: "31-instrucciones-evaluacion", t: "Has llegado a la evaluación final. Responderás diez preguntas de opción múltiple, cada una con una sola respuesta correcta y un valor de dos puntos. Si no alcanzas la nota mínima, tendrás hasta tres intentos. Al aprobar, podrás descargar tu certificado. Recuerda: la nota mínima aprobatoria es catorce sobre veinte. ¡Éxitos!" }],
  render: function (s) {
    return head(s, "Pon a prueba lo aprendido. Antes de comenzar, ten en cuenta lo siguiente:") + '<div class="split" style="align-items:stretch"><div class="grid g2">' +
      blk("list", "de opción múltiple, con una sola respuesta correcta.", { title: "10 preguntas", g: 0, cue: "responderás diez preguntas" }) +
      blk("star", "por cada respuesta correcta.", { title: "2 puntos", g: 0, cue: "un valor de dos puntos" }) +
      blk("refresh", "si no alcanzas la nota mínima.", { title: "Hasta 3 intentos", g: 0, cue: "tendrás hasta tres intentos" }) +
      blk("award", "disponible al aprobar la evaluación.", { title: "Certificado", g: 0, cue: "podrás descargar" }) + "</div>" +
      '<div class="scorebig" style="flex-direction:column;justify-content:center;text-align:center"' + G(0, "recuerda") + "><small>Nota mínima aprobatoria</small><span class=\"n\">" + PASS_SCORE + " / " + MAX_SCORE + "</span><small>(7 respuestas correctas de 10)</small></div></div>" +
      "<div data-evalstate></div>";
  },
  enter: function (sc) {
    var t = "";
    if (QZ.best >= PASS_SCORE) t = note("ok", "check", "Ya aprobaste la evaluación con <b>" + QZ.best + "/" + MAX_SCORE + "</b>. Puedes revisar tu resultado.");
    else if (QZ.attempts.length >= MAX_ATTEMPTS) t = note("no", "alert", "Has utilizado los " + MAX_ATTEMPTS + " intentos disponibles.");
    else if (QZ.attempts.length) t = note("info", "refresh", "Intentos utilizados: <b>" + QZ.attempts.length + " de " + MAX_ATTEMPTS + "</b> · Mejor nota: <b>" + QZ.best + "/" + MAX_SCORE + "</b>");
    $("[data-evalstate]", sc).innerHTML = t; fitScene(sc);
  }
},

/* ---------- 32 · Preguntas y resultado ---------- */
{ id: "32", menu: "eval", tema: "Evaluación final", type: "quiz", kicker: "Evaluación final", title: "Evaluación final",
  render: function () { return "<div data-quiz></div>"; },
  enter: function (sc) { quizEnter(sc); }
},

/* ---------- 33 · Recursos y certificado ---------- */
{ id: "33", menu: "eval", tema: "Recursos y certificado", type: "recursos", needsPass: true, last: true, kicker: "¡Felicitaciones!", title: "Recursos y certificado",
  narr: [{ k: "33-cierre-capacitacion", t: "¡Felicitaciones! Has finalizado la capacitación sobre el Código de Ética y Conducta. Recuerda que el documento completo está disponible en la sección de documentos del curso, para que lo consultes cuando lo necesites. Si tienes dudas sobre cómo actuar, acude a tu jefe inmediato, a Gestión Humana o a la Gerencia General. Y si tienes consultas sobre el contenido de esta capacitación, comunícate con Gestión Humana. Ya puedes descargar tu certificado." }],
  render: function (s) {
    return head(s) + '<div class="resgrid"><div class="grid">' + lbl("Recursos de consulta", "", "book") +
      '<a class="reslink" data-doc target="_blank" rel="noopener"' + G(0, "el documento completo") + '><span class="ic">' + svg("pdf", 24) + "</span><span>" + COURSE.documento.nombre + "<small>Documento oficial</small></span><span class=\"go\">" + svg("arrowR", 18) + "</span></a>" +
      '<div class="reslink"' + G(0, "si tienes dudas") + '><span class="ic">' + svg("chat", 24) + "</span><span>¿Dudas o reportes?<small>Jefe inmediato · Gestión Humana · Gerencia General</small></span></div>" +
      '<div class="reslink"' + G(0, "si tienes consultas") + '><span class="ic">' + svg("users", 24) + "</span><span>¿Consultas sobre el contenido?<small>" + COURSE.consultas + "</small></span></div></div>" +
      '<div class="certcard"' + G(0, "ya puedes descargar") + '><span class="cic">' + svg("award", 38) + '</span><h3>Descarga tu certificado</h3><p data-certtxt>Disponible al aprobar la evaluación final.</p><button type="button" class="btn good" data-cert disabled>' + svg("printer", 16) + " Descargar certificado</button>" +
      '<button type="button" class="btn ghost" data-finish>' + svg("exit", 16) + " Finalizar capacitación</button></div></div>";
  },
  wire: function (sc) { $("[data-cert]", sc).addEventListener("click", openCert); $("[data-finish]", sc).addEventListener("click", finishCourse); wireDocumentLink($("[data-doc]", sc)); },
  enter: function (sc, s) {
    $("[data-certtxt]", sc).innerHTML = QZ.best >= PASS_SCORE ? "Aprobaste con <b>" + QZ.best + "/" + MAX_SCORE + "</b>." : "Disponible al aprobar la evaluación final.";
    $("[data-cert]", sc).disabled = !(QZ.best >= PASS_SCORE || !RESTRICT) || (RESTRICT && !narrHeard(s.i));
  },
  afterNarr: function (sc) { $("[data-cert]", sc).disabled = !(QZ.best >= PASS_SCORE || !RESTRICT); }
}

);
