import type { Metadata } from "next";
import RegistrationForm from "./RegistrationForm";
import CopyBankValue from "./CopyBankValue";
import { anniversaryFormUrl } from "./config";
import { anniversaryArtworkSrc } from "./artwork";
import "./aniversario.css";

export const metadata: Metadata = {
  title: "V Aniversario | R∴L∴S∴ Mictlán No. 356",
  description: "V Aniversario de la R∴L∴S∴ Mictlán No. 356. Sábado 28 de noviembre de 2026, 13:00 horas.",
  robots: { index: false, follow: false },
};

const googleCalendar = new URL("https://calendar.google.com/calendar/render");
googleCalendar.searchParams.set("action", "TEMPLATE");
googleCalendar.searchParams.set("text", "V Aniversario de la R∴L∴S∴ Mictlán No. 356");
googleCalendar.searchParams.set("dates", "20261128T130000/20261128T140000");
googleCalendar.searchParams.set("ctz", "America/Mexico_City");
googleCalendar.searchParams.set(
  "details",
  "Inicio 13:00 h · Rooftop del V∴H∴ Ragnar. El calendario reserva una hora de forma provisional; la hora de término no está confirmada."
);
googleCalendar.searchParams.set("location", "Patricio Sanz 236, Ciudad de México, México");

const maps = "https://www.google.com/maps/search/?api=1&query=Patricio%20Sanz%20236%2C%20Ciudad%20de%20M%C3%A9xico%2C%20M%C3%A9xico";

function Flourish() {
  return (
    <div className="ann-flourish" aria-hidden="true">
      <span />
      <svg viewBox="0 0 48 24" width="48" height="24" fill="none" focusable="false">
        <path d="M24 1 37 12 24 23 11 12 24 1Z" stroke="currentColor" strokeWidth=".9" />
        <path d="M24 6 30 12 24 18 18 12 24 6Z" stroke="currentColor" strokeWidth=".7" />
        <circle cx="24" cy="12" r="1.7" fill="currentColor"/>
      </svg>
      <span />
    </div>
  );
}

