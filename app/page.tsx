import type { Metadata } from "next";
import "./ceremonia.css";

export const metadata: Metadata = {
  title: "Reconocimiento Conyugal Masónico | Mictlán & Duat",
  description:
    "Ceremonia de Reconocimiento Conyugal Masónico en honor de Mario Juárez Alanís y Wendy Rolon Espinoza. Sábado 14 de noviembre de 2026, CDMX."
};

function Filigree({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "ci-filigree ci-filigree-small" : "ci-filigree"} aria-hidden="true">
      <span className="ci-rule" />
      <svg width="32" height="22" viewBox="0 0 32 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 1L28 11L16 21L4 11L16 1Z M16 5L23 11L16 17L9 11L16 5Z" stroke="currentColor" strokeWidth=".8" />
        <circle cx="16" cy="11" r="2.2" fill="currentColor" />
      </svg>
      <span className="ci-rule" />
    </div>
  );
}

function Icon({ name }: { name: "calendar" | "clock" | "temple" | "location" }) {
  if (name === "calendar") {
    return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><rect x="5.5" y="8" width="21" height="19" rx="1.5" /><path d="M5.5 13h21M11 5v6M21 5v6M11 18h3m4 0h3m-10 5h3m4 0h3" /></svg>;
  }
  if (name === "clock") {
    return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><circle cx="16" cy="16" r="11" /><path d="M16 8v9l5 3" /></svg>;
  }
  if (name === "temple") {
    return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M3 12L16 5l13 7M5 14h22M4 28h24M7 25h18M9 15v10m7-10v10m7-10v10" /></svg>;
  }
  return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M16 29S6 18 6 13a10 10 0 1 1 20 0c0 5-10 16-10 16Z" /><circle cx="16" cy="13" r="3.5" /></svg>;
}

export default function Home() {
  return (
    <main className="ci-page" id="inicio">
      <div className="ci-border" aria-hidden="true" />
      <header className="ci-nav">
        <a href="#inicio" className="ci-brand" aria-label="Inicio de la ceremonia">
          <span className="ci-brand-icon">✦</span>
          <span>MICTLÁN <b>No. 356</b></span>
        </a>
        <nav aria-label="Navegación de la ceremonia">
          <a href="#ceremonia">La ceremonia</a>
          <a href="#detalles">Detalles</a>
          <a href="/asistencia/" className="ci-nav-rsvp">Asistencia <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <section className="ci-hero" id="ceremonia">
        <div className="ci-architecture" aria-hidden="true">
          <div className="ci-column ci-column-left"><i /><i /><i /></div>
          <div className="ci-column ci-column-right"><i /><i /><i /></div>
          <div className="ci-arch" />
        </div>
        <img className="ci-botanical ci-botanical-left" src="/images/botanical-imperial.svg" alt="" aria-hidden="true" />
        <img className="ci-botanical ci-botanical-right" src="/images/botanical-imperial.svg" alt="" aria-hidden="true" />

        <div className="ci-hero-inner">
          <div className="ci-institutions">
            <div className="ci-institution">
              <div className="ci-seal">
                <img src="/images/mictlan-356-emblema.webp" alt="Emblema oficial de Mictlán No. 356" width="1254" height="1254" />
              </div>
              <span>MICTLÁN <b>NO. 356</b></span>
            </div>

            <div className="ci-centre-mark" aria-hidden="true">
              <span className="ci-rays" />
              <svg viewBox="0 0 88 88" fill="none">
                <path d="M27 62L44 19L61 62M33 43L44 68L55 43" stroke="currentColor" strokeWidth="2" />
                <circle cx="44" cy="18" r="3" stroke="currentColor" strokeWidth="1.5" />
                <path d="M44 0V11M44 75v13M0 44h16M72 44h16M14 14l12 12m36 36 12 12m0-60L62 26M26 62L14 74" stroke="currentColor" opacity=".48" strokeWidth=".8" />
              </svg>
            </div>

            <div className="ci-institution">
              <div className="ci-seal">
                <img src="/images/duat-no7-emblema.svg" alt="Emblema proporcionado de Duat No. 7" width="240" height="240" />
              </div>
              <span>DUAT <b>NO. 7</b></span>
            </div>
          </div>

          <div className="ci-event-tag">C∴ REC∴ CONY∴</div>
          <h1>Reconocimiento<br /><em>Conyugal Masónico</em></h1>
          <p className="ci-subtitle">Eres parte de nuestra familia y compartimos una historia</p>

          <Filigree />

          <div className="ci-honorees">
            <span className="ci-kicker">EN HONOR A</span>
            <p>V∴ H∴ Mario Juárez Alanís</p>
            <span className="ci-ampersand" aria-label="y">&amp;</span>
            <p>V∴ H∴ Wendy Rolon Espinoza</p>
          </div>
        </div>
      </section>

      <section className="ci-details" id="detalles" aria-labelledby="ci-details-title">
        <h2 id="ci-details-title">Detalles de la ceremonia</h2>
        <div className="ci-detail-grid">
          <article className="ci-detail">
            <Icon name="calendar" />
            <h3>Fecha</h3>
            <p>Sábado 14 de<br />noviembre de 2026</p>
          </article>
          <article className="ci-detail">
            <Icon name="clock" />
            <h3>Hora</h3>
            <p>14:00 horas</p>
          </article>
          <article className="ci-detail">
            <Icon name="temple" />
            <h3>Lugar</h3>
            <p>Templo de la M∴ R∴ L∴ F∴<br />Alma de Anáhuac</p>
          </article>
          <article className="ci-detail">
            <Icon name="location" />
            <h3>Dirección</h3>
            <p>Calle Mina No. 138<br />Col. Guerrero, Cuauhtémoc, CDMX</p>
          </article>
        </div>
        <a
          className="ci-map-link"
          href="https://www.google.com/maps/search/?api=1&query=Calle+Mina+138+Colonia+Guerrero+Cuauhtemoc+Ciudad+de+Mexico"
          target="_blank"
          rel="noopener noreferrer"
        >Ver ubicación <span aria-hidden="true">↗</span></a>
      </section>

      <section className="ci-rsvp" aria-labelledby="ci-rsvp-title">
        <Filigree compact />
        <div className="ci-rsvp-card">
          <span className="ci-rsvp-eyebrow">NOS HONRARÁ CONTAR CON TU PRESENCIA</span>
          <h2 id="ci-rsvp-title">Confirmación de asistencia</h2>
          <p className="ci-rsvp-intro">Agradecemos registrar tu asistencia y tu aportación para esta celebración.</p>
          <a href="/asistencia/" className="ci-primary-button">
            Confirmar asistencia
            <span aria-hidden="true">→</span>
          </a>
          <p className="ci-rsvp-note">Cada asistente deberá llevar sus propias bebidas para consumo personal.</p>
        </div>
      </section>

      <footer className="ci-footer">
        <span className="ci-footer-ornament" aria-hidden="true">✧</span>
        <p>R∴L∴S∴ Mictlán No. 356 &nbsp; · &nbsp; R∴L∴C∴ Duat No. 7</p>
        <small>Unión · Armonía · Fraternidad</small>
      </footer>
    </main>
  );
}
