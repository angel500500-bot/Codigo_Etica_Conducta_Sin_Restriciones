"use strict";
/* ============================================================
   COMUNICACIÓN CON EL LMS (SCORM 1.2)
   Busca la API del LMS (Chamilo) en las ventanas superiores y
   expone funciones simples. Si no hay LMS (prueba local), el curso
   funciona igual y los datos se guardan solo en memoria.
   ============================================================ */
var SCORM = (function () {
  var api = null, on = false, t0 = Date.now(), cache = {}, finished = false;

  /** Recorre las ventanas superiores buscando window.API. */
  function find(w) {
    var n = 0;
    try {
      while (w && !w.API && w.parent && w.parent !== w && n < 12) { n++; w = w.parent; }
      return w && w.API ? w.API : null;
    } catch (e) { return null; }
  }
  function get(k) {
    if (!on) return cache[k] || "";
    try { return String(api.LMSGetValue(k) || ""); } catch (e) { return ""; }
  }
  function set(k, v) {
    cache[k] = String(v);
    if (!on) return false;
    try { var r = api.LMSSetValue(k, String(v)); return r === true || r === "true"; } catch (e) { return false; }
  }
  function commit() { if (on) try { api.LMSCommit(""); } catch (e) {} }
  /** Formato de tiempo SCORM 1.2: HHHH:MM:SS */
  function hms(ms) {
    var s = Math.max(0, Math.round(ms / 1000)), h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60); s = s % 60;
    return ("000" + h).slice(-4) + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
  }

  return {
    /** Inicia la sesión con el LMS y marca el curso como "incompleto" la primera vez. */
    init: function () {
      api = find(window) || (window.opener ? find(window.opener) : null);
      if (api) {
        try { var r = api.LMSInitialize(""); on = r === true || r === "true"; } catch (e) { on = false; }
        if (!on) { try { on = String(api.LMSGetLastError()) === "101"; } catch (e) {} }
      }
      if (on) {
        var st = get("cmi.core.lesson_status");
        if (!st || st === "not attempted" || st === "unknown") set("cmi.core.lesson_status", "incomplete");
        set("cmi.core.score.min", "0"); set("cmi.core.score.max", "100");
        commit();
      }
      return on;
    },
    active: function () { return on; },
    get: get, set: set, commit: commit,
    /** Nombre del participante. SCORM 1.2 lo entrega como "Apellidos, Nombres". */
    name: function () {
      var n = get("cmi.core.student_name"); if (!n) return "";
      var p = n.split(","); return p.length > 1 ? (p[1].trim() + " " + p[0].trim()) : n.trim();
    },
    /** Cierra la sesión registrando el tiempo empleado. */
    finish: function () {
      if (finished) return; finished = true;
      set("cmi.core.session_time", hms(Date.now() - t0)); commit();
      if (on) try { api.LMSFinish(""); } catch (e) {}
    }
  };
})();
