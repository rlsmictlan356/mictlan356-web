import type { Metadata } from "next";
import "./asistencia.css";

export const metadata: Metadata = {
  title: "Reconocimiento Conyugal Masónico | Confirmación de asistencia",
  description:
    "Confirmación de asistencia al Reconocimiento Conyugal Masónico de Mario Juárez Alanís y Wendy Rolon Espinoza. 14 de noviembre de 2026 a las 14:00 h.",
  robots: { index: false, follow: false },
};

const GOOGLE_FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLSd-flVDYA8kU5EBNBl0DbD1aDm19ZkTDVcsMt5JQa8TdXj8Eg/viewform?embedded=true";
const GOOGLE_FORM_DIRECT =
  "https://docs.google.com/forms/d/e/1FAIpQLSd-flVDYA8kU5EBNBl0DbD1aDm19ZkTDVcsMt5JQa8TdXj8Eg/viewform";
const VENUE_MAP =
  "https://www.google.com/maps/search/?api=1&query=Mina+138%2C+Colonia+Guerrero%2C+Cuauht%C3%A9moc%2C+Ciudad+de+M%C3%A9xico";

function WeddingFlourish() {
  return (
    <div className="wc-flourish" aria-hidden="true">
      <span />
      <svg width="37" height="20" viewBox="0 0 37 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.5 1L31 10L18.5 19L6 10L18.5 1Z" stroke="currentColor" strokeWidth=".8" />
        <path d="M18.5 5L24 10L18.5 15L13 10L18.5 5Z" stroke="currentColor" strokeWidth=".8" />
        <circle cx="18.5" cy="10" r="1.8" fill="currentColor" />
      </svg>
      <span />
    </div>
  );
}

export default function AsistenciaPage() {
  return (
    <main className="wc-site">
      <div className="wc-outline" aria-hidden="true" />
      <section className="wc-paper" aria-labelledby="wc-title">
        <div className="wc-arch" aria-hidden="true" />
        <img
          src="/images/botanical-imperial.svg"
          className="wc-flower wc-flower-left"
          alt=""
          aria-hidden="true"
        />
        <img
          src="/images/botanical-imperial.svg"
          className="wc-flower wc-flower-right"
          alt=""
          aria-hidden="true"
        />

        <header className="wc-invite">
          <div className="wc-emblems">
            <div className="wc-emblem wc-emblem-seal">
              <img
                src="/images/mictlan-356-emblema.webp"
                width={1254}
                height={1254}
                alt="Emblema original de la R∴L∴S∴ Mictlán No. 356"
              />
              <span>Mictlán No. 356</span>
            </div>
            <div className="wc-emblem wc-compasses">
              <img
                src="/images/escuadra-compas-imperial.svg"
                width={160}
                height={160}
                alt="Escuadra y compás dorados, con ornamentación egipcia"
              />
            </div>
            <div className="wc-emblem wc-emblem-seal">
              <img
                src="/images/duat-no7-emblema.svg"
                width={240}
                height={240}
                alt="Emblema de la R∴L∴C∴ Duat No. 7"
              />
              <span>Duat No. 7</span>
            </div>
          </div>

          <p className="wc-eyebrow">C∴ Rec∴ Cony∴</p>
          <h1 id="wc-title">
            Reconocimiento<br />
            <em>Conyugal Masónico</em>
          </h1>
          <p className="wc-motto">
            Eres parte de nuestra familia y compartimos una historia
          </p>
          <WeddingFlourish />
          <p className="wc-honorees">
            <span>V∴H∴ Mario Juárez Alanís</span>
            <b aria-label="y">&amp;</b>
            <span>V∴H∴ Wendy Rolon Espinoza</span>
          </p>
        </header>

        <div className="wc-logistics">
          <p className="wc-date">
            <strong>Sábado 14 de noviembre de 2026</strong>
            <span>14:00 horas</span>
          </p>
          <p className="wc-location">
            <strong>Templo de M∴ R∴ L∴ F∴ Alma de Anáhuac</strong>
            <span>Calle Mina No. 138, Col. Guerrero, Alcaldía Cuauhtémoc, CDMX</span>
          </p>
          <a
            className="wc-map"
            href={VENUE_MAP}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
              <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
              <circle cx="12" cy="10" r="2.8" />
            </svg>
            Ver ubicación en Google Maps
          </a>
        </div>

        <section className="wc-registration" aria-labelledby="wc-form-title">
          <h2 id="wc-form-title">Confirma tu asistencia</h2>
          <p className="wc-help">Completa el formulario aquí mismo.</p>
          <aside className="wc-note">
            <strong>Importante:</strong> cada asistente deberá llevar sus propias bebidas para consumo personal.
          </aside>
          <div className="wc-form-container">
            <iframe
              title="Formulario original de confirmación de asistencia y aportaciones"
              src={GOOGLE_FORM}
              loading="eager"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <a className="wc-direct" href={GOOGLE_FORM_DIRECT} target="_blank" rel="noopener noreferrer">
            ¿No aparece el formulario? Ábrelo aquí.
          </a>
        </section>

        <footer className="wc-footer">
          <span aria-hidden="true">✧</span>
          <p>Mictlán No. 356 · Duat No. 7</p>
        </footer>
      </section>
    </main>
  );
}
