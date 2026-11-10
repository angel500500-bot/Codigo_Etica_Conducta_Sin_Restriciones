"use strict";
/* ============================================================
   SECCIÓN 2 · INTRODUCCIÓN  (pantallas 4 a 8)
   ============================================================ */
SLIDES.push(

/* ---------- 4 · Objetivos ---------- */
{ id: "04", menu: "intro", tema: "Objetivos", kicker: "Introducción", title: "Objetivos",
  narr: [{ k: "04-1-intro-modulo", t: "En este módulo conocerás por qué contamos con un Código de Ética y Conducta, a quiénes aplica y cuáles son los principios y valores que lo sustentan." },
         { k: "04-2-objetivos", t: "Al finalizar esta capacitación podrás: conocer los principios, valores y lineamientos de conducta que orientan nuestras actividades; identificar situaciones de riesgo ético, como conflictos de intereses, regalos o uso de información, y saber cómo actuar; y saber cómo y a quién comunicar un posible incumplimiento, con la confianza de que no habrá represalias." }],
  render: function (s) {
    var ob = [["compass", "Conocer", "los principios, valores y lineamientos de conducta que orientan nuestras actividades.", "conocer los principios"],
      ["alert", "Identificar", "situaciones de riesgo ético como conflictos de intereses, regalos o uso de información, y cómo actuar frente a ellas.", "identificar situaciones"],
      ["megaphone", "Saber", "cómo y a quién comunicar un posible incumplimiento, con la confianza de que no habrá represalias.", "y saber cómo y a quién"]];
    return head(s, "Al finalizar esta capacitación podrás:") + '<div class="grid g3">' + ob.map(function (x, k) { return '<div class="stepcard"' + G(1, x[3]) + '><span class="sn">' + (k + 1) + '</span><span class="sic">' + svg(x[0], 28) + "</span><h3>" + x[1] + "</h3><p>" + x[2] + "</p></div>"; }).join("") + "</div>";
  }
},

/* ---------- 5 · Mensaje de Gerencia General ---------- */
{ id: "05", menu: "intro", tema: "Mensaje de Gerencia General", kicker: "Introducción", title: "Mensaje de Gerencia General",
  narr: [{ k: "05-mensaje-gerencia", t: "El éxito y la sostenibilidad de nuestra Organización se fundamentan en la integridad de nuestras acciones. Este Código no es solo una declaración de principios: es el marco que orienta nuestras decisiones y establece estándares comunes de comportamiento. Su cumplimiento es obligatorio para todos: colaboradores, personal de dirección y confianza, proveedores, contratistas y cualquier tercero que actúe en nombre de la Organización. Te invitamos a conocerlo, aplicarlo y consultar ante cualquier duda. Las consultas y reportes de buena fe se tratarán con confidencialidad y sin represalias. Gracias por tu compromiso." }],
  render: function (s) {
    return head(s) + '<div class="split even" style="align-items:stretch"><div class="quote"><div class="qm">“</div><blockquote>El éxito y la sostenibilidad de nuestra Organización se fundamentan en la integridad de nuestras acciones.</blockquote><cite>— GERENCIA GENERAL</cite></div>' +
      '<div class="grid">' + blk("compass", "es el marco de conducta que orienta nuestras decisiones.", { title: "Más que una declaración de principios", g: 0, cue: "este código no es solo" }) +
      blk("users", "para colaboradores, personal de dirección y confianza, proveedores, contratistas y terceros que actúen por la Organización.", { title: "Es obligatorio", g: 0, cue: "su cumplimiento es obligatorio" }) +
      blk("help", "Las consultas y reportes de buena fe se tratan con confidencialidad y sin represalias.", { title: "Ante cualquier duda, consulta", g: 0, cue: "te invitamos" }) + "</div></div>";
  }
},

/* ---------- 6 · Alcance ---------- */
{ id: "06", menu: "intro", tema: "¿A quién aplica el Código?", kicker: "Introducción", title: "¿A quién aplica el Código?",
  narr: [{ k: "06-alcance", t: "El Código de Ética y Conducta establece pautas generales de comportamiento para todas las actividades de la Organización. Aplica a los colaboradores; al personal de dirección y confianza; a los locadores de servicios; a los proveedores; a los contratistas; y a toda persona que actúe en representación o interés de la Organización. Todos ellos deben actuar conforme a los principios del Código." }],
  render: function (s) {
    var a = [["users", "Colaboradores", "a los colaboradores"], ["tie", "Personal de dirección y confianza", "al personal de dirección"], ["idcard", "Locadores de servicios", "a los locadores"], ["truck", "Proveedores", "a los proveedores"], ["hardhat", "Contratistas", "a los contratistas"], ["handshake", "Toda persona que actúe en representación o interés de la Organización", "y a toda persona"]];
    return head(s, "El Código establece pautas generales de conducta ética para todas las actividades de la Organización y aplica a:") +
      '<div class="grid g3">' + a.map(function (x) { return blk(x[0], "", { title: x[1], g: 0, cue: x[2], cls: "center" }); }).join("") + "</div>" +
      note("ok", "check", "Todas estas personas deben actuar conforme a los principios establecidos en el Código.", { g: 0, cue: "todos ellos" });
  }
},

/* ---------- 7 · Principios (tarjetas con imagen y audio) ---------- */
principlesSlide({ id: "07", menu: "intro", tema: "Nuestros principios", kicker: "Introducción", title: "Nuestros principios",
  lead: "Selecciona cada principio y escucha su explicación completa.",
  narr: [{ k: "07-0-principios", t: "Nuestras actividades se rigen por cinco principios: integridad, respeto, cumplimiento normativo, confidencialidad y profesionalismo. Selecciona cada uno y escucha su explicación completa." }],
  items: [
    { k: "07-1-integridad", title: "Integridad", text: "Actuar con honestidad, rectitud y transparencia en todas las actividades y relaciones comerciales.", img: "principio-integridad.svg", t: "Integridad es actuar con honestidad, rectitud y transparencia en todas nuestras actividades y relaciones comerciales." },
    { k: "07-2-respeto", title: "Respeto", text: "Relacionarnos con respeto mutuo, dignidad, colaboración y trato adecuado, entre compañeros y con terceros.", img: "principio-respeto.svg", t: "Respeto es promover relaciones basadas en el respeto mutuo, la dignidad de las personas, la colaboración y el trato adecuado, entre compañeros y con terceros." },
    { k: "07-3-cumplimiento", title: "Cumplimiento normativo", text: "Actuar conforme a la legislación vigente y a las políticas, procedimientos y disposiciones internas.", img: "principio-cumplimiento.svg", t: "Cumplimiento normativo es actuar conforme a la ley y a las políticas, procedimientos y disposiciones internas de la Organización." },
    { k: "07-4-confidencialidad", title: "Confidencialidad", text: "Proteger la información confidencial, estratégica, comercial, financiera o personal a la que accedemos por nuestras funciones.", img: "principio-confidencialidad.svg", t: "Confidencialidad es proteger la información confidencial, estratégica, comercial, financiera o personal a la que accedemos por nuestras funciones." },
    { k: "07-5-profesionalismo", title: "Profesionalismo", text: "Mantener una conducta ética, responsable y adecuada en el ejercicio de nuestras funciones.", img: "principio-profesionalismo.svg", t: "Profesionalismo es mantener una conducta ética, responsable y adecuada en el ejercicio de nuestras funciones." }
  ] }),

/* ---------- 8 · Valores (lista + imagen y descripción) ---------- */
valuesSlide({ id: "08", menu: "intro", tema: "Nuestros valores", kicker: "Introducción", title: "Nuestros valores",
  lead: "Selecciona cada valor para conocerlo.",
  narr: [{ k: "08-0-valores", t: "Además de los principios, nos guían cinco valores: excelencia, compromiso, perseverancia, proactividad y trabajo en equipo. Selecciona cada uno para conocerlo." }],
  items: [
    { k: "08-1-excelencia", icon: "star", title: "Excelencia", img: "valor-excelencia.svg", text: "Trabajar con calidad, eficiencia y orientación a la mejora continua, buscando altos estándares de desempeño.", t: "Excelencia es trabajar con calidad, eficiencia y orientación a la mejora continua." },
    { k: "08-2-compromiso", icon: "heart", title: "Compromiso", img: "valor-compromiso.svg", text: "Asumir nuestras responsabilidades con dedicación y disposición para lograr los objetivos de la Organización.", t: "Compromiso es asumir nuestras responsabilidades con dedicación y disposición para lograr los objetivos de la Organización." },
    { k: "08-3-perseverancia", icon: "mountain", title: "Perseverancia", img: "valor-perseverancia.svg", text: "Mantener la constancia y el esfuerzo frente a las dificultades, buscando alternativas para alcanzar los objetivos.", t: "Perseverancia es mantener la constancia y el esfuerzo frente a las dificultades, buscando alternativas para alcanzar los objetivos." },
    { k: "08-4-proactividad", icon: "rocket", title: "Proactividad", img: "valor-proactividad.svg", text: "Actuar con iniciativa y anticipación, proponiendo soluciones y oportunidades de mejora.", t: "Proactividad es actuar con iniciativa y anticipación, proponiendo soluciones y oportunidades de mejora." },
    { k: "08-5-trabajo-equipo", icon: "puzzle", title: "Trabajo en equipo", img: "valor-trabajo-equipo.svg", text: "Colaborar de forma coordinada y respetuosa, compartiendo conocimientos y apoyándonos para lograr objetivos comunes.", t: "Trabajo en equipo es colaborar de forma coordinada y respetuosa, compartiendo conocimientos para lograr objetivos comunes." }
  ] })

);
