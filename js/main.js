"use strict";
/* ============================================================
   INICIO DEL CURSO
   Conecta con el LMS, construye pantallas, menú y tabla de
   contenido, y recupera el avance guardado.
   ============================================================ */

/** Lista de audios (archivo y guion) para grabación. En la consola: listaAudios() */
window.listaAudios = function () {
  var out = [];
  SLIDES.forEach(function (s, i) { (s.narr || []).concat(s.extraAudio || []).forEach(function (a) { out.push({ pantalla: i + 1, archivo: a.k + ".mp3", texto: a.t }); }); });
  return out;
};

(function init() {
  SCORM.init();
  buildScenes();
  buildMenu();
  initToc();
  var resumeAt = load();
  if (resumeAt && resumeAt > 0) {
    show(0);
    $("#resumeTxt").textContent = "Te quedaste en la pantalla " + (resumeAt + 1) + " de " + SLIDES.length + ".";
    modal("resumeModal", true);
    $("#resumeYes").onclick = function () { modal("resumeModal", false); go(resumeAt); };
    $("#resumeNo").onclick = function () { modal("resumeModal", false); go(0); };
  } else show(0);
})();