export default function AniversarioPage() {
  return (
    <main className="ann-page">
      <div className="ann-page-outline" aria-hidden="true" />
      <header className={"ann-hero" + (anniversaryArtworkSrc ? " ann-hero-with-art" : "")}>
        <div className="ann-hero-sun" aria-hidden="true" />
        <div className="ann-hero-inner">
          <div className="ann-hero-copy">
            <p className="ann-eyebrow">Respetable Logia Simbólica</p>
            <img
              className="ann-official-emblem"
              src="/images/mictlan-356-emblema.webp"
              width={1254}
              height={1254}
              alt="Emblema original de la R∴L∴S∴ Mictlán No. 356"
            />
            <div className="ann-roman-lockup" aria-hidden="true">V</div>
            <p className="ann-date-roman">XXVIII · XI · MMXXVI</p>
            <h1><span>V</span> Aniversario</h1>
            <p className="ann-loge-name">R∴L∴S∴ Mictlán No. 356</p>
            <Flourish />
            <p className="ann-motto">Cinco años de trabajo, fraternidad y perseverancia</p>
            <div className="ann-hero-cta">
              <a className="ann-button ann-button-primary" href="#registro">Confirmar participación</a>
              <a className="ann-button ann-button-outline" href={googleCalendar.toString()} target="_blank" rel="noopener noreferrer">Añadir al calendario</a>
            </div>
            <p className="ann-hero-venue">28 de noviembre · 13:00 h · Rooftop del V∴H∴ Ragnar</p>
          </div>
          {anniversaryArtworkSrc && (
            <div className="ann-hero-art">
              <div className="ann-hero-art-frame">
                <img
                  src={anniversaryArtworkSrc}
                  alt="Xoloitzcuintle guardián de Mictlán, con ornamentación de obsidiana, oro y motivos mexicas"
                  width={1122}
                  height={1402}
                  fetchPriority="high"
                />
              </div>
            </div>
          )}
        </div>
        <div className="ann-hero-bottom" aria-hidden="true">Mictlán · No. 356 · V Aniversario</div>
      </header>

      <div className="ann-body">
        <section className="ann-legacy" aria-labelledby="ann-legacy-heading">
          <div className="ann-legacy-symbol" aria-hidden="true"><span>V</span><small>ANNUS</small></div>
          <div className="ann-legacy-text">
            <p className="ann-overline">Cinco años</p>
            <h2 id="ann-legacy-heading">Cinco años de obra y fraternidad</h2>
            <p>Con motivo de nuestro <strong>V Aniversario</strong>, invitamos fraternalmente a nuestros QQ∴HH∴ a compartir una jornada de convivencia, celebración y Fraternidad.</p>
          </div>
        </section>

        <section className="ann-event" aria-labelledby="ann-event-heading">
          <header className="ann-section-heading">
            <p className="ann-overline">La celebración</p>
            <h2 id="ann-event-heading">Nuestra reunión fraternal</h2>
          </header>
          <div className="ann-event-grid">
            <div className="ann-event-cell"><span className="ann-detail-number">I</span><span>Fecha</span><strong>28 de noviembre de 2026</strong><small>Sábado</small></div>
            <div className="ann-event-cell"><span className="ann-detail-number">II</span><span>Hora</span><strong>13:00 horas</strong><small>Ciudad de México</small></div>
            <div className="ann-event-cell"><span className="ann-detail-number">III</span><span>Sede</span><strong>Rooftop del V∴H∴ Ragnar</strong><small>Patricio Sanz 236 · CDMX</small></div>
          </div>
          <div className="ann-event-actions">
            <a href={maps} target="_blank" rel="noopener noreferrer">Ver ubicación</a>
            <a href={googleCalendar.toString()} target="_blank" rel="noopener noreferrer">Google Calendar</a>
            <a href="/aniversario-2026.ics" download>Descargar evento .ics</a>
          </div>
        </section>

        <section className="ann-participation" aria-labelledby="ann-participation-heading">
          <header className="ann-section-heading">
            <p className="ann-overline">Convivencia</p>
            <h2 id="ann-participation-heading">Indicaciones para nuestros QQ∴HH∴</h2>
          </header>
          <div className="ann-guidelines">
            <div><span>01</span><h3>Cuota fraternal</h3><p><strong>$300 MXN por hermano</strong>, independientemente de su asistencia. Los invitados no tienen costo adicional.</p></div>
            <div><span>02</span><h3>Corte de carne</h3><p>Solicitamos a cada hermano que asista llevar su corte de carne e indicarlo en su registro.</p></div>
            <div><span>03</span><h3>Utensilios</h3><p>La aportación de utensilios es voluntaria y puede indicarse en el formulario.</p></div>
            <div><span>04</span><h3>Bebidas</h3><p>Cada persona deberá llevar sus propias bebidas para consumo personal.</p></div>
          </div>
        </section>

        <section className="ann-payment" aria-labelledby="ann-payment-heading">
          <div className="ann-payment-intro">
            <p className="ann-overline">Aportación y registro</p>
            <h2 id="ann-payment-heading">Datos para depósito</h2>
            <p>El pago y el comprobante son obligatorios, independientemente de la asistencia.</p>
          </div>
          <div className="ann-bank-card">
            <p className="ann-bank-label">Institución bancaria</p>
            <h3>Santander</h3>
            <p className="ann-bank-owner">Pablo Aarón Trejo Medina</p>
            <dl>
              <div><dt>CLABE</dt><dd><span>014180250008415544</span><CopyBankValue value="014180250008415544" label="CLABE" /></dd></div>
              <div><dt>Cuenta</dt><dd><span>25000841554</span><CopyBankValue value="25000841554" label="cuenta" /></dd></div>
              <div><dt>Tarjeta</dt><dd><span>5579 0830 4896 1060</span><CopyBankValue value="5579083048961060" label="tarjeta" /></dd></div>
            </dl>
            <p className="ann-bank-responsible">Responsable financiero: Ecónomo V∴H∴ Pablo Trejo.</p>
          </div>
        </section>

        <section className="ann-registration" id="registro" aria-labelledby="ann-registration-heading">
          <div className="ann-registration-intro">
            <p className="ann-overline">Confirmación</p>
            <h2 id="ann-registration-heading">Confirma tu participación</h2>
            <p>Completa el formulario, indica tus aportaciones cuando corresponda y adjunta el comprobante de pago. El registro no equivale a validación de pago.</p>
          </div>
          <RegistrationForm iframeUrl={anniversaryFormUrl} />
        </section>

        <footer className="ann-footer">
          <Flourish />
          <p>Que este quinto aniversario sea ocasión para reconocer el camino recorrido y renovar nuestra voluntad de continuar construyendo juntos.</p>
          <strong>R∴L∴S∴ Mictlán No. 356</strong>
          <small>Fraternidad, trabajo y perseverancia.</small>
        </footer>
      </div>
      <div className="ann-mobile-cta" aria-label="Acceso rápido a la confirmación">
        <span>28 NOV · 13:00 H</span>
        <a href="#registro">Confirmar asistencia ↗</a>
      </div>
    </main>
  );
}
