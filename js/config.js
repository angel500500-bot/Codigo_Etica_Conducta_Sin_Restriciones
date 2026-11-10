"use strict";
/* ============================================================
   CONFIGURACIÓN GENERAL DEL CURSO
   Este es el único archivo que normalmente se edita para ajustar
   el comportamiento general (restricciones, nota, enlaces).
   ============================================================ */

/* RESTRICT = true  → versión CON restricciones (navegación secuencial,
 *                     audio completo obligatorio).
 * RESTRICT = false → versión SIN restricciones (revisión libre).
 * El script de empaquetado (tools/build.py) cambia este valor. */
var RESTRICT = false;

var COURSE = {
  titulo: "Código de Ética y Conducta",
  /* Documento oficial del Código, publicado en Documentos de Chamilo.
   * url: pega aquí el enlace del archivo copiado desde Chamilo
   *      (Documentos → clic derecho sobre el PDF → Copiar enlace).
   *      Si se deja vacío, el botón abre la herramienta Documentos
   *      del mismo curso, detectada automáticamente desde Chamilo. */
  documento: { nombre: "Código de Ética y Conducta", url: "" },
  consultas: "Gestión Humana"
};

/* Evaluación: 10 preguntas · 2 puntos c/u · nota mínima 14/20 · 3 intentos */
var PASS_SCORE = 14, MAX_ATTEMPTS = 3, PTS = 2, MAX_SCORE = 20;

/* Carpeta donde se colocan los audios grabados (nombre = clave + .mp3).
 * Si un audio no existe, se usa la voz del sistema con el mismo guion. */
var AUDIO_DIR = "assets/audio/";

/* Colores por sección del menú */
var TH = {
  inicio: { c: "#4B5C78", s: "#EEF2F8" },
  intro:  { c: "#008FD7", s: "#EAF3FB" },
  codigo: { c: "#033985", s: "#E8EEF8" },
  cierre: { c: "#0F7C8C", s: "#E3F3F5" },
  eval:   { c: "#5A3E96", s: "#EFEAF7" }
};

/* Secciones del menú superior y de la tabla de contenido */
var MENU = [
  { key: "inicio", full: "Inicio", abbr: "Inicio" },
  { key: "intro",  full: "Introducción", abbr: "Intro" },
  { key: "codigo", full: "Código de Ética y Conducta", abbr: "Código" },
  { key: "cierre", full: "Cierre", abbr: "Cierre" },
  { key: "eval",   full: "Evaluación", abbr: "Evaluación" }
];

/* Lista de pantallas: la llenan los archivos de content/ en orden. */
var SLIDES = [];
