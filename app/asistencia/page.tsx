import type { Metadata } from "next";
import "./asistencia.css";

export const metadata: Metadata = {
  title: "Confirmación de asistencia | Mictlán No. 356",
  description: "Confirma tu asistencia y registra tu aportación para la convivencia.",
  robots: { index: false, follow: false }
};

const GOOGLE_FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLSd-flVDYA8kU5EBNBl0DbD1aDm19ZkTDVcsMt5JQa8TdXj8Eg/viewform?embedded=true";

export default function AsistenciaPage() {
  return (
    <main className="asistencia-page">
      <div className="asistencia-halo" aria-hidden="true" />
      <div className="asistencia-border" aria-hidden="true" />

      <header className="asistencia-header">
        <a className="asistencia-home-link" href="/" aria-label="Volver al sitio de Mictlán">
          <span className="asistencia-arrow" aria-hidden="true">←</span>
          Mictlán No. 356
        </a>
        <span className="asistencia-header-right">R∴ L∴ S∴</span>
      </header>

      <section className="asistencia-intro" aria-labelledby="asistencia-titulo">
        <div className="asistencia-seal">
          <img
            src="/images/mictlan-356-emblema.webp"
            alt="Emblema de la R∴L∴S∴ Mictlán No. 356"
            width={1254}
            height={1254}
          />
        </div>

        <p className="asistencia-eyebrow">Respetable Logia Simbólica · No. 356</p>
        <div className="asistencia-ornament" aria-hidden="true">
          <span />
          <span className="asistencia-diamond">◆</span>
          <span />
        </div>

        <h1 id="asistencia-titulo">Confirmación<br /><em>de asistencia</em></h1>

        <p className="asistencia-lead">
          Nos reunimos alrededor de una misma mesa.
          Agradecemos que confirmes tu participación y nos indiques
          qué platillo o aportación deseas compartir.
        </p>

        <aside className="asistencia-notice" aria-label="Información importante">
          <span className="asistencia-notice-label">Consideración para los asistentes</span>
          <p>Cada asistente deberá llevar sus propias bebidas para consumo personal.</p>
        </aside>
      </section>

      <section className="asistencia-form-section" aria-labelledby="asistencia-form-titulo">
        <div className="asistencia-form-heading">
          <span className="asistencia-form-rule" aria-hidden="true" />
          <h2 id="asistencia-form-titulo">Registro de invitados</h2>
          <span className="asistencia-form-rule" aria-hidden="true" />
        </div>
        <p className="asistencia-form-helper">
          Completa el formulario a continuación. Si no aparece en tu dispositivo,
          puedes abrirlo directamente en Google Forms.
        </p>
        <div className="asistencia-form-shell">
          <iframe
            title="Formulario de confirmación de asistencia"
            src={GOOGLE_FORM}
            loading="eager"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        <a
          className="asistencia-external-link"
          href={GOOGLE_FORM}
          target="_blank"
          rel="noopener noreferrer"
        >
          Abrir el formulario en otra pestaña
          <span aria-hidden="true">↗</span>
        </a>
      </section>

      <footer className="asistencia-footer">
        <span className="asistencia-footer-mark" aria-hidden="true">✦</span>
        <p>R∴L∴S∴ Mictlán No. 356</p>
        <small>Muy Respetable Gran Logia Valle de México</small>
      </footer>
    </main>
  );
}
