"use strict";
/* ============================================================
   SECCIÓN 3 · CÓDIGO DE ÉTICA Y CONDUCTA  (pantallas 9 a 26)
   En los temas sincronizados, cada bloque lleva en `cue` la frase
   del guion con la que aparece y se resalta. Si se modifica el
   guion, conserva esas frases (o actualiza el `cue`).
   ============================================================ */
SLIDES.push(

/* ---------- 9 · Apertura del módulo ---------- */
{ id: "09", menu: "codigo", tema: "Lineamientos del Código", kicker: "Código de Ética y Conducta", title: "Lineamientos del Código de Ética y Conducta",
  narr: [{ k: "09-1-intro-modulo", t: "Ya conoces el propósito del Código, a quiénes aplica y cuáles son nuestros principios y valores. Ahora revisaremos los lineamientos de conducta que debemos seguir en el día a día." },
         { k: "09-2-temas", t: "Veremos once temas: responsabilidades y lineamientos de conducta; conflicto de intereses; confidencialidad; uso de bienes y recursos; integridad financiera y contable; actos de deshonestidad; anticorrupción, soborno y regalos; relaciones laborales y respeto; relación con clientes, proveedores y autoridades; comunicaciones responsables; y cumplimiento normativo. En algunos encontrarás un caso práctico para poner a prueba lo aprendido." }],
  render: function (s) {
    var t = [["clip", "Responsabilidades y lineamientos", "responsabilidades"], ["scale", "Conflicto de intereses", "conflicto", 1], ["lock", "Confidencialidad", "confidencialidad", 1], ["truck", "Uso de bienes y recursos", "uso de bienes"], ["ledger", "Integridad financiera y contable", "integridad financiera"], ["mask", "Actos de deshonestidad", "actos de deshonestidad"], ["ban", "Anticorrupción, soborno y regalos", "anticorrupción", 1], ["users", "Relaciones laborales y respeto", "relaciones laborales"], ["handshake", "Clientes, proveedores y autoridades", "relación con clientes"], ["megaphone", "Comunicaciones responsables", "comunicaciones", 1], ["gavel", "Cumplimiento normativo", "y cumplimiento normativo"]];
    return head(s, "En este módulo revisaremos <b>11 temas</b>. Presta atención: al final de algunos encontrarás un caso práctico.") +
      '<div class="grid g4">' + t.map(function (x, k) { return blk(x[0], x[3] ? '<span class="casetag">' + svg("target", 12) + " Caso práctico</span>" : "", { title: (k + 1) + ". " + x[1], g: 1, cue: x[2], cls: "compact center" }); }).join("") + "</div>";
  }
},

/* ---------- 10 · Responsabilidades (sincronizado) ---------- */
{ id: "10", menu: "codigo", tema: "Responsabilidades y lineamientos de conducta", kicker: "Tema 1 de 11", title: "Responsabilidades y lineamientos de conducta",
  narr: [{ k: "10-responsabilidades", t: "Cada integrante de la Organización debe mantener una conducta apropiada. Esto implica: actuar de manera ética y transparente en sus funciones; mantener relaciones de respeto y cordialidad con clientes, proveedores, colaboradores y terceros; evitar conductas que afecten la reputación, la imagen o los intereses de la Organización; usar adecuadamente los recursos, bienes y herramientas que se le proporcionan; cumplir las políticas, los procedimientos, este Código y la normativa aplicable; participar en las capacitaciones y mantenerse informado de las disposiciones vigentes; reportar oportunamente cualquier incumplimiento del Código; consultar a las instancias correspondientes ante cualquier duda; y actuar con diligencia y profesionalismo en sus responsabilidades." }],
  render: function (s) {
    var r = [["shieldCheck", "Actuar de manera ética y transparente en sus funciones.", "actuar de manera ética"],
      ["handshake", "Mantener relaciones de respeto y cordialidad con clientes, proveedores, colaboradores y terceros.", "mantener relaciones de respeto"],
      ["star", "Evitar conductas que afecten la reputación, imagen o intereses de la Organización.", "evitar conductas"],
      ["box", "Usar adecuadamente los recursos, bienes y herramientas que se le proporcionan.", "usar adecuadamente"],
      ["file", "Cumplir las políticas, los procedimientos, el Código y la normativa aplicable.", "cumplir las políticas"],
      ["book", "Participar en las capacitaciones y mantenerse informado de las disposiciones vigentes.", "participar en las capacitaciones"],
      ["flag", "Reportar oportunamente cualquier incumplimiento del Código.", "reportar oportunamente"],
      ["help", "Consultar a las instancias correspondientes ante dudas sobre la aplicación de las normas internas.", "consultar a las instancias"],
      ["briefcase", "Actuar con diligencia y profesionalismo en sus responsabilidades.", "actuar con diligencia"]];
    return head(s, "Cada integrante de la Organización debe:") + '<div class="grid g3">' + r.map(function (x) { return blk(x[0], x[1], { g: 0, cue: x[2] }); }).join("") + "</div>";
  }
},

/* ---------- 11 · Si lideras un equipo (sincronizado) ---------- */
{ id: "11", menu: "codigo", tema: "Si lideras un equipo", kicker: "Tema 1 de 11", title: "Si lideras un equipo, tienes responsabilidades adicionales",
  narr: [{ k: "11-lideres", t: "Si tienes personal a cargo o un puesto de confianza, tienes responsabilidades adicionales. Debes promover una cultura ética dentro de tu equipo. Liderar con el ejemplo en tu forma de actuar y decidir. Gestionar oportunamente las situaciones que representen riesgos éticos o incumplimientos. Y fomentar un ambiente de confianza que facilite las consultas y los reportes de buena fe." }],
  render: function (s) {
    return head(s, "Además de lo anterior, el <b>personal de dirección y confianza</b> debe:") + '<div class="split"><div class="grid g2">' +
      blk("compass", "Promover una cultura ética dentro de su equipo.", { g: 0, cue: "promover una cultura ética" }) +
      blk("star", "Liderar con el ejemplo en su forma de actuar y decidir.", { g: 0, cue: "liderar con el ejemplo" }) +
      blk("shield", "Gestionar oportunamente las situaciones que representen riesgos éticos o incumplimientos.", { g: 0, cue: "gestionar oportunamente" }) +
      blk("chat", "Fomentar un ambiente de confianza que facilite las consultas y los reportes de buena fe.", { g: 0, cue: "fomentar un ambiente" }) +
      "</div>" + media("caso1.jpg", "Líder conversando con su equipo") + "</div>";
  }
},

/* ---------- 12 · Conflicto de intereses (sincronizado) ---------- */
{ id: "12", menu: "codigo", tema: "Conflicto de intereses", kicker: "Tema 2 de 11", title: "Conflicto de intereses",
  narr: [{ k: "12-conflicto", t: "Existe un conflicto de intereses cuando tus intereses personales, familiares, económicos o de otra naturaleza pueden interferir en la objetividad de tus decisiones. Frente a ello, debes: evitar las situaciones que generen conflictos de intereses reales, potenciales o aparentes; comunicar oportunamente a la Gerencia cualquier situación que pueda representar un conflicto; y abstenerte de participar en decisiones en las que tengas un interés personal. Recuerda: está prohibido usar tu posición o tus funciones para obtener beneficios personales o favorecer indebidamente a terceros." }],
  render: function (s) {
    return head(s) + defpanel("scale", "<b>¿Qué es?</b> Ocurre cuando intereses personales, familiares, económicos o de otra naturaleza pueden interferir en la objetividad e imparcialidad de tus decisiones en la Organización.", { g: 0, cue: "existe un conflicto" }) +
      lbl("Por eso, debes:") + '<div class="grid g3">' +
      blk("eye", "Situaciones que generen conflictos de intereses reales, potenciales o aparentes.", { title: "Evitar", g: 0, cue: "evitar las situaciones", cls: "stack" }) +
      blk("megaphone", "Oportunamente a la Gerencia cualquier situación que pueda representar un conflicto.", { title: "Comunicar", g: 0, cue: "comunicar oportunamente", cls: "stack" }) +
      blk("hand", "De participar en decisiones en las que tengas un interés personal o beneficio indebido.", { title: "Abstenerte", g: 0, cue: "abstenerte de participar", cls: "stack" }) + "</div>" +
      note("no", "ban", "Está prohibido usar tu posición o funciones para obtener beneficios personales o favorecer indebidamente a terceros.", { g: 0, cue: "está prohibido" });
  }
},

/* ---------- 13 · Ejemplos de conflicto de intereses (tarjetas con imagen) ---------- */
flipCardsSlide({ id: "13", menu: "codigo", tema: "Conflicto de intereses", kicker: "Tema 2 de 11", title: "Conflicto de intereses: ejemplos comunes", ex: true,
  lead: "Selecciona cada tarjeta para descubrir situaciones que configuran un conflicto de intereses.",
  narr: [{ k: "13-0-ejemplos", t: "Veamos algunos ejemplos comunes de conflicto de intereses. Selecciona cada tarjeta." }],
  items: [
    { k: "13-1-ejemplo", icon: "box", img: "ejemplo-bienes-uso-personal.svg", alt: "Vehículo de la empresa usado para fines personales", text: "Utilizar bienes de la Organización para beneficio personal.", t: "Utilizar bienes de la Organización para beneficio personal." },
    { k: "13-2-ejemplo", icon: "handshake", img: "ejemplo-transacciones-amanadas.svg", alt: "Acuerdo con dinero por debajo de la mesa", text: "Participar en transacciones amañadas para beneficiar a determinados clientes o proveedores.", t: "Participar en transacciones amañadas para beneficiar a determinados clientes o proveedores." },
    { k: "13-3-ejemplo", icon: "money", img: "ejemplo-soborno.svg", alt: "Entrega de un sobre con dinero", text: "Aceptar sobornos de clientes o proveedores de la Organización.", t: "Aceptar sobornos de clientes o proveedores." },
    { k: "13-4-ejemplo", icon: "users", img: "ejemplo-relacion-personal.svg", alt: "Vínculo personal que afecta una decisión", text: "Mantener relaciones personales, familiares o sentimentales que puedan afectar la objetividad, sin comunicarlo oportunamente por los canales definidos.", t: "Mantener relaciones personales, familiares o sentimentales que puedan afectar la objetividad, sin haberlo comunicado oportunamente por los canales definidos por la Organización." }
  ],
  closing: { k: "13-5-cierre", t: "Recuerda que el incumplimiento puede dar lugar a las medidas que correspondan, según la normativa interna y la ley.", text: "El incumplimiento puede dar lugar a las medidas que correspondan, conforme a la normativa interna y la legislación aplicable." } }),

/* ---------- 14 · Caso 1 ---------- */
caseSlide({ id: "14", num: 1, tema: "Caso práctico 1", title: "Conflicto de intereses",
  situation: "Participas en la evaluación de propuestas para contratar un servicio de mantenimiento. Una de las empresas postulantes <b>pertenece a tu cuñado</b>, y nadie en el equipo lo sabe.",
  visual: '<div class="mock ledger"><div class="cap">' + svg("clip", 14) + ' Evaluación de propuestas · Servicio de mantenimiento</div><table><tr><th>Postulante</th><th>Estado</th></tr><tr><td>Empresa A</td><td>En evaluación</td></tr><tr class="diff"><td>Empresa B · <i>de tu cuñado</i></td><td>En evaluación</td></tr><tr><td>Empresa C</td><td>En evaluación</td></tr></table></div>',
  opts: ["Evaluar la propuesta con normalidad; confías en tu objetividad.", "Comunicar la situación a la Gerencia y abstenerte de participar en esa decisión.", "Compartir con tu cuñado los precios de las otras propuestas para que mejore su oferta.", "Retirarte del proceso sin explicar el motivo."],
  correct: 1,
  doRight: "Ante un conflicto de intereses real, potencial o aparente, comunícalo oportunamente a la Gerencia y abstente de participar en la decisión.",
  why: "Cuando existe un vínculo familiar con un proveedor, debes comunicarlo oportunamente a la Gerencia y abstenerte de participar en la decisión. Retirarte sin explicar no es suficiente: la comunicación es obligatoria." }),

/* ---------- 15 · Confidencialidad (sincronizado) ---------- */
{ id: "15", menu: "codigo", tema: "Confidencialidad y protección de información", kicker: "Tema 3 de 11", title: "Confidencialidad y protección de información",
  narr: [{ k: "15-confidencialidad", t: "Toda información a la que accedes por tu trabajo debe protegerse. Se considera información confidencial, entre otra: la información financiera y contable; la información comercial y estratégica; los datos personales; la información de clientes, proveedores y otros terceros; los contratos y la documentación interna; las claves y accesos a los sistemas; y cualquier otra información no pública. Úsala solo para fines vinculados a tus funciones. Está prohibido divulgarla, reproducirla o entregarla sin autorización previa de la Organización. Y recuerda: el deber de confidencialidad continúa incluso después de terminar tu relación laboral o contractual." }],
  render: function (s) {
    var inf = [["coins", "Información financiera y contable", "la información financiera"], ["chart", "Información comercial y estratégica", "la información comercial"], ["idcard", "Datos personales", "los datos personales"], ["users", "Información de clientes, proveedores y otros terceros", "la información de clientes"], ["fileSign", "Contratos y documentación interna", "los contratos"], ["key", "Claves y accesos a sistemas", "las claves"], ["spy", "Cualquier otra información no pública", "y cualquier otra información"]];
    return head(s) + '<div class="split even"><div>' + lbl("Se considera información confidencial, entre otra:", "", "lock") + '<div class="grid g2">' +
      inf.map(function (x, k) { return blk(x[0], "", { title: x[1], g: 0, cue: x[2], cls: "compact center", style: k === 6 ? "grid-column:1/-1" : "" }); }).join("") + "</div></div>" +
      '<div class="grid">' + blk("target", "La información a la que accedes por tu trabajo solo puede usarse para fines vinculados a tus funciones.", { title: "Úsala solo para tus funciones.", g: 0, cue: "úsala solo" }) +
      blk("ban", "Está prohibido divulgarla, reproducirla, usarla o entregarla sin autorización previa de la Organización.", { title: "No la divulgues sin autorización.", g: 0, cue: "está prohibido divulgarla", cls: "no" }) +
      blk("clock", "La obligación de confidencialidad se mantiene incluso después de terminar la relación laboral o contractual.", { title: "El deber continúa.", g: 0, cue: "el deber de confidencialidad" }) + "</div></div>";
  }
},

/* ---------- 16 · Bienes y recursos (sincronizado) ---------- */
{ id: "16", menu: "codigo", tema: "Uso adecuado de bienes y recursos", kicker: "Tema 4 de 11", title: "Uso adecuado de bienes y recursos",
  narr: [{ k: "16-bienes-recursos", t: "Los bienes de la Organización, como las unidades de transporte, los equipos y las herramientas, y sus recursos, como los sistemas informáticos y los accesos, se usan solo para fines de la Organización. Por eso, está prohibido: usar los recursos de la Organización para fines personales no autorizados; dañar, alterar o hacer uso indebido de los bienes; usar los sistemas para actividades contrarias a la ley, a las políticas internas o a las buenas costumbres; y exceder las facultades, autorizaciones o accesos otorgados." }],
  render: function (s) {
    return head(s) + defpanel("box", "<b>Bienes</b> (unidades de transporte, equipos, herramientas) y <b>recursos</b> (sistemas informáticos y accesos) se usan exclusivamente para fines de la Organización.", { g: 0, cue: "los bienes de la organización" }) +
      '<div class="split"><div>' + lbl("Está prohibido:", "no", "ban") + '<div class="grid g2">' +
      blk("user", "Usar los recursos de la Organización para fines personales no autorizados.", { g: 0, cue: "usar los recursos", cls: "no" }) +
      blk("alert", "Dañar, alterar o hacer uso indebido de los bienes de la Organización.", { g: 0, cue: "dañar, alterar", cls: "no" }) +
      blk("globe", "Usar los sistemas para actividades contrarias a la ley, las políticas internas o las buenas costumbres.", { g: 0, cue: "usar los sistemas", cls: "no" }) +
      blk("key", "Exceder las facultades, autorizaciones o accesos otorgados.", { g: 0, cue: "exceder las facultades", cls: "no" }) +
      "</div></div>" + media("unidad.jpg", "Unidad de transporte de la Organización") + "</div>";
  }
},

/* ---------- 17 · Integridad financiera (sincronizado) ---------- */
{ id: "17", menu: "codigo", tema: "Integridad financiera y contable", kicker: "Tema 5 de 11", title: "Integridad financiera y contable",
  narr: [{ k: "17-integridad-financiera", t: "Todo registro, reporte o documento financiero y contable debe reflejar de forma veraz, exacta y transparente lo que realmente ocurrió. Por eso, está prohibido: alterar información financiera o contable; registrar operaciones inexistentes o inexactas; ocultar información relevante; y usar documentación falsa, adulterada o fraudulenta." }],
  render: function (s) {
    return head(s) + defpanel("ledger", "Toda operación, registro, reporte o documento financiero y contable debe reflejar de forma <b>veraz, exacta y transparente</b> lo que realmente ocurrió.", { g: 0, cue: "todo registro" }) +
      lbl("Está prohibido:", "no", "ban") + '<div class="grid g4">' +
      blk("chart", "Alterar información financiera o contable.", { g: 0, cue: "alterar información", cls: "no stack" }) +
      blk("ledger", "Registrar operaciones inexistentes o inexactas.", { g: 0, cue: "registrar operaciones", cls: "no stack" }) +
      blk("eye", "Ocultar información relevante.", { g: 0, cue: "ocultar información", cls: "no stack" }) +
      blk("fileSign", "Usar documentación falsa, adulterada o fraudulenta.", { g: 0, cue: "usar documentación falsa", cls: "no stack" }) + "</div>";
  }
},

/* ---------- 18 · Caso 2 ---------- */
caseSlide({ id: "18", num: 2, tema: "Caso práctico 2", title: "Confidencialidad",
  situation: "Un excompañero que ahora trabaja en otra droguería te escribe por WhatsApp. Te pide <b>la lista de precios y los principales clientes</b> “solo como referencia”, y promete no compartirla.",
  visual: '<div class="mock chat"><div class="ch"><span class="av">' + svg("user", 18) + '</span><div><b>Excompañero</b><small>en línea</small></div></div><div class="bub">¡Hola! ¿Cómo va todo por allá? 😊<span class="tm">10:41</span></div><div class="bub">¿Me pasas la lista de precios y los principales clientes? Es solo como referencia, te prometo que no la comparto 🙏<span class="tm">10:42</span></div></div>',
  opts: ["Enviarla, porque él ya conocía parte de esa información.", "Enviar solo la lista de precios, sin los clientes.", "No compartir la información y, si insiste, informarlo a tu jefe inmediato.", "Enviarla desde tu correo personal para no dejar registro."],
  correct: 2,
  doRight: "La información comercial y estratégica es confidencial: no se entrega sin autorización previa, sin importar a quién ni por qué medio.",
  why: "La lista de precios y los clientes son información comercial confidencial. No puede entregarse sin autorización previa de la Organización, sin importar la relación que tengas con quien la pide ni el medio que se use." }),

/* ---------- 19 · Actos de deshonestidad (sincronizado) ---------- */
{ id: "19", menu: "codigo", tema: "Actos de deshonestidad", kicker: "Tema 6 de 11", title: "Actos de deshonestidad",
  narr: [{ k: "19-deshonestidad", t: "La Organización espera que todos actuemos con honestidad, transparencia y buena fe, y condena las prácticas deshonestas, como: perturbar el normal desarrollo de las actividades; contravenir los principios o disposiciones de los reglamentos internos; acceder y usar indebidamente información administrativa; permitir el ingreso de personas ajenas a las instalaciones, con fines personales y sin autorización de Gerencia; realizar actividades ajenas a tus funciones que afecten las operaciones; usar documentos falsos, fraudulentos o adulterados para acreditar un hecho u obtener un beneficio; y suplantar la identidad de otra persona o permitir que lo hagan. Actúa siempre con honestidad, transparencia y buena fe." }],
  render: function (s) {
    var d = [["alert", "Perturbar el normal desarrollo de las actividades de la Organización.", "perturbar"], ["file", "Contravenir los principios, fines o disposiciones de los reglamentos internos.", "contravenir"], ["eye", "Acceder y usar indebidamente información administrativa.", "acceder y usar"], ["door", "Permitir el ingreso de personas ajenas a las instalaciones, con fines personales y sin autorización de Gerencia.", "permitir el ingreso"], ["briefcase", "Realizar actividades ajenas a tus funciones que afecten las operaciones.", "realizar actividades ajenas"], ["fileSign", "Usar documentos falsos, fraudulentos o adulterados para acreditar un hecho u obtener un beneficio.", "usar documentos falsos"], ["mask", "Suplantar la identidad de otra persona o permitir que lo hagan.", "suplantar la identidad"]];
    return head(s, "Esperamos que todos actuemos con honestidad, transparencia y buena fe. Por eso, la Organización <b>condena</b>:") + '<div class="grid g2">' +
      d.map(function (x) { return blk(x[0], x[1], { g: 0, cue: x[2], cls: "no" }); }).join("") +
      '<div class="note ok" style="margin:0"' + G(0, "actúa siempre") + '><span class="ni">' + svg("check", 19) + "</span><span>Actúa siempre con honestidad, transparencia y buena fe.</span></div></div>";
  }
},

/* ---------- 20 · Anticorrupción (sincronizado) ---------- */
{ id: "20", menu: "codigo", tema: "Anticorrupción, soborno y regalos", kicker: "Tema 7 de 11", title: "Anticorrupción, soborno y regalos",
  narr: [{ k: "20-anticorrupcion", t: "La Organización tiene tolerancia cero frente a la corrupción, el soborno, el fraude y cualquier conducta indebida, y rechaza las operaciones vinculadas con actividades ilícitas o con el ocultamiento del origen de fondos. Por eso, está prohibido: ofrecer, prometer, entregar o recibir pagos indebidos o beneficios ilícitos; solicitar o aceptar regalos, favores o atenciones que puedan influir en una decisión; y realizar actos que vulneren el principio de integridad. ¿Y los regalos o atenciones de cortesía? Solo pueden aceptarse si cumplen tres condiciones: son de valor razonable; están permitidos por la ley y las disposiciones internas; y no comprometen tu independencia, objetividad ni imparcialidad." }],
  render: function (s) {
    var cond = [["Son de valor razonable.", "son de valor razonable"], ["Están permitidos por la ley y las disposiciones internas.", "están permitidos"], ["No comprometen tu independencia, objetividad ni imparcialidad.", "y no comprometen"]];
    return head(s) + defpanel("ban", "<b>TOLERANCIA CERO</b> frente a la corrupción, el soborno, el fraude y cualquier conducta indebida, así como a operaciones vinculadas con actividades ilícitas o con el ocultamiento del origen de fondos.", { g: 0, cue: "tolerancia cero", cls: "danger" }) +
      '<div class="split even"><div>' + lbl("Está prohibido:", "no", "ban") + '<div class="grid">' +
      blk("money", "Ofrecer, prometer, entregar o recibir, directa o indirectamente, pagos indebidos o beneficios ilícitos.", { g: 0, cue: "ofrecer, prometer", cls: "no" }) +
      blk("gift", "Solicitar o aceptar regalos, favores o atenciones que puedan influir indebidamente en una decisión.", { g: 0, cue: "solicitar o aceptar", cls: "no" }) +
      blk("shield", "Realizar actos que vulneren el principio de integridad.", { g: 0, cue: "realizar actos", cls: "no" }) + "</div></div>" +
      '<div class="blk stack ok" style="background:var(--good-soft);border-color:#bfe3cd"' + G(0, "¿y los regalos") + '><span class="ic" style="background:var(--good);color:#fff">' + svg("gift", 24) + "</span><p><b>¿Y los regalos o atenciones de cortesía?</b>Pueden aceptarse <b style=\"display:inline\">solo si</b> cumplen las tres condiciones:</p>" +
      cond.map(function (c) { return '<div class="blk ok compact center" style="width:100%"' + G(0, c[1]) + '><span class="ic" style="background:var(--good);color:#fff">' + svg("check", 21) + '</span><p style="font-weight:600;color:#14603a">' + c[0] + "</p></div>"; }).join("") + "</div></div>";
  }
},

/* ---------- 21 · Caso 3 ---------- */
caseSlide({ id: "21", num: 3, tema: "Caso práctico 3", title: "Regalos",
  situation: "Un proveedor cuya cotización estás evaluando te envía una <b>canasta costosa y dos entradas para un concierto</b>. En la tarjeta dice: “Esperamos contar con su apoyo en la adjudicación”.",
  visual: '<div class="mock giftcard"><span class="gi">' + svg("gift", 34) + '</span><div><div class="tag">“Esperamos contar con su apoyo en la adjudicación.”</div><div class="items"><span>Canasta costosa</span><span>2 entradas para concierto</span></div></div></div>',
  opts: ["Aceptar el obsequio; es una costumbre en el sector.", "Aceptar solo la canasta y devolver las entradas.", "Aceptarlo y compartirlo con tu equipo para que no sea personal.", "No aceptarlo y comunicar la situación a tu jefe inmediato o a la Gerencia."],
  correct: 3,
  doRight: "Un obsequio que busca influir en una decisión comercial no debe aceptarse, sin importar su valor o con quién lo compartas.",
  why: "Este obsequio busca influir en una decisión comercial, por lo que no debe aceptarse, ni total ni parcialmente, aunque se comparta con el equipo. Además, comunica la situación para que se gestione adecuadamente." }),

/* ---------- 22 · Relaciones laborales (tarjetas con imagen) ---------- */
flipCardsSlide({ id: "22", menu: "codigo", tema: "Relaciones laborales y respeto", kicker: "Tema 8 de 11", title: "Relaciones laborales y respeto",
  lead: "Promovemos un ambiente de trabajo respetuoso, seguro y adecuado. Selecciona cada pilar.",
  narr: [{ k: "22-0-relaciones", t: "La Organización promueve relaciones laborales basadas en el respeto y un ambiente de trabajo seguro. Selecciona cada pilar para conocerlo." }],
  items: [
    { k: "22-1-igualdad", icon: "equal", title: "Igualdad y no discriminación", img: "relacion-igualdad.svg", text: "Relaciones basadas en el respeto, la igualdad de oportunidades y el trato equitativo, sin discriminación por ningún motivo.", t: "Nuestras relaciones laborales se basan en el respeto, la igualdad de oportunidades y el trato equitativo. No se admite ningún acto de discriminación." },
    { k: "22-2-libre-acoso", icon: "hand", title: "Libre de acoso", img: "relacion-libre-acoso.svg", text: "No se tolera ninguna forma de hostigamiento, acoso, violencia o maltrato.", t: "No toleramos ninguna forma de hostigamiento, acoso, violencia o maltrato." },
    { k: "22-3-entorno", icon: "smile", title: "Entorno respetuoso", img: "relacion-entorno-respetuoso.svg", text: "Conducta respetuosa y profesional, también fuera de las instalaciones cuando representas a la Organización. No se tolera el abuso de autoridad.", t: "Mantén una conducta respetuosa y profesional, también fuera de las instalaciones cuando representas a la Organización. Tampoco se tolera el abuso de autoridad." },
    { k: "22-4-seguro", icon: "heartpulse", title: "Ambiente seguro y saludable", img: "relacion-ambiente-seguro.svg", text: "Cumple las disposiciones de seguridad y salud en el trabajo y actúa con responsabilidad para protegerte y proteger a los demás.", t: "Cumple las disposiciones de seguridad y salud en el trabajo y actúa con responsabilidad para proteger tu seguridad y la de los demás." }
  ] }),

/* ---------- 23 · Clientes, proveedores y autoridades (sincronizado) ---------- */
{ id: "23", menu: "codigo", tema: "Relación con clientes, proveedores y autoridades", kicker: "Tema 9 de 11", title: "Relación con clientes, proveedores y autoridades",
  narr: [{ k: "23-clientes-autoridades", t: "Nuestras relaciones con clientes y proveedores se basan en la transparencia, el profesionalismo, la buena fe y el respeto, con negociaciones basadas en criterios objetivos y sin prácticas que afecten la libre competencia o nuestra reputación. Con las autoridades, colaboramos de forma transparente, veraz y oportuna, brindamos la información que corresponda según la ley y no realizamos conductas que afecten la integridad de sus actuaciones. Y la Organización reafirma su compromiso de cumplir todas las obligaciones legales y regulatorias aplicables." }],
  render: function (s) {
    function col(icon, title, items, bg, cue) {
      return '<div class="col3"' + G(0, cue) + '><div class="th" style="background:' + bg + '"><span class="tn">' + svg(icon, 22) + "</span>" + title + '</div><div class="cl">' + items.map(function (t) { return "<div>" + svg("check", 17) + "<span>" + t + "</span></div>"; }).join("") + "</div></div>";
    }
    return head(s) + '<div class="grid g3" style="align-items:stretch">' +
      col("handshake", "Clientes y proveedores", ["Relaciones con transparencia, profesionalismo, buena fe y respeto.", "Negociaciones basadas en criterios objetivos.", "Sin prácticas indebidas que afecten la libre competencia o la reputación de la Organización."], "#033985", "nuestras relaciones con clientes") +
      col("gavel", "Autoridades", ["Colaborar de forma transparente, veraz y oportuna.", "Brindar la información que corresponda según la ley.", "No realizar conductas que afecten la integridad de las actuaciones administrativas o de otra naturaleza."], "#008FD7", "con las autoridades") +
      col("shieldCheck", "Obligaciones legales", ["La Organización reafirma su compromiso de cumplir todas las obligaciones legales y regulatorias aplicables."], "#0F7C8C", "y la organización reafirma") + "</div>";
  }
},

/* ---------- 24 · Comunicaciones (sincronizado) ---------- */
{ id: "24", menu: "codigo", tema: "Comunicaciones responsables", kicker: "Tema 10 de 11", title: "Comunicaciones responsables",
  narr: [{ k: "24-comunicaciones", t: "Nuestras comunicaciones internas y externas deben ser veraces, profesionales y coherentes con nuestros valores. Cuando informes sobre la Organización, hazlo con responsabilidad y dentro de tus funciones, también en redes sociales y medios digitales. Sin autorización expresa, nadie puede hablar en nombre de la Organización ni presentar opiniones personales como si fueran oficiales. Las comunicaciones institucionales las realizan únicamente las personas y los canales autorizados." }],
  render: function (s) {
    return head(s) + '<div class="split"><div class="grid g2">' +
      blk("chat", "Tus comunicaciones internas y externas deben ser coherentes con nuestros valores y disposiciones.", { title: "Veraces y profesionales.", g: 0, cue: "nuestras comunicaciones" }) +
      blk("share", "Al informar sobre la Organización, sé veraz y actúa dentro de tus funciones, incluso en redes sociales y medios digitales.", { title: "Con responsabilidad, también en redes.", g: 0, cue: "cuando informes" }) +
      blk("ban", "Nadie puede declarar, asumir compromisos ni presentar opiniones personales como posiciones oficiales de la Organización.", { title: "Sin autorización, no hables en su nombre.", g: 0, cue: "sin autorización expresa", cls: "no" }) +
      blk("radio", "Las comunicaciones institucionales las realizan únicamente las personas y los canales autorizados.", { title: "Solo canales autorizados.", g: 0, cue: "las comunicaciones institucionales" }) +
      "</div>" + media("caso4.jpg", "Persona atendiendo una llamada") + "</div>";
  }
},

/* ---------- 25 · Caso 4 ---------- */
caseSlide({ id: "25", num: 4, tema: "Caso práctico 4", title: "Comunicaciones",
  situation: "Un cliente publica en redes sociales una queja por un despacho retrasado y <b>etiqueta a la empresa</b>. Tú conoces lo que pasó y quieres aclararlo.",
  visual: '<div class="mock post"><div class="ph"><span class="av">C</span><div><b>Cliente</b><small>hace 15 min · Público</small></div></div><p>Mi pedido debía llegar ayer y todavía no llega 😡 ¿Alguien me puede explicar qué pasa? <span class="at">@laempresa</span></p><div class="acts"><span>👍 Me gusta</span><span>💬 Comentar</span><span>↗ Compartir</span></div></div>',
  opts: ["Responder desde tu cuenta personal explicando lo que ocurrió internamente.", "Informar a tu jefe inmediato para que la respuesta se gestione por el canal autorizado.", "Responder en nombre de la empresa, porque conoces el caso.", "Publicar un comentario personal cuestionando al cliente."],
  correct: 1,
  doRight: "Solo las personas autorizadas pueden pronunciarse en nombre de la Organización. Canaliza tu aporte a través de tu jefe inmediato.",
  why: "Solo las personas autorizadas pueden pronunciarse en nombre de la Organización. Lo que sabes es valioso: compártelo con tu jefe inmediato para que la respuesta se gestione por el canal autorizado." }),

/* ---------- 26 · Cumplimiento normativo ---------- */
{ id: "26", menu: "codigo", tema: "Cumplimiento normativo", kicker: "Tema 11 de 11", title: "Cumplimiento normativo",
  narr: [{ k: "26-cumplimiento", t: "Todas las personas comprendidas en este Código deben cumplir la ley y las políticas, procedimientos y disposiciones internas de la Organización. Recuerda: desconocer el Código no te exime de responsabilidad. Si tienes dudas, consulta a tu jefe inmediato o a Gestión Humana." }],
  render: function (s) {
    return head(s) + defpanel("gavel", "Cumplimos la <b>normativa legal vigente</b> y las <b>políticas, procedimientos y disposiciones internas</b> de la Organización.", { g: 0, cue: "todas las personas" }) +
      note("warn", "alert", "El desconocimiento de las disposiciones del Código <b>no exime de responsabilidad</b>.", { g: 0, cue: "desconocer el código", big: true }) +
      note("info", "help", "¿Tienes dudas sobre cómo aplicar una disposición? Consulta a tu <b>jefe inmediato</b> o a <b>Gestión Humana</b>.", { g: 0, cue: "si tienes dudas", big: true });
  }
}

);
