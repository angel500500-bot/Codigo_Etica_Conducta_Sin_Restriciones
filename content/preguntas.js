"use strict";
/* ============================================================
   BANCO DE PREGUNTAS DE LA EVALUACIÓN (del PPT, diapositivas 33-35)
   q = pregunta · o = alternativas (a, b, c, d) · c = índice correcto (0 = a)
   El curso las muestra en orden aleatorio y con alternativas mezcladas.
   ============================================================ */
var QUESTIONS = [
  { q: "¿A quiénes aplica el Código de Ética y Conducta?", o: ["Solo a los colaboradores en planilla.", "Solo al personal de dirección y confianza.", "A colaboradores, personal de dirección y confianza, locadores, proveedores, contratistas y a quien actúe en representación o interés de la Organización.", "Solo a proveedores y contratistas."], c: 2 },
  { q: "¿Qué principio implica actuar con honestidad, rectitud y transparencia?", o: ["Integridad.", "Profesionalismo.", "Confidencialidad.", "Respeto."], c: 0 },
  { q: "Ante un posible conflicto de intereses, ¿qué debes hacer?", o: ["Resolverlo por tu cuenta sin informar.", "Comunicarlo oportunamente a la Gerencia y abstenerte de participar en la decisión.", "Informarlo solo si el conflicto llega a concretarse.", "Consultarlo con el proveedor involucrado."], c: 1 },
  { q: "¿Cuál de estas situaciones configura un conflicto de intereses según el Código?", o: ["Participar en una capacitación interna.", "Solicitar vacaciones.", "Proponer una mejora en un proceso.", "Usar bienes de la Organización para beneficio personal."], c: 3 },
  { q: "Sobre la información confidencial, es correcto afirmar que:", o: ["Puede compartirse con familiares si no se publica.", "La obligación termina al finalizar la relación laboral.", "La obligación de confidencialidad continúa incluso después de terminar la relación laboral o contractual.", "Solo comprende la información financiera."], c: 2 },
  { q: "¿Cuál de las siguientes conductas está prohibida en materia de integridad financiera y contable?", o: ["Registrar operaciones inexistentes o inexactas.", "Archivar los comprobantes de pago.", "Solicitar la aprobación de un gasto.", "Revisar un reporte antes de enviarlo."], c: 0 },
  { q: "Un proveedor te ofrece un regalo costoso mientras evalúas su propuesta. ¿Qué establece el Código?", o: ["Puedes aceptarlo si lo informas después.", "Puedes aceptarlo si es por fin de año.", "No debes aceptar regalos que puedan influir indebidamente en una decisión comercial.", "Puedes aceptarlo si lo compartes con tu equipo."], c: 2 },
  { q: "¿Quién puede pronunciarse en nombre de la Organización ante medios de comunicación u otros terceros?", o: ["Cualquier colaborador que conozca el tema.", "Cualquier jefe de área.", "Cualquier persona, desde sus redes sociales personales.", "Solo las personas expresamente autorizadas, a través de los canales autorizados."], c: 3 },
  { q: "Si tienes una duda razonable sobre un posible incumplimiento del Código, ¿qué corresponde hacer?", o: ["Esperar a tener certeza antes de informar.", "Comunicarlo por los canales internos, aun sin certeza previa.", "Comentarlo con tus compañeros.", "No hacer nada si no te afecta directamente."], c: 1 },
  { q: "¿Qué garantiza la Organización a quien reporta de buena fe un posible incumplimiento?", o: ["Que será sancionado si el hecho no se confirma.", "Que su nombre se hará público.", "Que no se adoptarán represalias en su contra.", "Que deberá presentar pruebas documentales."], c: 2 }
];
