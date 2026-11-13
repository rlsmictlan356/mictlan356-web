"use client";

import { useState } from "react";

export default function RegistrationForm({ iframeUrl }: { iframeUrl: string }) {
  const [attending, setAttending] = useState("si");
  const [guests, setGuests] = useState(0);
  const [name, setName] = useState("");

  // The real Apps Script form is embedded only when its deployment URL is configured.
  if (/^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec(?:\?.*)?$/.test(iframeUrl)) {
    return (
      <div className="ann-form-shell">
        <iframe
          title="Formulario de registro del V Aniversario y carga de comprobante"
          src={iframeUrl}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
        <p className="ann-form-calc">
          ¿No aparece el formulario?{" "}
          <a href={iframeUrl} target="_blank" rel="noopener noreferrer">
            Abrir registro en una pestaña nueva
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="ann-form-shell">
      <form className="ann-form-preview" onSubmit={(event) => event.preventDefault()}>
        <p className="ann-preview-note">
          <strong>Vista previa.</strong> El registro y la carga de archivos se
          activarán al desplegar Google Apps Script. Este formulario no envía información.
        </p>
        <label>
          Nombre completo del hermano
          <input type="text" placeholder="Nombre y apellidos" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          ¿Asistirás al aniversario?
          <select value={attending} onChange={(e) => { setAttending(e.target.value); setGuests(0); }}>
            <option value="si">Sí asistiré</option>
            <option value="no">No asistiré</option>
          </select>
        </label>
        {attending === "si" && (
          <>
            <label>
              Número de invitados (sin incluirte)
              <input type="number" min={0} max={30} value={guests} onChange={(e) => setGuests(Math.max(0, Number(e.target.value) || 0))} />
            </label>
            <p className="ann-form-calc">Total de asistentes: {1 + guests}</p>
            <label>
              Corte de carne que llevarás
              <input type="text" placeholder="Ej. 2 kg de arrachera" />
            </label>
            <label>
              Utensilios que aportarás (opcional)
              <textarea placeholder="Ej. platos y servilletas" />
            </label>
          </>
        )}
        <div className="ann-preview-note">
          Cuota obligatoria: <strong>$300 MXN por hermano</strong>, asista o no.
          Cada asistente lleva sus propias bebidas.
        </div>
        <label>
          Comprobante de pago (JPG, PNG o PDF, máximo 4 MB)
          <input type="file" accept="image/jpeg,image/png,application/pdf" />
        </label>
        <button type="submit" disabled>Confirmar y enviar registro</button>
      </form>
    </div>
  );
}
