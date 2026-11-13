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
    '<script>(function(){var d=' + safeResult +
    ';try{window.parent.postMessage(d,"https://rls-mictlan356.web.app");}catch(e){}' +
    'try{window.top.postMessage(d,"https://rls-mictlan356.web.app");}catch(e){}' +
    '})();</script></body></html>';

  return HtmlService.createHtmlOutput(html)
    .setTitle("Confirmación del registro Mictlán")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}


/**
 * Acuse verificable para formularios externos sin leer HTML de un iframe.
 * Se publica como ?status=1&id=<uuid>&callback=MictlanRegistryCallback
 * Devuelve únicamente la presencia del UUID en ambas hojas, sin nombres,
 * correos, recibos, datos bancarios ni enlaces privados.
 *
 * ContentService responde como JavaScript para ser cargado con <script src>
 * desde Firebase, evitando problemas de CORS y de postMessage de iframes.
 */
function registrationStatusResponse_(params) {
  var callback = params && params.callback;
  if (callback !== "MictlanRegistryCallback") {
    return ContentService.createTextOutput("/* Callback no autorizado */")
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  var id = clean_(params.id, 90);
  var result = {
    kind: "mictlan-anniversary-2026-status",
    id: id,
    privateSaved: false,
    organizersSaved: false,
    error: false
  };
  try {
    if (!/^[A-Za-z0-9-]{16,90}$/.test(id)) throw new Error("Identificador no válido.");
    var privateSheet = SpreadsheetApp.openById(PRIVATE_SPREADSHEET_ID).getSheetByName(PRIVATE_SHEET_NAME);
    var organizersSheet = SpreadsheetApp.openById(ORGANIZERS_SPREADSHEET_ID).getSheetByName(ORGANIZERS_SHEET_NAME);
    if (!privateSheet || !organizersSheet) throw new Error("Hojas no disponibles.");
    result.privateSaved = Boolean(privateSheet.getRange("A2:A").createTextFinder(id).matchEntireCell(true).findNext());
    result.organizersSaved = Boolean(organizersSheet.getRange("A2:A").createTextFinder(id).matchEntireCell(true).findNext());
  } catch (err) {
    result.error = true;
    console.error("registrationStatusResponse_ failed: " + String(err));
  }

  return ContentService.createTextOutput(
    "MictlanRegistryCallback(" + JSON.stringify(result).replace(/</g, "\\u003c") + ");"
  ).setMimeType(ContentService.MimeType.JAVASCRIPT);
}
