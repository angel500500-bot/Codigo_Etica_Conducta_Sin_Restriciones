"use strict";
/* ============================================================
   NUESTROS PRINCIPIOS
   Al inicio cada tarjeta muestra solo el título. Al seleccionarla se
   despliegan su imagen y su texto y suena la explicación; se marca como completada (check y borde
   verde) solo al terminar el audio completo.
   ============================================================ */
function principlesSlide(o) {
  o.render = function (s) {
    return head(s, s.lead) + '<div class="grid g' + s.items.length + '">' + s.items.map(function (it, k) {
      return '<button type="button" class="pcard" data-card="' + k + '" aria-label="' + esc(it.title) + ': escuchar su explicación">' +
        '<span class="tick">' + svg("check", 15) + "</span><h3>" + it.title + "</h3>" + listenState("Selecciona para descubrir") +
        '<span class="pbody">' + ill(it.img, it.title) + (it.text ? '<span class="ptx">' + it.text + "</span>" : "") + "</span></button>";
    }).join("") + "</div>" + cardsCountHTML(s.items.length);
  };
  o.wire = function (sc, s) { wireListenCards(sc, s, ".pcard", function (b) { b.classList.add("open"); b.setAttribute("aria-expanded", "true"); }); };
  o.reset = function (sc, s) { resetListenCards(sc, s, ".pcard", function (b, it, h) { b.classList.toggle("open", h); b.setAttribute("aria-expanded", h); }); };
  o.ready = function (sc, s) { return allItemsHeard(s); };
  o.hint = "Escucha completa la explicación de cada principio";
  o.extraAudio = o.items;
  return o;
}
