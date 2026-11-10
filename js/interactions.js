"use strict";
/* ============================================================
   INTERACCIONES COMUNES
   · Tarjetas con audio (motor común a principios, valores,
     ejemplos y pilares): estado "reproduciendo", "completado",
     contador y requisito de escucha completa.
   · Tarjetas desplegables con imagen (ejemplos y pilares).
   · Casos prácticos (selección + Enviar + retroalimentación).
   ============================================================ */

/* ---------- Motor común de tarjetas con audio ---------- */

/** Contador "n de N revisados". Devuelve true si todas se escucharon completas. */
function cardsCount(sc, s) {
  var n = s.items.filter(function (it) { return heard[it.k]; }).length, c = $("[data-count]", sc);
  if (c) { c.textContent = n + " de " + s.items.length + " revisados"; $(".cardcount .bar i", sc).style.width = (n / s.items.length * 100) + "%"; }
  return n === s.items.length;
}
function cardsCountHTML(n) { return '<div class="cardcount"><span class="bar"><i></i></span><span data-count>0 de ' + n + " revisados</span></div>"; }

/**
 * Conecta tarjetas (selector `sel`, atributo data-card) con su audio.
 * onSelect(btn, item, k): acción visual al seleccionar (abrir, mostrar detalle…).
 * La tarjeta se marca "done" solo cuando su audio termina completo.
 */
function wireListenCards(sc, s, sel, onSelect) {
  $$(sel, sc).forEach(function (b) {
    b.addEventListener("click", function () {
      var k = +b.dataset.card, it = s.items[k];
      $$(sel, sc).forEach(function (x) { x.classList.remove("playing"); });
      if (onSelect) onSelect(b, it, k);
      b.classList.add("playing"); fitScene(sc);
      speak(it.k, it.t, function () {
        b.classList.remove("playing"); b.classList.add("done");
        var all = cardsCount(sc, s); if (all && s.onAll) s.onAll(sc, s);
        tryComplete(idx);
      });
    });
  });
}
/** Restaura estados al volver a la pantalla. */
function resetListenCards(sc, s, sel, onRestore) {
  $$(sel, sc).forEach(function (b) {
    var it = s.items[+b.dataset.card], h = !!heard[it.k];
    b.classList.remove("playing"); b.classList.toggle("done", h);
    if (onRestore) onRestore(b, it, h);
  });
  cardsCount(sc, s);
}
function allItemsHeard(s) { return s.items.every(function (it) { return heard[it.k]; }); }

/* ---------- Tarjetas desplegables con imagen (ejemplos y pilares) ---------- */
function flipCardsHTML(s) {
  return '<div class="grid g' + s.items.length + '" style="align-items:start">' + s.items.map(function (it, k) {
    return '<button type="button" class="flip" data-card="' + k + '" aria-expanded="false"><span class="tick">' + svg("check", 15) + "</span>" +
      '<span class="fh"><span class="fic">' + svg(it.icon, 27) + "</span>" + (s.ex ? '<span class="exn">Ejemplo ' + (k + 1) + "</span>" : "<h3>" + it.title + "</h3>") +
      listenState("Selecciona para descubrir") + "</span>" +
      '<span class="fb2">' + ill(it.img, it.alt || it.title || "") + it.text + "</span></button>";
  }).join("") + "</div>" + cardsCountHTML(s.items.length);
}
/**
 * Pantalla de tarjetas desplegables. Requiere: items [{k, t, icon, img, text, title?}]
 * Opcional: ex (numera "Ejemplo n"), closing (audio final tras revisar todas), after (HTML extra).
 */
function flipCardsSlide(o) {
  o.render = function (s) { return head(s, s.lead) + flipCardsHTML(s) + (s.after || ""); };
  o.wire = function (sc, s) {
    wireListenCards(sc, s, "[data-card]", function (b) { b.classList.add("open"); b.setAttribute("aria-expanded", "true"); });
  };
  o.reset = function (sc, s, rv) {
    resetListenCards(sc, s, "[data-card]", function (b, it, h) { b.classList.toggle("open", h); b.setAttribute("aria-expanded", h); });
    if (s.closing) $("[data-closing]", sc).style.display = heard[s.closing.k] ? "" : "none";
  };
  o.ready = function (sc, s) { return allItemsHeard(s) && (!s.closing || heard[s.closing.k]); };
  o.hint = "Revisa todas las tarjetas y escucha su audio completo";
  if (o.closing) {
    o.after = (o.after || "") + '<div data-closing style="display:none">' + note("warn", "alert", o.closing.text) + "</div>";
    o.onAll = function (sc, s) { $("[data-closing]", sc).style.display = ""; fitScene(sc); if (!heard[s.closing.k]) speak(s.closing.k, s.closing.t, function () { tryComplete(idx); }); };
  }
  o.extraAudio = o.items.concat(o.closing ? [o.closing] : []);
  return o;
}

