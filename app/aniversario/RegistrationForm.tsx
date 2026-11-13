"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

const MAX_RECEIPT_BYTES = 4 * 1024 * 1024;
const MAX_SOURCE_IMAGE_BYTES = 20 * 1024 * 1024;
const RESPONSE_KIND = "mictlan-anniversary-2026-result";
const POST_FRAME = "mictlan-anniversary-post-frame";
type State = "idle" | "sending" | "success" | "error";
type Reply = { kind: string; ok: boolean; id: string; alreadyRegistered?: boolean; message?: string };
type StatusReply = {
  kind: "mictlan-anniversary-2026-status";
  id: string;
  privateSaved: boolean;
  organizersSaved: boolean;
  receiptSaved?: boolean;
  error: boolean;
};
type StatusWindow = Window & { MictlanRegistryCallback?: (result: StatusReply) => void };

function createId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return "reg-" + Date.now() + "-" + Math.random().toString(36).slice(2, 14);
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const url = String(reader.result ?? "");
      const comma = url.indexOf(",");
      if (comma < 0) reject(new Error("No se pudo leer el comprobante."));
      else resolve(url.slice(comma + 1));
    };
    reader.onerror = () => reject(new Error("No se pudo leer el comprobante."));
    reader.readAsDataURL(file);
  });
}


/**
 * Preserve small JPG/PNG files unchanged. Convert large images and supported
 * HEIC/HEIF/WEBP receipts into a readable JPG under the Apps Script 4 MB limit.
 * PDF is not rasterized: PDF > 4 MB must be reduced by the sender.
 */
async function prepareReceipt(source: File): Promise<{file: File; mime: string}> {
  const ext = source.name.toLowerCase().split(".").pop() || "";
  const mime = source.type ||
    (ext === "pdf" ? "application/pdf" :
    ext === "png" ? "image/png" :
    ext === "jpg" || ext === "jpeg" ? "image/jpeg" :
    ext === "webp" ? "image/webp" :
    ext === "heic" ? "image/heic" :
    ext === "heif" ? "image/heif" : "");

  if (mime === "application/pdf") {
    if (source.size < 1 || source.size > MAX_RECEIPT_BYTES) {
      throw new Error("El PDF debe pesar 4 MB o menos. Comprímelo antes de adjuntarlo.");
    }
    return {file: source, mime};
  }

  if (!["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"].includes(mime)) {
    throw new Error("Adjunta un comprobante JPG, PNG, HEIC, WEBP o PDF.");
  }
  if (source.size < 1 || source.size > MAX_SOURCE_IMAGE_BYTES) {
    throw new Error("La fotografía pesa más de 20 MB. Usa una versión de menor tamaño.");
  }
  if ((mime === "image/jpeg" || mime === "image/png") && source.size <= MAX_RECEIPT_BYTES) {
    return {file: source, mime};
  }

  const url = URL.createObjectURL(source);
  let image: HTMLImageElement;
  try {
    image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("No se pudo convertir esta imagen. Guárdala como JPG o PNG e inténtalo de nuevo."));
      img.src = url;
    });
  } finally {
    URL.revokeObjectURL(url);
  }

  const baseWidth = image.naturalWidth || image.width;
  const baseHeight = image.naturalHeight || image.height;
  if (!baseWidth || !baseHeight) throw new Error("La imagen no tiene dimensiones válidas.");

  for (const maxSide of [2200, 1800, 1500, 1200]) {
    const ratio = Math.min(1, maxSide / Math.max(baseWidth, baseHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(baseWidth * ratio));
    canvas.height = Math.max(1, Math.round(baseHeight * ratio));
    const context = canvas.getContext("2d");
    if (!context) throw new Error("El dispositivo no pudo preparar la imagen.");
    context.fillStyle = "#fff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    for (const quality of [0.87, 0.77, 0.65]) {
      const compressed = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/jpeg", quality)
      );
      if (compressed && compressed.size <= MAX_RECEIPT_BYTES) {
        const cleanName = source.name.replace(/\.[^.]+$/, "").replace(/[^A-Za-z0-9_-]/g, "_").slice(0, 55) || "comprobante";
        return {
          file: new File([compressed], cleanName + ".jpg", {type: "image/jpeg"}),
          mime: "image/jpeg"
        };
      }
    }
  }
  throw new Error("No fue posible reducir la fotografía a menos de 4 MB.");
}

