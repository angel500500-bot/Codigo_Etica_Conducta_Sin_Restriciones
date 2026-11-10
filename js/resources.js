"use strict";
/* ============================================================
   RECURSOS Y CERTIFICADO
   · Enlace al documento oficial publicado en Documentos de Chamilo.
   · Certificado generado con los datos del participante que entrega
     el LMS, con el mismo diseño de la plantilla de Chamilo.
   ============================================================ */

/**
 * Datos del curso en Chamilo, tomados de la página que ejecuta el SCORM.
 * Chamilo abre las lecciones con ?cidReq=<código>&id_session=<n> y sirve el
 * paquete desde <raíz>/courses/<código>/scorm/…
 */
function chamiloContext() {
  var cid = "", sid = "0", root = "", w = window;
  for (var n = 0; n < 6 && w; n++) {
    try {
      var u = new URL(w.location.href);
      if (!cid && u.searchParams.get("cidReq")) cid = u.searchParams.get("cidReq");
      if (u.searchParams.get("id_session")) sid = u.searchParams.get("id_session");
      var m = u.href.match(/^(.*?\/)(?:courses|main)\//); if (!root && m) root = m[1];
    } catch (e) { break; }
    if (w === w.parent) break; w = w.parent;
  }
  if (!cid) { var m2 = location.pathname.match(/\/courses\/([^\/]+)\/scorm\//); if (m2) cid = m2[1]; }
  return root && cid ? { root: root, cid: cid, sid: sid } : null;
}
/**
 * Enlace del documento oficial:
 * 1) el enlace exacto configurado en COURSE.documento.url, o
 * 2) la herramienta Documentos del mismo curso en Chamilo.
 */
function documentLink() {
  if (COURSE.documento.url) return { href: COURSE.documento.url, exact: true };
  var c = chamiloContext();
  if (c) return { href: c.root + "main/document/document.php?cidReq=" + encodeURIComponent(c.cid) + "&id_session=" + encodeURIComponent(c.sid) + "&gidReq=0&gradebook=0&origin=", exact: false };
  return null;
}
/** Configura el botón del documento en la pantalla de recursos. */
function wireDocumentLink(a) {
  var L = documentLink(), small = a.querySelector("small");
  if (L) { a.href = L.href; small.textContent = L.exact ? "Documento oficial · abrir o descargar" : "Abrir en Documentos del curso (Chamilo)"; }
  else { a.removeAttribute("href"); a.classList.add("off"); small.textContent = "Disponible en la sección Documentos del curso en Chamilo"; a.querySelector(".go").style.display = "none"; }
}

/** Abre el certificado (solo si aprobó). Nombre tomado del LMS. */
function openCert() {
  if (RESTRICT && QZ.best < PASS_SCORE) return;
  var name = SCORM.name(), M = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"], d = new Date();
  var el = $("#certName");
  el.textContent = name || "Nombre del participante";
  if (name) el.removeAttribute("contenteditable"); else el.setAttribute("contenteditable", "true");
  $("#certCourse").textContent = COURSE.titulo;
  $("#certDate").textContent = (d.getDate() < 10 ? "0" : "") + d.getDate() + " de " + M[d.getMonth()] + " de " + d.getFullYear();
  $("#certNote").textContent = name ? "Datos tomados de tu cuenta en la plataforma." : "Escribe tu nombre en el certificado antes de imprimir.";
  modal("certModal", true);
}
/** Cierra la sesión en el LMS. */
function finishCourse() { save(); SCORM.set("cmi.core.exit", QZ.best >= PASS_SCORE ? "" : "suspend"); SCORM.finish(); modal("endModal", true); }
window.addEventListener("pagehide", function () { SCORM.finish(); });
window.addEventListener("beforeunload", function () { SCORM.finish(); });
