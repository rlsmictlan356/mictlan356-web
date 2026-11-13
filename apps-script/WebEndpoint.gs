/**
 * Añade este archivo como NUEVO archivo de secuencia de comandos en el
 * proyecto de Google Apps Script EXISTENTE: WebEndpoint.gs.
 * Conserva intacto tu Código.gs funcional.
 * No copies otra doPost si ya existe una en tu proyecto.
 * Tras guardar, implementa una NUEVA VERSIÓN de la misma aplicación web.
 */

function doPost(e) {
  var id = "";
  var response = {
    kind: "mictlan-anniversary-2026-result",
    ok: false,
    id: "",
    message: ""
  };

  try {
    var raw = e && e.parameter && e.parameter.payload;
    if (!raw || raw.length > 6 * 1024 * 1024) {
      throw new Error("No se recibió un registro válido o el archivo es demasiado grande.");
    }
    var payload = JSON.parse(raw);
    id = clean_(payload.id, 90);
    var result = submitRegistration(payload);
    response.ok = Boolean(result && result.ok);
    response.id = String(result.id || id);
    response.alreadyRegistered = Boolean(result.alreadyRegistered);
    response.message = response.ok
      ? "Tu registro se recibió correctamente."
      : "No se pudo guardar el registro.";
  } catch (error) {
    response.ok = false;
    response.id = id;
    response.message = error && error.message
      ? String(error.message).slice(0, 240)
      : "Hubo un problema al enviar el registro.";
    console.error("doPost registration failure: " + String(error));
  }

  // Escape "<" to prevent accidental closing of the script tag.
  var safeResult = JSON.stringify(response).replace(/</g, "\\u003c");
  var html = '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>' +
    '<script>window.top.postMessage(' + safeResult +
    ', "https://rls-mictlan356.web.app");</script>' +
    '</body></html>';

  return HtmlService.createHtmlOutput(html)
    .setTitle("Confirmación del registro Mictlán")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