export default function RegistrationForm({ iframeUrl }: { iframeUrl: string }) {
  const configured = /^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec(?:\?.*)?$/.test(iframeUrl);
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<"si" | "no">("si");
  const [guests, setGuests] = useState("0");
  const [meat, setMeat] = useState("");
  const [utensils, setUtensils] = useState("");
  const [receipt, setReceipt] = useState<File | null>(null);
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");
  const [folio, setFolio] = useState("");
  const transportForm = useRef<HTMLFormElement>(null);
  const transportValue = useRef<HTMLInputElement>(null);
  const transportFrame = useRef<HTMLIFrameElement>(null);
  const idRef = useRef("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onReply = (event: MessageEvent) => {
      const data = event.data as Reply | null;
      if (!data || typeof data !== "object" || data.kind !== RESPONSE_KIND ||
        !idRef.current || data.id !== idRef.current || typeof data.ok !== "boolean") return;

      // Google Apps Script serves HTML responses through googleusercontent.com.
      const origin = event.origin.toLowerCase();
      const trustedOrigin = origin === "https://script.google.com" ||
        /^https:\/\/(?:[\w-]+\.)*googleusercontent\.com$/.test(origin);
      const sandboxedFrame = origin === "null" && event.source === transportFrame.current?.contentWindow;
      if (!trustedOrigin && !sandboxedFrame) return;

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = null;
      if (data.ok) {
        setFolio(data.id);
        setMessage(data.alreadyRegistered
          ? "Este folio ya se había recibido. No se creó un registro duplicado."
          : "Tu registro se recibió correctamente y el Ecónomo revisará el comprobante.");
        setState("success");
      } else {
        setMessage(data.message || "No fue posible registrar los datos. Intenta nuevamente.");
        setState("error");
      }
    };
    window.addEventListener("message", onReply);
    return () => {
      window.removeEventListener("message", onReply);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending" || state === "success") return;
    setMessage("");
    if (!configured) {
      setState("error"); setMessage("El registro no está configurado."); return;
    }
    if (name.trim().length < 5) {
      setState("error"); setMessage("Escribe tu nombre completo."); return;
    }
    const guestCount = attendance === "si" ? Number(guests) : 0;
    if (attendance === "si" && (!Number.isInteger(guestCount) || guestCount < 0 || guestCount > 30)) {
      setState("error"); setMessage("Indica entre 0 y 30 invitados."); return;
    }
    if (attendance === "si" && !meat.trim()) {
      setState("error"); setMessage("Indica el corte de carne."); return;
    }
    if (!receipt || receipt.size < 1 || receipt.size > MAX_RECEIPT_BYTES) {
      setState("error"); setMessage("Adjunta un comprobante de hasta 4 MB."); return;
    }
    const ext = receipt.name.toLowerCase().split(".").pop();
    const mime = receipt.type || (
      ext === "pdf" ? "application/pdf" :
      ext === "png" ? "image/png" :
      ext === "jpg" || ext === "jpeg" ? "image/jpeg" : ""
    );
    if (!["image/jpeg", "image/png", "application/pdf"].includes(mime)) {
      setState("error"); setMessage("Solo se permiten archivos PDF, JPG y PNG."); return;
    }
    setState("sending");
    try {
      // A stable ID prevents duplicates if the response gets lost and the user retries.
      if (!idRef.current) idRef.current = createId();
      const payload = JSON.stringify({
        id: idRef.current,
        name: name.trim(), attendance, guests: guestCount,
        meat: attendance === "si" ? meat.trim() : "",
        utensils: attendance === "si" ? utensils.trim() : "",
        website: "",
        receipt: { name: receipt.name, mime, base64: await fileToBase64(receipt) }
      });
      if (!transportForm.current || !transportValue.current) throw new Error("No está disponible el envío.");
      transportValue.current.value = payload;
      // Browser form POST: no CORS preflight. Its response stays in a hidden iframe.
      transportForm.current.submit();
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setState("error");
        setMessage("No recibimos confirmación. Antes de reenviar, consulta con el Ecónomo si llegó el registro para evitar duplicados.");
      }, 60000);
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "No se pudo enviar el comprobante.");
    }
  }

  if (!configured) return (
    <div className="ann-form-shell" role="status">
      <p>El registro no está disponible. Contacta al responsable del evento.</p>
    </div>
  );

  return (
    <div className="ann-form-shell ann-native-shell">
      {state === "success" ? (
        <div className="ann-native-success" role="status">
          <div className="ann-native-success-mark" aria-hidden="true">✓</div>
          <h3>Registro recibido</h3>
          <p>{message}</p>
          <p className="ann-native-folio">Folio: <strong>{folio}</strong></p>
          <p>El pago queda «Pendiente» hasta que lo valide el Ecónomo.</p>
        </div>
      ) : (
        <form className="ann-native-form" onSubmit={onSubmit}>
          <p className="ann-native-overline">Registro oficial · V Aniversario</p>
          <h3>Datos de participación</h3>

          <label htmlFor="ann-name">Nombre completo del hermano <span>*</span></label>
          <input id="ann-name" type="text" autoComplete="name" placeholder="Nombre y apellidos" minLength={5} maxLength={140} value={name} onChange={(e) => setName(e.target.value)} required disabled={state === "sending"}/>

          <label htmlFor="ann-attendance">¿Asistirás al aniversario? <span>*</span></label>
          <select id="ann-attendance" value={attendance} onChange={(e) => setAttendance(e.target.value as "si" | "no")} required disabled={state === "sending"}>
            <option value="si">Sí asistiré</option>
            <option value="no">No asistiré</option>
          </select>

          {attendance === "si" && (
            <div className="ann-native-conditional">
              <label htmlFor="ann-guests">Número de invitados (sin incluirte) <span>*</span></label>
              <input id="ann-guests" type="number" min={0} max={30} step={1} value={guests} onChange={(e) => setGuests(e.target.value)} required disabled={state === "sending"}/>
              <p className="ann-native-counter">Total de asistentes: <strong>{1 + (Number(guests) || 0)}</strong></p>

              <label htmlFor="ann-meat">Corte de carne que llevarás <span>*</span></label>
              <input id="ann-meat" type="text" placeholder="Ej. 2 kg de arrachera" maxLength={240} value={meat} onChange={(e) => setMeat(e.target.value)} required disabled={state === "sending"}/>

              <label htmlFor="ann-utensils">Utensilios que aportarás <small>(opcional)</small></label>
              <textarea id="ann-utensils" rows={3} maxLength={300} placeholder="Ej. platos y servilletas" value={utensils} onChange={(e) => setUtensils(e.target.value)} disabled={state === "sending"} />
            </div>
          )}

          <div className="ann-native-fee">
            <strong>Cuota obligatoria: $300 MXN por hermano</strong>
            <p>El pago y el comprobante son obligatorios asistas o no. Los invitados no tienen costo adicional.</p>
            <p>Las bebidas son por cuenta de cada persona.</p>
          </div>

          <label htmlFor="ann-receipt">Comprobante de pago <span>*</span></label>
          <input id="ann-receipt" type="file" accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf" onChange={(e) => setReceipt(e.target.files?.[0] || null)} required disabled={state === "sending"} />
          <p className="ann-native-hint">JPG, PNG o PDF · Máximo 4 MB. El archivo se guarda de forma privada.</p>

          {state === "error" && <p className="ann-native-error" role="alert">{message}</p>}
          <button className="ann-native-submit" type="submit" disabled={state === "sending"}>
            {state === "sending" ? "Enviando registro…" : "Confirmar y enviar registro"}
          </button>
          <p className="ann-native-hint ann-native-note">No cierres esta página hasta ver tu folio de confirmación.</p>
        </form>
      )}
      <iframe name={POST_FRAME} ref={transportFrame} className="ann-native-transport" title="Envío interno del registro" tabIndex={-1} aria-hidden="true"/>
      <form ref={transportForm} action={iframeUrl} target={POST_FRAME} method="post" encType="application/x-www-form-urlencoded" className="ann-native-transport" aria-hidden="true">
        <input ref={transportValue} type="hidden" name="payload" />
      </form>
    </div>
  );
}
