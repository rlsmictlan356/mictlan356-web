# Mictlán No. 356 — V Aniversario 2026

## Estado

- La página web \`/aniversario\` se preparó en la rama \`feature/v-aniversario-2026\`.
- Las hojas de Google Sheets y carpeta privada de comprobantes YA EXISTEN.
- Google Apps Script **aún no está desplegado**: no hay URL \`/exec\`.
- Mientras no se configure esa URL, la página muestra una **vista previa no funcional** (no guarda registros).

## Archivos de Google ya creados

- [Registros privados — Ecónomo](https://docs.google.com/spreadsheets/d/17V-8XC8j_FokFh2pZxICzXLsjtd6kqvU7ps-eh25gSQ/edit)
- [Asistencia y aportaciones — organizadores](https://docs.google.com/spreadsheets/d/1RRg6sFUMruQCoNh3A1Mhj2-UWZjWJIRfwNprbrV4pfQ/edit)
- [Carpeta privada de comprobantes](https://drive.google.com/drive/folders/1YEZtW0_ohFHX8FqHFnPeC2mAJDsktF1v)

## Paso 1. Crear la aplicación Google Apps Script

1. En la cuenta de Google propietaria, abre https://script.google.com/home/projects/create.
2. Ponle el nombre **Mictlán — V Aniversario — Registros**.
3. Abre \`apps-script/Code.gs\` en este repositorio. Copia **todo el código** y pégalo en el archivo \`Código.gs\` de Apps Script, reemplazando su contenido.
4. En la barra lateral de Apps Script, elige **+ > HTML**. Escribe **Form** como nombre (sin la extensión). Copia todo el contenido de \`apps-script/Form.html\` del repositorio.
5. Guarda ambos archivos.
6. Selecciona la función \`setup_\` desde el menú de funciones del editor y pulsa **Ejecutar**. Concede al proyecto los permisos de Google Sheets y Google Drive de **tu cuenta propietaria**. Esta función comprueba los archivos; no envía registros.

## Paso 2. Publicar el formulario

1. En Apps Script pulsa **Implementar > Nueva implementación**.
2. Tipo: **Aplicación web**.
3. Ejecutar como: **Yo (la cuenta propietaria)**.
4. Quién tiene acceso: **Cualquier persona** (sin iniciar sesión).
5. Completa la autorización y pulsa **Implementar**.
6. Copia la **URL de la aplicación web** que empieza con \`https://script.google.com/macros/s/\` y termina con \`/exec\`.
7. Abre la URL en una ventana de incógnito. **No debe solicitar iniciar sesión**. Si Google restringe el acceso por la política de tu organización, el formulario anónimo no estará operativo.

## Paso 3. Conectar el formulario con el portal

1. En esta misma rama abre \`app/aniversario/config.ts\`.
2. Cambia **solo** esta línea:
   \`\`\`ts
   export const anniversaryFormUrl = "";
   \`\`\`
   por:
   \`\`\`ts
   export const anniversaryFormUrl = "https://script.google.com/macros/s/TU_ID_REAL/exec";
   \`\`\`
   Usa la URL REAL copiada de tu implementación.
3. Guarda el cambio en GitHub.
4. Revisa y fusiona el pull request de \`feature/v-aniversario-2026\` hacia \`main\`.
5. El flujo GitHub Actions existente construirá el sitio y publicará en Firebase. Ruta esperada: **https://rls-mictlan356.web.app/aniversario/**.

## Paso 4. Probar el funcionamiento completo

1. Abre la URL publicada en incógnito, desde un teléfono y una computadora.
2. Haz una prueba con un PDF/JPG/PNG pequeño. Prueba asistencia **Sí**, invitados, corte, y luego asistencia **No** (con un folio de prueba distinto).
3. Comprueba que en **Registros privados** aparecen ambos registros, cada uno con estado **Pendiente** y URL privada del comprobante.
4. Comprueba que en **Asistencia** aparecen nombre, asistencia, invitados, total, corte y utensilios, sin enlaces financieros.
5. Comprueba en Drive que los comprobantes son privados, y en Apps Script el historial de ejecuciones.
6. **Elimina las filas y comprobantes de prueba** antes de abrir la convocatoria real.

## Permisos

- Tu cuenta es la propietaria del script, las hojas y los comprobantes.
- Comparte la hoja privada y la carpeta de comprobantes SOLO con el Ecónomo V∴H∴ Pablo Trejo. Los permisos se otorgan mediante su correo de Google, que todavía no se proporcionó.
- Comparte SOLO la hoja de asistencia con los organizadores. No compartas la hoja financiera con ellos.

## Seguridad y limitaciones

El formulario está abierto a cualquier persona con el enlace y **no verifica que quien escribe sea hermano**. Todos los comprobantes quedan en privado; el Ecónomo debe validar manualmente el depósito. Un formulario anónimo puede recibir envíos falsos/automatizados; antes de una difusión masiva considera CAPTCHA y límites adicionales de abuso. Se aplican límite de 4 MB y validación de formato JPG/PNG/PDF, pero esto no sustituye antivirus ni auditoría de seguridad.

El iframe de Apps Script utiliza \`HtmlService.XFrameOptionsMode.ALLOWALL\` y Google puede introducir restricciones o cambios que impidan mostrarlo dentro de Firebase. Por ello incluimos un enlace de respaldo para abrirlo en otra pestaña.

El calendario incluye la hora de inicio (13:00, Ciudad de México). **No se especificó hora de finalización**.
