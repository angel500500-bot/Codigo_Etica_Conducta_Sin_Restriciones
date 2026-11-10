"use strict";
/* ============================================================
   COMPONENTES HTML REUTILIZABLES
   Funciones que devuelven el HTML de los elementos comunes.
   Opciones de aparición sincronizada (o.g / o.cue):
     g   = número del audio de la pantalla en el que aparece (0, 1…)
     cue = frase del guion con la que se activa el bloque; debe
           copiarse tal como figura en el texto del audio.
   ============================================================ */

/** Atributos de sincronización con el audio. */
function G(g, cue) {
  if (g === undefined || g === null) return "";
  return ' data-g="' + g + '"' + (cue ? ' data-cue="' + esc(cue) + '"' : "");
}

/** Encabezado estándar de pantalla: etiqueta, título y entradilla. */
function head(s, lead) {
  return (s.kicker ? '<span class="kicker">' + s.kicker + "</span>" : "") +
    '<h2 class="t">' + s.title + '</h2><div class="tbar"></div>' +
    (lead ? '<p class="lead">' + lead + "</p>" : "");
}

/** Bloque con ícono. o = {title, cls, g, cue, num, style} */
function blk(icon, text, o) {
  o = o || {};
  return '<div class="blk' + (o.cls ? " " + o.cls : "") + '"' + G(o.g, o.cue) + (o.style ? ' style="' + o.style + '"' : "") + ">" +
    '<span class="ic">' + (o.num ? o.num : svg(icon, 24)) + "</span>" +
    "<p>" + (o.title ? "<b>" + o.title + "</b>" : "") + text + "</p></div>";
}

/** Mensaje destacado. kind = ok | no | warn | info. o = {g, cue, big} */
function note(kind, icon, text, o) {
  o = o || {};
  return '<div class="note ' + kind + (o.big ? " big" : "") + '"' + G(o.g, o.cue) + '><span class="ni">' + svg(icon, 19) + "</span><span>" + text + "</span></div>";
}

/** Panel destacado para definiciones. o = {g, cue, cls} */
function defpanel(icon, html, o) {
  o = o || {};
  return '<div class="defpanel' + (o.cls ? " " + o.cls : "") + '"' + G(o.g, o.cue) + '><span class="ic">' + svg(icon, 28) + "</span><div>" + html + "</div></div>";
}

/** Rótulo pequeño de sección dentro de una pantalla. */
function lbl(text, cls, icon) {
  return '<div class="lbl ' + (cls || "") + '">' + (icon ? svg(icon, 16) : "") + text + "</div>";
}

/** Fotografía adaptable (sin recortes). o = {g, cue} */
function media(file, alt, o) {
  o = o || {};
  return '<figure class="media"' + G(o.g, o.cue) + '><img src="assets/img/' + file + '" alt="' + esc(alt || "") + '" onerror="this.parentNode.classList.add(\'noimg\')"><figcaption class="phlabel">assets/img/' + file + "</figcaption></figure>";
}

/** Ilustración de tarjetas (carpeta assets/img/ilustraciones). */
function ill(name, alt) {
  return '<img class="ill" src="assets/img/ilustraciones/' + name + '" alt="' + esc(alt || "") + '" loading="eager">';
}

/** Indicador de estado de escucha para tarjetas (pendiente / reproduciendo / completado). */
function listenState(idleText) {
  return '<span class="state"><span class="s-idle">' + svg("volHi", 14) + " " + (idleText || "Escuchar") + "</span>" +
    '<span class="s-play"><span class="eq"><i></i><i></i><i></i></span> Reproduciendo…</span>' +
    '<span class="s-done">' + svg("check", 14) + " Completado</span></span>";
}
