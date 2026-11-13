/**
 * Formulario oficial del V Aniversario integrado en la misma página.
 * Conserva el despliegue /exec de Google Apps Script y su conexión con Sheets y Drive.
 * El despliegue debe tener acceso público y permitir iframes (ALLOWALL).
 */
export default function RegistrationForm({ iframeUrl }: { iframeUrl: string }) {
  const validUrl = /^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec(?:\?.*)?$/.test(iframeUrl);

  if (!validUrl) {
    return (
      <div className="ann-form-shell ann-form-embedded" role="status">
        <p>El formulario de registro no está configurado. Contacta al responsable del evento.</p>
      </div>
    );
  }

  return (
    <div className="ann-form-shell ann-form-embedded">
      <iframe
        title="Formulario oficial de registro del V Aniversario de Mictlán"
        src={iframeUrl}
        loading="eager"
      />
      <p className="ann-embedded-note">
        El comprobante se envía mediante el formulario oficial y su validación corresponde al Ecónomo.
      </p>
    </div>
  );
}