/* ---------- Casos prácticos ---------- */
/**
 * Caso práctico. Requiere: id, num, title, situation, visual, opts[4], correct (0-3), doRight, why.
 * Audios: <id>-consigna, <id>-correcta, <id>-incorrecta.
 */
function caseSlide(o) {
  var pre = o.id;
  o.type = "case"; o.menu = o.menu || "codigo";
  o.kicker = "Caso práctico " + o.num + " de 5";
  o.narr = [{ k: pre + "-consigna", t: "Lee con atención la siguiente situación y selecciona cómo deberías actuar. Luego presiona Enviar." }];
  o.okA = { k: pre + "-correcta", t: "¡Muy bien! Tu manera de actuar fue la correcta. " + o.why };
  o.noA = { k: pre + "-incorrecta", t: "Esa no es la mejor forma de actuar. La respuesta correcta es la " + "ABCD"[o.correct] + ". " + o.why };
  o.extraAudio = [o.okA, o.noA];
  o.hint = "Responde el caso y escucha la retroalimentación";
  o.render = function (s) {
    return head(s) + '<div class="casegrid">' +
      '<div class="sitbox"><div class="sithead">' + svg("eye", 17) + ' Verificación de la realidad</div><div class="sittext">' + s.situation + '</div><div class="sitvis">' + s.visual + "</div></div>" +
      '<div><div class="qn">' + svg("help", 22) + ' ¿Qué deberías hacer?</div><div class="opts" role="radiogroup" aria-label="Alternativas">' +
      s.opts.map(function (t, k) { return '<button type="button" class="opt" role="radio" aria-checked="false" data-opt="' + k + '"><span class="k">' + "ABCD"[k] + "</span><span>" + t + "</span></button>"; }).join("") +
      '</div><div class="submitrow"><button type="button" class="btn primary" data-submit disabled>Enviar ' + svg("arrowR", 16) + '</button><span class="status" data-status aria-live="polite"></span></div>' +
      '<div class="dorite" data-dorite><span class="di">' + svg("thumb", 22) + "</span><div><b>Haz lo correcto</b><p>" + s.doRight + "</p></div></div></div></div>";
  };
  o.wire = function (sc, s) {
    var sel = -1, sub = $("[data-submit]", sc);
    $$("[data-opt]", sc).forEach(function (b) {
      b.addEventListener("click", function () {
        if (s.answered) return; sel = +b.dataset.opt;
        $$("[data-opt]", sc).forEach(function (x) { var on = x === b; x.classList.toggle("sel", on); x.setAttribute("aria-checked", on); });
        sub.disabled = false;
      });
    });
    sub.addEventListener("click", function () {
      if (sel < 0 || s.answered) return; s.answered = true; s.choice = sel;
      paintCase(sc, s);
      var a = sel === s.correct ? s.okA : s.noA; speak(a.k, a.t, function () { tryComplete(idx); });
    });
  };
  o.reset = function (sc, s) { if (s.answered) paintCase(sc, s); };
  o.ready = function (sc, s) { return !!s.answered && (heard[s.okA.k] || heard[s.noA.k]); };
  return o;
}
function paintCase(sc, s) {
  var ok = s.choice === s.correct;
  $$("[data-opt]", sc).forEach(function (x) { var k = +x.dataset.opt; x.classList.add("locked"); x.classList.remove("sel"); x.classList.toggle("correct", k === s.correct); x.classList.toggle("wrong", k === s.choice && !ok); });
  var st = $("[data-status]", sc); st.className = "status show " + (ok ? "ok" : "no");
  st.innerHTML = '<span class="si">' + svg(ok ? "check" : "x", 14) + "</span>" + (ok ? "¡Respuesta correcta!" : "Respuesta incorrecta");
  $("[data-submit]", sc).style.display = "none"; $("[data-dorite]", sc).classList.add("show"); fitScene(sc);
}
