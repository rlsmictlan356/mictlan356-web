/**
 * V Aniversario · R∴L∴S∴ Mictlán No. 356
 * Backend de Google Apps Script (publicación "Ejecutar como yo", acceso "Cualquier persona").
 *
 * Archivo 1/2. En Apps Script crear Code.gs y pegar este contenido.
 * Archivo 2/2. Crear archivo HTML con nombre Form y pegar Form.html.
 *
 * IMPORTANTE: ejecuta setup_ una vez desde el editor de Apps Script para autorizar
 * Google Drive y Google Sheets antes de publicar.
 */

const PRIVATE_SPREADSHEET_ID = "17V-8XC8j_FokFh2pZxICzXLsjtd6kqvU7ps-eh25gSQ";
const ORGANIZERS_SPREADSHEET_ID = "1RRg6sFUMruQCoNh3A1Mhj2-UWZjWJIRfwNprbrV4pfQ";
const PRIVATE_SHEET_NAME = "Registros privados";
const ORGANIZERS_SHEET_NAME = "Asistencia";
const MAX_FILE_BYTES = 4 * 1024 * 1024;
const RECEIPTS_FOLDER_ID = "1YEZtW0_ohFHX8FqHFnPeC2mAJDsktF1v";
const LOCK_WAIT_MS = 20000;

/** Solo se ejecuta manualmente en el editor. Su nombre acabado en _ impide llamadas desde google.script.run. */
function setup_() {
  SpreadsheetApp.openById(PRIVATE_SPREADSHEET_ID).getSheetByName(PRIVATE_SHEET_NAME);
  SpreadsheetApp.openById(ORGANIZERS_SPREADSHEET_ID).getSheetByName(ORGANIZERS_SHEET_NAME);
  getReceiptsFolder_();
  return "Preparación completada. Acceso a Sheets y carpeta de comprobantes autorizado.";
}

function doGet() {
  return HtmlService.createHtmlOutputFromFile("Form")
    .setTitle("Registro · V Aniversario de Mictlán")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function submitRegistration(payload) {
  // No usar información del cliente como estado de pago ni como URL de archivos.
  if (!payload || typeof payload !== "object") throw new Error("Registro no válido.");
  if (payload.website) throw new Error("Registro rechazado."); // honeypot
  const id = clean_(payload.id, 90);
  const name = clean_(payload.name, 140);
  const attendance = payload.attendance === "si" ? "Sí" : payload.attendance === "no" ? "No" : "";
  if (!/^[A-Za-z0-9-]{16,90}$/.test(id)) throw new Error("Identificador no válido. Recarga el formulario.");
  if (name.length < 5) throw new Error("Escribe tu nombre completo.");
  if (!attendance) throw new Error("Selecciona si asistirás.");

  const guests = attendance === "Sí" ? Number(payload.guests) : 0;
  if (!Number.isSafeInteger(guests) || guests < 0 || guests > 30) throw new Error("El número de invitados debe estar entre 0 y 30.");
  const meat = attendance === "Sí" ? clean_(payload.meat, 240) : "";
  if (attendance === "Sí" && !meat) throw new Error("Indica el corte de carne que llevarás.");
  const utensils = attendance === "Sí" ? clean_(payload.utensils, 300) : "";
  const total = attendance === "Sí" ? guests + 1 : 0;

  const file = payload.receipt;
  if (!file || typeof file !== "object") throw new Error("Adjunta tu comprobante de pago.");
  const mime = String(file.mime || "");
  const filename = clean_(file.name, 150) || "comprobante";
  const base64 = String(file.base64 || "");
  if (!["application/pdf", "image/jpeg", "image/png"].includes(mime)) throw new Error("Solo se admiten archivos JPG, PNG o PDF.");
  if (!base64 || base64.length > Math.ceil(MAX_FILE_BYTES * 4 / 3) + 1000) throw new Error("El archivo supera 4 MB.");
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(base64)) throw new Error("Archivo no válido.");
  const bytes = Utilities.base64Decode(base64);
  if (bytes.length === 0 || bytes.length > MAX_FILE_BYTES || !validSignature_(bytes, mime)) {
    throw new Error("El archivo no coincide con su formato o supera 4 MB.");
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(LOCK_WAIT_MS);
  try {
    const privateSheet = SpreadsheetApp.openById(PRIVATE_SPREADSHEET_ID).getSheetByName(PRIVATE_SHEET_NAME);
    const organizersSheet = SpreadsheetApp.openById(ORGANIZERS_SPREADSHEET_ID).getSheetByName(ORGANIZERS_SHEET_NAME);
    if (!privateSheet || !organizersSheet) throw new Error("Las hojas de registro no están configuradas.");

    // Evita registros duplicados si el navegador reintenta tras una respuesta lenta.
    const existing = privateSheet.getRange("A2:A").createTextFinder(id).matchEntireCell(true).findNext();
    if (existing) return { ok: true, id, alreadyRegistered: true };

    const folder = getReceiptsFolder_();
    const ext = mime === "application/pdf" ? ".pdf" : mime === "image/png" ? ".png" : ".jpg";
    const safeName = filename.replace(/[^A-Za-z0-9_.-]/g, "_").slice(0,70);
    const blob = Utilities.newBlob(bytes, mime, id + "_" + safeName.replace(/\.(pdf|png|jpe?g)$/i, "") + ext);
    const driveFile = folder.createFile(blob);
    driveFile.setDescription("V Aniversario Mictlán · Registro: " + id + " · Hermano: " + name);

    const timestamp = new Date();
    // Cabeceras creadas en Google Sheets: 13 campos privados y 8 de organizadores.
    privateSheet.appendRow([
      id, timestamp, sheetSafe_(name), attendance, guests, total, sheetSafe_(meat),
      sheetSafe_(utensils), 300, driveFile.getUrl(), "Pendiente", "", ""
    ]);
    organizersSheet.appendRow([
      id, timestamp, sheetSafe_(name), attendance, guests, total, sheetSafe_(meat), sheetSafe_(utensils)
    ]);

    return { ok: true, id, alreadyRegistered: false };
  } finally {
    lock.releaseLock();
  }
}

function getReceiptsFolder_() {
  return DriveApp.getFolderById(RECEIPTS_FOLDER_ID);
}

function clean_(value, limit) {
  return String(value == null ? "" : value).trim().replace(/[\u0000-\u001F\u007F]/g, " ").slice(0, limit);
}

function sheetSafe_(value) {
  // Evita inyección de fórmulas en entradas de texto a Sheets.
  const v = String(value == null ? "" : value);
  return /^[=+\-@\t\r]/.test(v) ? "'" + v : v;
}

function validSignature_(bytes, mime) {
  const x = (i) => (bytes[i] & 255);
  if (mime === "application/pdf") return bytes.length > 5 && x(0)===37 && x(1)===80 && x(2)===68 && x(3)===70 && x(4)===45;
  if (mime === "image/png") return bytes.length > 8 && [137,80,78,71,13,10,26,10].every((b,i)=>x(i)===b);
  if (mime === "image/jpeg") return bytes.length > 3 && x(0)===255 && x(1)===216 && x(2)===255;
  return false;
}


/**
 * Endpoint para el formulario NATIVO de /aniversario.
 * Compatible con <form method="POST" target="iframe_oculto"> desde Firebase.
 * No necesita CORS ni abrir una pestaña externa.
 *
 * IMPORTANTE: tras actualizar Code.gs en Google Apps Script:
 * Implementar > Gestionar implementaciones > Editar > Nueva versión > Implementar.
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
