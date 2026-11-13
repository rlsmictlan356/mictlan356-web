import type { Metadata } from "next";
import RegistrationForm from "./RegistrationForm";
import "./aniversario.css";

export const metadata: Metadata = {
  title: "V Aniversario | R∴L∴S∴ Mictlán No. 356",
  description: "Invitación y registro para el V Aniversario de la R∴L∴S∴ Mictlán No. 356. Sábado 28 de noviembre de 2026, 13:00 h.",
  robots: { index: false, follow: false },
};

const googleCalendar = new URL("https://calendar.google.com/calendar/render");
googleCalendar.searchParams.set("action", "TEMPLATE");
googleCalendar.searchParams.set("text", "V Aniversario de la R∴L∴S∴ Mictlán No. 356");
googleCalendar.searchParams.set("dates", "20261128T130000/20261128T130000");
googleCalendar.searchParams.set("ctz", "America/Mexico_City");
googleCalendar.searchParams.set("details", "Inicio: 13:00 h. Rooftop del V∴H∴ Ragnar. La hora de término está pendiente de confirmar.");
googleCalendar.searchParams.set("location", "Patricio Sanz 236, Ciudad de México, México");

const maps = "https://www.google.com/maps/search/?api=1&query=Patricio%20Sanz%20236%2C%20Ciudad%20de%20M%C3%A9xico%2C%20M%C3%A9xico";
const formUrl = process.env.NEXT_PUBLIC_MICTLAN_ANIVERSARIO_FORM_URL ?? "";

export default function AniversarioPage() {
  return (
    <main className="ann-page">
      <div className="ann-frame" aria-hidden="true" />
      <header className="ann-hero">
        <p className="ann-eyebrow">Respetable Logia Simbólica · Mictlán No. 356</p>
        <img
          className="ann-emblem"
          src="/images/mictlan-356-emblema.webp"
          width="1254"
          height="1254"
          alt="Emblema oficial original de la R∴L∴S∴ Mictlán No. 356"
        />
        <div className="ann-roman" aria-hidden="true">V</div>
        <div className="ann-hero-title">
          <p className="ann-smallcap">28 · XI · MMXXVI</p>
          <h1>V Aniversario</h1>
          <p>R∴L∴S∴ Mictlán No. 356</p>
        </div>
        <div className="ann-ornament" aria-hidden="true"><span />✦<span /></div>
        <p className="ann-motto">Cinco años de trabajo, fraternidad y perseverancia</p>
        <a className="ann-outline-action" href="#registro">Confirmar participación <span aria-hidden="true">↓</span></a>
      </header>

      <div className="ann-body">
        <section className="ann-intro" aria-labelledby="ann-invitation">
          <p className="ann-section-overline">Nuestra celebración</p>
          <h2 id="ann-invitation">Una invitación fraternal</h2>
          <p>Con motivo de nuestro <strong>V Aniversario</strong>, invitamos fraternalmente a nuestros QQ∴HH∴ a compartir una jornada de convivencia, celebración y Fraternidad.</p>
        </section>

        <section className="ann-event" aria-labelledby="ann-event-heading">
          <div className="ann-event-grid">
            <div><span>Fecha</span><strong>28 noviembre 2026</strong><small>Sábado</small></div>
            <div><span>Hora de inicio</span><strong>13:00 h</strong><small>Ciudad de México</small></div>
            <div><span>Sede</span><strong>Rooftop del V∴H∴ Ragnar</strong><small>Patricio Sanz 236 · CDMX</small></div>
          </div>
          <h2 className="ann-sr-only" id="ann-event-heading">Datos del evento</h2>
          <div className="ann-event-actions">
            <a href={maps} target="_blank" rel="noopener noreferrer">Ver ubicación</a>
            <a href={googleCalendar.toString()} target="_blank" rel="noopener noreferrer">Añadir a Google Calendar</a>
            <a href="/aniversario-2026.ics" download>Descargar evento .ics</a>
          </div>
        </section>

        <section className="ann-participation" aria-labelledby="ann-rules-heading">
          <p className="ann-section-overline">Indicaciones para la convivencia</p>
          <h2 id="ann-rules-heading">Participación y aportaciones</h2>
          <div className="ann-rules">
            <div><span className="ann-rule-number">01</span><h3>Cuota fraternal</h3><p><strong>$300 MXN por hermano</strong>, asista o no. Los invitados no tienen costo adicional.</p></div>
            <div><span className="ann-rule-number">02</span><h3>Corte de carne</h3><p>Cada hermano que asista llevará su corte de carne. Este dato será obligatorio en el registro.</p></div>
            <div><span className="ann-rule-number">03</span><h3>Utensilios</h3><p>La aportación de utensilios es voluntaria y podrá indicarse en texto libre.</p></div>
            <div><span className="ann-rule-number">04</span><h3>Bebidas</h3><p>Cada persona deberá llevar sus propias bebidas para consumo personal.</p></div>
          </div>
        </section>

        <section className="ann-payment" aria-labelledby="ann-payment-heading">
          <div className="ann-payment-head"><p className="ann-section-overline">Aportación y registro</p><h2 id="ann-payment-heading">Datos para depósito</h2><p>El pago y el comprobante son obligatorios, independientemente de la asistencia.</p></div>
          <div className="ann-bank-card">
            <p className="ann-bank-name">Santander</p>
            <p className="ann-bank-owner">Pablo Aarón Trejo Medina</p>
            <dl>
              <div><dt>CLABE</dt><dd>014180250008415544</dd></div>
              <div><dt>Cuenta</dt><dd>25000841554</dd></div>
              <div><dt>Tarjeta</dt><dd>5579 0830 4896 1060</dd></div>
            </dl>
            <p className="ann-bank-responsible">Responsable financiero: Ecónomo V∴H∴ Pablo Trejo.</p>
          </div>
        </section>

        <section className="ann-register" id="registro" aria-labelledby="ann-register-heading">
          <p className="ann-section-overline">Confirmación</p>
          <h2 id="ann-register-heading">Registra tu participación</h2>
          <p>Confirma tu asistencia y adjunta el comprobante. Si no asistirás, la cuota y el comprobante siguen siendo obligatorios.</p>
          <RegistrationForm iframeUrl={formUrl} />
        </section>

        <footer className="ann-footer">
          <div className="ann-ornament" aria-hidden="true"><span />✦<span /></div>
          <p>Que este quinto aniversario sea ocasión para reconocer el camino recorrido y renovar nuestra voluntad de continuar construyendo juntos.</p>
          <strong>R∴L∴S∴ Mictlán No. 356</strong>
          <small>Fraternidad, trabajo y perseverancia.</small>
        </footer>
      </div>
    </main>
  );
}
