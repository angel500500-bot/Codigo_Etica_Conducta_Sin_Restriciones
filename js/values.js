"use strict";
/* ============================================================
   NUESTROS VALORES
   Lista de valores + panel de detalle con imagen representativa.
   Al seleccionar un valor se muestra su imagen y descripción y suena
   su audio; queda completado al terminar el audio.
   ============================================================ */
function valuesSlide(o) {
  o.render = function (s) {
    return head(s, s.lead) + '<div class="vmaster"><div class="vlist">' + s.items.map(function (it, k) {
      return '<button type="button" class="vbtn2" data-card="' + k + '"><span class="vic">' + svg(it.icon, 20) + "</span>" + it.title +
        '<span class="vck">' + svg("check", 13) + '<span class="eq"><i></i><i></i><i></i></span></span></button>';
    }).join("") + '</div><div class="vdetail" data-vdetail aria-live="polite"><div class="vph">' + svg("pointer", 40) + "Selecciona un valor de la lista</div></div></div>" + cardsCountHTML(s.items.length);
  };
  o.wire = function (sc, s) {
    wireListenCards(sc, s, ".vbtn2", function (b, it) {
      $$(".vbtn2", sc).forEach(function (x) { x.classList.toggle("active", x === b); });
      $("[data-vdetail]", sc).innerHTML = '<div class="anim">' + ill(it.img, it.title) + '</div><div class="anim"><h3>' + it.title + "</h3><p>" + it.text + "</p></div>";
    });
  };
  o.reset = function (sc, s) { resetListenCards(sc, s, ".vbtn2"); };
  o.ready = function (sc, s) { return allItemsHeard(s); };
  o.hint = "Escucha completo cada uno de los cinco valores";
  o.extraAudio = o.items;
  return o;
}
