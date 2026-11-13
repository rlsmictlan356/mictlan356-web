import type { Metadata } from "next";
import "./ceremonia.css";

export const metadata: Metadata = {
  title: "Confirmación de asistencia | Reconocimiento Conyugal Masónico",
  description: "Ceremonia en honor a Mario Juárez Alanís y Wendy Rolon Espinoza. Sábado 14 de noviembre de 2026, 14:00 h, Mina 138, CDMX.",
  robots: { index: false, follow: false },
};

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSd-flVDYA8kU5EBNBl0DbD1aDm19ZkTDVcsMt5JQa8TdXj8Eg/viewform?embedded=true";
const FORM_EXTERNAL =
  "https://docs.google.com/forms/d/e/1FAIpQLSd-flVDYA8kU5EBNBl0DbD1aDm19ZkTDVcsMt5JQa8TdXj8Eg/viewform";
const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=Gran%20Logia%20Alma%20de%20Anahuac%2C%20Mina%20138%2C%20CDMX&query_place_id=ChIJE7SWZtb40YURG4FclqI0NvU";

export default function Home() {
  return (
    <main className="blanco-page">
      <div className="blanco-outer-frame" aria-hidden="true" />
      <div className="blanco-inner">
        <header className="blanco-hero" aria-label="Reconocimiento conyugal">
          <div className="blanco-crest-row">
            <div className="blanco-crest">
              <img
                src="/images/mictlan-356-emblema.webp"
                alt="Emblema oficial de Mictlán No. 356"
                width={1254}
                height={1254}
              />
              <span>Mictlán No. 356</span>
            </div>
            <div className="blanco-union" aria-hidden="true">
              <span className="blanco-union-rule" />
              <span className="blanco-union-symbol">✧</span>
              <span className="blanco-union-rule" />
            </div>
            <div className="blanco-crest">
              <img
                src="/images/duat-no7-emblema.svg"
                alt="Emblema de Duat No. 7 aportado para el prototipo"
                width={240}
                height={240}
              />
              <span>Duat No. 7</span>
            </div>
          </div>

          <p className="blanco-eyebrow">C∴ Rec∴ Cony∴</p>
          <h1>Reconocimiento<br /><em>Conyugal Masónico</em></h1>
          <p className="blanco-names">
            Mario Juárez Alanís <span aria-label="y">&amp;</span> Wendy Rolon Espinoza
          </p>
          <div className="blanco-filigree" aria-hidden="true"><span />✧<span /></div>
          <p className="blanco-when">
            <strong>Sábado 14 de noviembre de 2026</strong>
            <span>14:00 horas</span>
          </p>
          <p className="blanco-place">
            <strong>Templo Alma de Anáhuac</strong>
            <span>Calle Mina 138, Col. Guerrero, Cuauhtémoc, CDMX</span>
          </p>
          <a className="blanco-map" href={MAP_URL} target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            Ver ubicación exacta en Maps
          </a>
        </header>

        <section className="blanco-rsvp" aria-labelledby="blanco-form-title">
          <h2 id="blanco-form-title">Confirma tu asistencia</h2>
          <p className="blanco-instruction">Completa los datos a continuación.</p>
          <div className="blanco-alert">
            <strong>Importante</strong>
            <span>Cada asistente deberá llevar sus propias bebidas para consumo personal.</span>
          </div>

          <div className="blanco-iframe-shell">
            <iframe
              title="Formulario oficial de confirmación de asistencia"
              src={FORM_URL}
              loading="eager"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <a className="blanco-form-fallback" href={FORM_EXTERNAL} target="_blank" rel="noopener noreferrer">
            ¿No se ve el formulario? Abrirlo aquí.
          </a>
        </section>

        <footer className="blanco-footer">
          <span className="blanco-footer-flower" aria-hidden="true">✧</span>
          <p>Mictlán No. 356 · Duat No. 7</p>
          <small>Unión · Armonía · Fraternidad</small>
        </footer>
      </div>
    </main>
  );
}
