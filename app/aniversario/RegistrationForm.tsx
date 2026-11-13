/**
 * Acceso directo al formulario publicado en Google Apps Script.
 *
 * Apps Script puede fallar al mostrarse dentro de un iframe externo
 * (Firebase Hosting), presentando una pantalla de error de Google Drive.
 * Abrir el despliegue /exec directamente evita el iframe intermedio.
 * No cambiar la URL: el backend continúa enviando a Sheets y Drive.
 */
export default function RegistrationForm({ iframeUrl }: { iframeUrl: string }) {
  const validUrl = /^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec(?:\?.*)?$/.test(iframeUrl);

  if (!validUrl) {
    return (
      <div className="ann-form-shell ann-form-gateway" role="status">
        <p className="ann-gateway-overline">Registro oficial</p>
        <h3>Registro temporalmente no disponible</h3>
        <p>El enlace de inscripción aún no está configurado. Contacta al responsable del evento.</p>
      </div>
    );
  }

  return (
    <div className="ann-form-shell ann-form-gateway">
      <p className="ann-gateway-overline">Registro oficial · V Aniversario</p>
      <h3>Confirma tu asistencia</h3>
      <p className="ann-gateway-intro">
        Abre el formulario de registro de Mictlán en una pestaña nueva.
        Podrás indicar tu asistencia, número de invitados y aportaciones,
        además de adjuntar el comprobante de pago.
      </p>
      <a className="ann-gateway-link" href={iframeUrl} target="_blank" rel="noopener noreferrer">
        Abrir formulario de registro
        <span aria-hidden="true">↗</span>
      </a>
      <p className="ann-gateway-hint">
        Se abrirá directamente en Google Apps Script. Al terminar, vuelve a esta
        página para consultar los datos del aniversario.
      </p>
      <div className="ann-gateway-notice">
        <strong>Importante:</strong> el pago de $300 MXN y el comprobante son
        obligatorios tanto si asistirás como si no. El Ecónomo validará los depósitos.
      </div>
      <p className="ann-gateway-fallback">
        Si el botón no responde,{" "}
        <a href={iframeUrl} target="_blank" rel="noopener noreferrer">
          utiliza este enlace directo al formulario
        </a>.
      </p>
    </div>
  );
}
