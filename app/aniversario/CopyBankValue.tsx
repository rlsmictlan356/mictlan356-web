"use client";

import { useState } from "react";

export default function CopyBankValue({ value, label }: { value: string; label: string }) {
  const [notice, setNotice] = useState("");

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setNotice("Copiado");
    } catch {
      setNotice("Selecciona el dato para copiarlo");
    }
  }

  return (
    <span className="ann-copy-control">
      <button type="button" onClick={copy} aria-label={"Copiar " + label}>
        Copiar
      </button>
      {notice && <span className="ann-copy-feedback" role="status">{notice}</span>}
    </span>
  );
}
