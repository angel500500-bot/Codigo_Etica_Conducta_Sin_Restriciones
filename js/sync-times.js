"use strict";
/* ============================================================
   MARCAS DE TIEMPO PARA AUDIOS GRABADOS (MP3)
   ------------------------------------------------------------
   Con la voz del sistema, cada bloque se sincroniza con la frase
   exacta que se está pronunciando (no requiere configuración).

   Cuando se coloque un MP3 grabado, indica aquí el segundo en el
   que empieza a narrarse cada bloque, en el mismo orden en que
   aparecen en pantalla. Ejemplo:

     "10-responsabilidades": [0, 4.2, 9.8, 15.1, 20.6, 26.0, 31.4, 36.2, 41.0],

   Si un audio no tiene marcas, se calcula la posición de cada
   bloque según el lugar de su frase dentro del guion.
   ============================================================ */
var SYNC_TIMES = {
};
