"use strict";
/* ============================================================
   SECCIÓN 4 · CIERRE  (pantallas 27 a 30)
   ============================================================ */
SLIDES.push(

/* ---------- 27 · Cómo comunicar un posible incumplimiento ---------- */
{ id: "27", menu: "cierre", tema: "Comunicación de incumplimientos y no represalias", kicker: "Cierre", title: "¿Cómo comunicar un posible incumplimiento?",
  narr: [{ k: "27-1-intro-cierre", t: "Ya conoces los principios y lineamientos del Código. Para terminar, veremos cómo comunicar un posible incumplimiento y cuáles son las consecuencias de no cumplir el Código." },
         { k: "27-2-canales", t: "Si conoces o tienes una duda razonable sobre un posible incumplimiento, comunícalo. Puedes acudir primero a tu jefe inmediato o al gerente del área correspondiente. Si no te sientes cómodo o necesitas escalar la situación, acude a Gestión Humana, a la Gerencia General o a los demás canales internos de la Organización. Ten en cuenta que no necesitas tener certeza previa: basta una duda razonable. Tu consulta o reporte se tratará con confidencialidad. Y la Organización no adoptará represalias contra quien actúe de buena fe." }],
  render: function (s) {
    return head(s) + '<p class="lead"' + G(1, "si conoces") + ">Si conoces o tienes una <b>duda razonable</b> sobre un posible incumplimiento del Código, de la normativa o de las disposiciones internas:</p>" +
      '<div class="flow"><div class="flowstep"' + G(1, "puedes acudir primero") + '><span class="fn">1</span><div><small>Comunícalo primero a</small><b>Tu jefe inmediato o el Gerente del área correspondiente</b></div></div><div class="flowarrow"' + G(1, "si no te sientes") + ">" + svg("arrowR", 30) + "</div>" +
      '<div class="flowstep"' + G(1, "si no te sientes") + '><span class="fn">2</span><div><small>Si no te sientes cómodo o necesitas escalar</small><b>Gestión Humana · Gerencia General · otros canales internos de la Organización</b></div></div></div>' +
      '<div class="grid g3" style="margin-top:14px">' + blk("help", "Basta una duda razonable para comunicarlo.", { title: "Sin certeza previa", g: 1, cue: "no necesitas tener certeza", cls: "ok" }) +
      blk("lock", "Tu consulta o reporte se trata con la debida reserva.", { title: "Confidencialidad", g: 1, cue: "tu consulta o reporte", cls: "ok" }) +
      blk("shieldCheck", "No habrá represalias contra quien actúe de buena fe.", { title: "Sin represalias", g: 1, cue: "y la organización no adoptará", cls: "ok" }) + "</div>";
  }
},

/* ---------- 28 · Caso 5 ---------- */
caseSlide({ id: "28", num: 5, menu: "cierre", tema: "Caso práctico 5", title: "Comunicar un incumplimiento",
  situation: "Notas que un compañero registra en el sistema <b>salidas de almacén que no coinciden con los despachos reales</b>. No estás completamente seguro de que sea intencional.",
  visual: '<div class="mock ledger"><div class="cap">' + svg("box", 14) + ' Salidas de almacén vs. despachos</div><table><tr><th>Producto</th><th>Salida registrada</th><th>Despacho real</th></tr><tr><td>Lote 0412</td><td>20 cajas</td><td>20 cajas</td></tr><tr class="diff"><td>Lote 0415</td><td>35 cajas</td><td>18 cajas</td></tr><tr class="diff"><td>Lote 0419</td><td>12 cajas</td><td>5 cajas</td></tr></table></div>',
  opts: ["Esperar a tener pruebas concluyentes antes de decir algo.", "Comentarlo con otros compañeros para confirmar tus sospechas.", "Comunicarlo a tu jefe inmediato o a Gestión Humana, aunque no tengas certeza.", "Confrontar directamente a tu compañero y exigirle que lo corrija."],
  correct: 2,
  doRight: "No necesitas certeza para comunicar un posible incumplimiento. Si actúas de buena fe, se tratará con confidencialidad y sin represalias.",
  why: "No necesitas certeza previa para comunicar un posible incumplimiento: basta una duda razonable. Comunícalo por los canales internos. Si actúas de buena fe, tu reporte se tratará con confidencialidad y sin represalias." }),

/* ---------- 29 · Consecuencias y vigencia ---------- */
{ id: "29", menu: "cierre", tema: "Consecuencias del incumplimiento y vigencia", kicker: "Cierre", title: "Consecuencias del incumplimiento y vigencia",
  narr: [{ k: "29-consecuencias-vigencia", t: "El incumplimiento del Código puede dar lugar a las medidas que correspondan, de acuerdo con la normativa interna y la legislación aplicable. El Código rige desde su aprobación por la Gerencia General de la Organización y es de cumplimiento obligatorio para todas las personas comprendidas en su alcance." }],
  render: function (s) {
    function big(icon, color, soft, title, text, cue) { return '<div class="bigpanel"' + G(0, cue) + ' style="background:' + soft + '"><span class="bi" style="background:' + color + '">' + svg(icon, 32) + "</span><h3>" + title + "</h3><p>" + text + "</p></div>"; }
    return head(s) + '<div class="grid g2">' +
      big("alert", "var(--warn)", "var(--warn-soft)", "Consecuencias", "El incumplimiento de las disposiciones del Código puede dar lugar a las medidas que correspondan, de conformidad con la normativa interna de la Organización y la legislación aplicable.", "el incumplimiento") +
      big("calcheck", "var(--teal)", "var(--theme-soft)", "Vigencia", "El Código rige desde su aprobación por la Gerencia General de la Organización y es de cumplimiento obligatorio para todas las personas comprendidas en su alcance.", "el código rige") + "</div>";
  }
},

/* ---------- 30 · Nuestro compromiso ---------- */
{ id: "30", menu: "cierre", tema: "Nuestro compromiso", kicker: "Cierre", title: "Nuestro compromiso",
  narr: [{ k: "30-compromiso", t: "Cada uno de nosotros tiene la responsabilidad de conocer, comprender y cumplir los principios y lineamientos de este Código. Su cumplimiento forma parte de nuestras responsabilidades laborales. Por su parte, la Organización asegura su difusión y capacitación, y conserva los registros de tu participación. Gracias por actuar con integridad cada día." }],
  render: function (s) {
    return head(s) + '<div class="split even" style="align-items:center"><div style="display:flex;flex-direction:column;gap:14px">' +
      '<div class="quote"' + G(0, "cada uno de nosotros") + '><blockquote style="font-size:clamp(26px,3vw,38px)">Conocer, comprender y cumplir.</blockquote></div>' +
      blk("user", "Cada colaborador tiene la responsabilidad de conocer, comprender y cumplir los principios y lineamientos de este Código. Su cumplimiento forma parte de las responsabilidades de su relación laboral.", { g: 0, cue: "su cumplimiento forma parte" }) +
      blk("book", "La Organización asegura la difusión y capacitación del Código, y conserva los registros como evidencia.", { g: 0, cue: "la organización asegura" }) +
      '<div' + G(0, "gracias") + ' style="font-family:var(--display);font-weight:600;font-size:clamp(19px,2.1vw,25px);color:var(--theme)">Gracias por actuar con integridad cada día.</div></div>' +
      media("equipo.jpg", "Equipo de trabajo de la Organización") + "</div>";
  }
}

);
