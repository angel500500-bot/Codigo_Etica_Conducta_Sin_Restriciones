"use strict";
/* ============================================================
   TABLA DE CONTENIDO
   ------------------------------------------------------------
   La estructura se arma automáticamente: cada pantalla indica su
   sección (s.menu) y su apartado (s.tema). Pantallas consecutivas con
   el mismo apartado se agrupan (p. ej. tema + ejemplos + caso).
   Se muestra en dos lugares sincronizados:
     · Panel lateral (botón ☰), disponible en todo el curso.
     · Pantalla 3 "Tabla de contenido" (data-toc="pantalla").
   Estados: completado · en progreso · siguiente · pendiente · bloqueado.
   ============================================================ */

/** Agrupa las pantallas en secciones y apartados. */
function tocModel() {
  return MENU.map(function (m) {
    var items = [];
    SLIDES.forEach(function (s, i) {
      if (s.menu !== m.key || s.tocHidden) return;
      var name = s.tema || (s.title || "").replace(/<[^>]+>/g, "");
      var last = items[items.length - 1];
      if (last && last.name === name && last.slides[last.slides.length - 1] === i - 1) last.slides.push(i);
      else items.push({ name: name, slides: [i] });
    });
    // Pantallas ocultas en la tabla (p. ej. resultado) se suman al apartado anterior
    SLIDES.forEach(function (s, i) { if (s.menu === m.key && s.tocHidden && items.length) items[items.length - 1].slides.push(i); });
    return { key: m.key, title: m.full, items: items };
  });
}
var TAGS = { current: "En curso", next: "Continuar", locked: "", done: "", pending: "" };

/** HTML de una sección de la tabla. */
function tocSectionHTML(sec, n) {
  return '<div class="tocsec" style="--sc:' + TH[sec.key].c + '" data-sec="' + sec.key + '"><div class="th">' + ringHTML() + '<span>' + (n ? n + ". " : "") + sec.title + '</span><small data-secpct></small></div><ul>' +
    sec.items.map(function (it) {
      return '<li><button type="button" class="titem" data-slides="' + it.slides.join(",") + '"><span class="st"></span><span class="tn">' + it.name + '</span><span class="tg"></span></button></li>';
    }).join("") + "</ul></div>";
}
/** Dibuja la tabla en un contenedor. sections = claves a incluir. */
function renderToc(container, sections) {
  var model = tocModel().filter(function (s) { return !sections || sections.indexOf(s.key) >= 0; });
  container.innerHTML = model.map(function (s) { return tocSectionHTML(s, sections ? sections.indexOf(s.key) + 1 : 0); }).join("");
  $$(".titem", container).forEach(function (b) {
    b.addEventListener("click", function () {
      var list = b.dataset.slides.split(",").map(Number);
      go(groupTarget(list));
    });
  });
}
/** Actualiza los estados de todas las tablas visibles. */
function refreshToc() {
  $$("[data-toc]").forEach(function (box) {
    $$(".titem", box).forEach(function (b) {
      var list = b.dataset.slides.split(",").map(Number), g = groupState(list);
      b.className = "titem " + g.st + (g.done ? " done" : "");
      b.querySelector(".st").innerHTML = g.done ? svg("check", 12) : g.st === "locked" ? svg("lock", 11) : "";
      b.querySelector(".tg").textContent = TAGS[g.st] || "";
      b.disabled = false; b.setAttribute("aria-disabled", g.st === "locked");
      var lbl = { done: "completado", current: "en curso", next: "siguiente apartado", pending: "pendiente", locked: "bloqueado" }[g.st];
      b.setAttribute("aria-label", b.querySelector(".tn").textContent + " (" + lbl + ")");
    });
    $$(".tocsec", box).forEach(function (sec) {
      var k = sec.dataset.sec, f = secFrac(k), th = sec.querySelector(".th");
      setRing(th, f); th.classList.toggle("done", f === 1);
      sec.querySelector("[data-secpct]").textContent = Math.round(f * 100) + "%";
    });
  });
  var dp = $("#tocPct"); if (dp) { dp.textContent = overallPct() + "% completado"; $("#tocBar").style.width = overallPct() + "%"; }
}

/* ---------- Panel lateral (botón ☰) ---------- */
function openToc() { refreshToc(); $("#tocDrawer").classList.add("on"); $("#tocBg").classList.add("on"); $("#tocBtn").setAttribute("aria-expanded", "true"); setTimeout(function () { var c = $("#tocDrawer .titem.current") || $("#tocDrawer .dclose"); if (c) c.focus(); }, 80); }
function closeToc() { var d = $("#tocDrawer"); if (!d || !d.classList.contains("on")) return; d.classList.remove("on"); $("#tocBg").classList.remove("on"); $("#tocBtn").setAttribute("aria-expanded", "false"); }
function initToc() {
  renderToc($("#tocList"));
  $("#tocBtn").addEventListener("click", function () { if ($("#tocDrawer").classList.contains("on")) closeToc(); else openToc(); });
  $("#tocClose").addEventListener("click", closeToc);
  $("#tocBg").addEventListener("click", closeToc);
}
