"use strict";
/* ============================================================
   SECCIÓN 1 · INICIO  (pantallas 1 a 3)
   Cada pantalla: id, menu (sección), tema (apartado de la tabla
   de contenido), title, narr (audios), render (HTML).
   ============================================================ */
SLIDES.push(

/* ---------- 1 · Portada ---------- */
{ id: "01", menu: "inicio", tema: "Bienvenida", cardClass: "hero", nextLabel: "Comenzar", title: "Código de Ética y Conducta",
  narr: [{ k: "01-bienvenida", t: "Te damos la bienvenida a la autoformación sobre el Código de Ética y Conducta de la Organización. Este Código reúne los principios, valores y lineamientos que orientan la forma en que trabajamos y nos relacionamos con clientes, proveedores, autoridades y entre compañeros. En los próximos minutos conocerás qué se espera de cada uno de nosotros y cómo actuar ante situaciones que pueden presentarse en el día a día. Cuando estés listo, presiona Comenzar." }],
  render: function (s) {
    return '<div><span class="kicker sq">Capacitación interna · Autoformación</span><h1 class="t sq">Código de Ética<br>y Conducta</h1><div class="tbar sq"></div><div class="sub sq">Principios, valores y lineamientos de conducta</div>' +
      '<div class="meta sq"><span class="chip">' + svg("clock", 15) + ' Duración aproximada: 30 minutos</span><span class="chip">' + svg("compass", 15) + ' 5 casos prácticos</span><span class="chip">' + svg("award", 15) + " Evaluación y certificado</span></div>" +
      '<button type="button" class="startbtn sq" data-start><span class="pi">' + svg("play", 18) + "</span><span data-startlbl>Iniciar</span></button></div>" +
      media("equipo.jpg", "Equipo de trabajo de la Organización");
  },
  wire: function (sc, s) {
    $("[data-start]", sc).addEventListener("click", function () {
      audioUnlocked = true; primeAudio(); if (P.playing) return;
      startNarr(s.i, 0, true); this.classList.add("playing"); $("[data-startlbl]", sc).textContent = "Escuchando…"; refreshNav();
    });
  },
  afterNarr: function (sc) { var b = $("[data-start]", sc); b.classList.remove("playing"); $("[data-startlbl]", sc).textContent = "Volver a escuchar"; }
},

/* ---------- 2 · Cómo funciona ---------- */
{ id: "02", menu: "inicio", tema: "Cómo realizar esta capacitación", title: "¿Cómo realizar esta capacitación?",
  narr: [{ k: "02-como-funciona", t: "Antes de comenzar, conoce cómo se desarrolla esta capacitación. Primero, aprenderás los principios, valores y lineamientos del Código. Luego, analizarás situaciones que pueden presentarse en tu trabajo diario. En cada caso práctico, decidirás cómo actuar antes de conocer la respuesta. Al final, rendirás una evaluación y, si apruebas, podrás descargar tu certificado. Recuerda seguir la secuencia completa: el botón Siguiente se habilitará al terminar cada audio." }],
  render: function (s) {
    var st = [["book", "Aprende", "Revisa los principios, valores y lineamientos de conducta del Código.", "primero"],
      ["search", "Analiza", "Reflexiona sobre situaciones que pueden presentarse en tu trabajo diario.", "luego"],
      ["target", "Decide", "En cada caso práctico, elige cómo actuarías antes de conocer la respuesta.", "en cada caso práctico"],
      ["award", "Evalúate", "Rinde la evaluación final y descarga tu certificado al aprobar.", "al final"]];
    return head(s) + '<div class="grid g4">' + st.map(function (x, k) { return '<div class="stepcard"' + G(0, x[3]) + '><span class="sn">' + (k + 1) + '</span><span class="sic">' + svg(x[0], 28) + "</span><h3>" + x[1] + "</h3><p>" + x[2] + "</p></div>"; }).join("") + "</div>" +
      note("info", "alert", "Sigue la secuencia completa. El botón <b>Siguiente</b> se habilita al finalizar el audio de cada pantalla.", { g: 0, cue: "recuerda" });
  }
},

/* ---------- 3 · Tabla de contenido (interactiva) ---------- */
{ id: "03", menu: "inicio", tema: "Tabla de contenido", title: "Tabla de contenido",
  narr: [{ k: "03-estructura", t: "La capacitación se organiza en cuatro partes: Introducción, Código de Ética y Conducta, Cierre y Evaluación. En esta tabla verás el estado de cada apartado: completado, en curso, pendiente o bloqueado. Puedes seleccionar cualquier apartado habilitado para ir directamente a él. También puedes abrir esta tabla en todo momento con el botón de menú, en la esquina superior izquierda." }],
  render: function (s) {
    return head(s) + '<div class="tocgrid" data-toc="pantalla"></div>' +
      note("info", "menu", "Selecciona un apartado para ir directamente a él. Los apartados bloqueados se habilitan conforme avanzas. También puedes abrir esta tabla con el botón <b>☰</b> del encabezado.", { g: 0, cue: "puedes seleccionar" });
  },
  wire: function (sc) { renderToc($("[data-toc]", sc), ["intro", "codigo", "cierre", "eval"]); refreshToc(); }
}

);
