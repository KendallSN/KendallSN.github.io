# Portafolio bilingüe de Kendall Salazar Navarro

Sitio estático en Astro 5, en español e inglés, con seis secciones, formulario de contacto funcional, CV por idioma y despliegue en GitHub Pages.

Los datos personales, la formación, la experiencia, las habilidades y los proyectos son los reales del CV de Kendall Geovanny Salazar Navarro, y viven en `src/data/site.ts` y `src/data/content.ts`. Los dos PDF de `public/cv/` también son los CV reales: no los sobrescribas.

## Ruta rápida

1. `npm install`
2. `npm run dev` y abre `http://localhost:4321/es/`
3. Ajusta identidad y enlaces en `src/data/site.ts` y los textos en `src/data/content.ts`
4. Reemplaza las imágenes de `public/images/` (el retrato, los fondos, las miniaturas y la portada social) y el favicon en `public/favicon.svg`
5. Verifica con `npm run check && npm run build && npm run verify`

Cuando el sitio esté listo, sigue la sección [Publicar en GitHub Pages](#publicar-en-github-pages).

## Qué incluye

| Área | Estado |
|------|--------|
| Secciones | Acerca de mí, Educación, Experiencia, Habilidades, Proyectos, Contacto |
| Idiomas | `/es/...` y `/en/...`; `/` redirige a `/es/`; selector `ES \| EN` por sección |
| Formulario | Validación localizada, honeypot, envío a Web3Forms o `mailto:` de respaldo |
| CV | Botón de descarga en cabecera y portada, con el PDF real de cada idioma |
| Enlaces | GitHub y LinkedIn reales configurados en un solo archivo |
| Verificación | `npm run verify` revisa 9 invariantes sobre `dist/` |
| Despliegue | Workflow oficial de GitHub Pages en `.github/workflows/deploy.yml` |

## Estructura del proyecto

```text
astro.config.mjs          site y base desde SITE_URL / BASE_PATH
src/
  components/             Header, Footer, PageHero, formulario, selector de idioma, paleta de navegación
  data/
    site.ts               identidad real, correo, teléfono, redes, CV, rutas de imágenes
    content.ts            textos reales de página por idioma (tipados)
    navigation.ts         seis pestañas: clave, ruta e icono
  i18n/
    ui.ts                 cadenas de interfaz; el español define las claves
    utils.ts              resolución de idioma, rutas localizadas, traducciones
  layouts/BaseLayout.astro
  lib/url.ts              toUrl(): une rutas con la base del sitio
  pages/
    index.astro           redirección a /es/
    404.astro             página bilingüe de error
    [lang]/               seis rutas por idioma
  styles/global.css       tokens de diseño y sistema visual completo
public/
  images/                 SVG decorativos (los reemplazables son retrato, fondos, miniaturas y portada social)
  cv/                     CV real en español e inglés
scripts/verify-build.mjs  verificación estructural de dist/
```

## Variables de entorno

| Variable | Se lee en | Valor por defecto | Uso |
|----------|-----------|-------------------|-----|
| `SITE_URL` | `astro.config.mjs` | `https://kendallsn.github.io` | Origen absoluto para canonical, Open Graph y `sitemap` lógico |
| `BASE_PATH` | `astro.config.mjs` | `/` | Prefijo de todas las rutas y activos; normalizado con barras inicial y final |
| `PUBLIC_WEB3FORMS_ACCESS_KEY` | `src/data/site.ts` | vacío | Access Key de Web3Forms del formulario; se define en `.env` o como *repository variable*. Si falta, se usa `mailto:` |

Las tres se resuelven en tiempo de compilación. No se versiona ningún archivo `.env`: el repositorio incluye `.env.example` como referencia; cópialo a `.env` y completa tus valores. También puedes definirlas en la terminal o en GitHub como *repository variables*.

```powershell
Copy-Item .env.example .env
# edita .env y completa PUBLIC_WEB3FORMS_ACCESS_KEY
```

Si no defines `SITE_URL`, el build usa `https://kendallsn.github.io` como valor por defecto. Si publicas como página de proyecto, define `SITE_URL` y `BASE_PATH` explícitamente.

```powershell
# Ejemplo local para el sitio de usuario
$env:SITE_URL = "https://kendallsn.github.io"
$env:BASE_PATH = "/"
$env:PUBLIC_WEB3FORMS_ACCESS_KEY = "tu-access-key-de-web3forms"
npm run build
```

Solo variables con prefijo `PUBLIC_` llegan al navegador. No coloques secretos aquí.

## Formulario de contacto (Web3Forms)

El formulario usa [Web3Forms](https://web3forms.com): un POST a `https://api.web3forms.com/submit` con tu *Access Key*. No hay backend propio.

La clave se lee **únicamente** de la variable `PUBLIC_WEB3FORMS_ACCESS_KEY`. No está escrita en el código: créate un archivo `.env` en la raíz (copiando `.env.example`) y colócala ahí.

```dotenv
PUBLIC_WEB3FORMS_ACCESS_KEY=tu-access-key-de-web3forms
```

Para producción, defínela en **Settings → Secrets and variables → Actions → Variables**; el workflow ya la inyecta en el build.

La clave es pública por diseño: Web3Forms la necesita en el navegador, así que acaba en el HTML generado. Si no la defines, el formulario cae a un enlace `mailto:` con el mensaje ya redactado, y el sitio sigue funcionando.

Campos que viajan a Web3Forms: `name`, `email`, `company`, `message`, `access_key`, `subject`, `from_name`, `redirect` y el honeypot `botcheck`. Sin JavaScript el formulario se envía de forma nativa y Web3Forms te devuelve a la página de contacto con `?sent=true`.

## Publicar en GitHub Pages

1. Sube el repositorio a GitHub con la rama `main`.
2. En **Settings → Pages**, elige **GitHub Actions** como origen.
3. En **Settings → Secrets and variables → Actions → Variables**, agrega `SITE_URL`, `BASE_PATH` y `PUBLIC_WEB3FORMS_ACCESS_KEY`.
4. Haz push a `main` o ejecuta el workflow **Deploy to GitHub Pages** manualmente.
5. El workflow construye con `withastro/action` y publica con `actions/deploy-pages`.

| Tipo de sitio | `SITE_URL` | `BASE_PATH` | URL final |
|---------------|------------|-------------|-----------|
| Sitio de usuario (`KendallSN.github.io`) | `https://kendallsn.github.io` | `/` | `https://kendallsn.github.io/` |
| Sitio de proyecto (`/<repo>`) | `https://kendallsn.github.io` | `/<repo>` | `https://kendallsn.github.io/<repo>/` |

Para servir el portafolio en `https://kendallsn.github.io` el repositorio debe llamarse exactamente `KendallSN.github.io` y `BASE_PATH` debe quedar en `/`. Para una página de proyecto, usa `BASE_PATH=/<repo>`.

Ojo: el repositorio `KendallSN.github.io` existe y hoy publica el portafolio HTML anterior. Reemplazarlo por este sitio implica reemplazar ese contenido; confirma la decisión antes de hacerlo.

Si dejas una variable vacía, el build aplica el valor por defecto sin generar dobles barras.

### Si GitHub Pages falla con «Invalid YAML front matter»

Ese mensaje no lo genera Astro: lo genera el constructor Jekyll de GitHub Pages. Jekyll interpreta el bloque `---` de los archivos `.astro` como front matter YAML e intenta leer las líneas `import` como YAML.

Solución:

1. En **Settings → Pages → Build and deployment → Source**, selecciona **GitHub Actions**, no **Deploy from a branch**.
2. Confirma que el workflow **Deploy to GitHub Pages** corre sobre `main` y termina en verde.
3. Revisa que el fallo venga de este repositorio. Si el aviso menciona `KendallSN.github.io`, ese repositorio todavía contiene el portafolio HTML anterior y su configuración de Pages es la que está compilando con Jekyll.

El workflow ya construye el sitio con Astro. Si Pages sigue en «Deploy from a branch», Jekyll intentará procesar el código fuente y el despliegue nunca va a funcionar. No agregues `.nojekyll` para "arreglarlo": evita el error de Jekyll, pero publica los archivos fuente sin construir.

## Reemplazar contenido

| Qué | Archivo | Campos |
|-----|---------|--------|
| Nombre, rol, correo, teléfono, ubicación | `src/data/site.ts` | `profile.name`, `profile.role`, `profile.email`, `profile.phone`, `profile.phoneHref`, `profile.location`, `profile.availability` |
| GitHub y LinkedIn | `src/data/site.ts` | `socials[].url` |
| Rutas de CV | `src/data/site.ts` | `cv.es`, `cv.en` |
| Access Key de Web3Forms | `.env` | `PUBLIC_WEB3FORMS_ACCESS_KEY` |
| Portada, estadísticas, formación | `src/data/content.ts` | `about`, `education` |
| Experiencia, habilidades, proyectos | `src/data/content.ts` | `experience`, `skills`, `projects` |
| Textos de interfaz | `src/i18n/ui.ts` | botones, etiquetas, errores, pie de página |
| Pestañas | `src/data/navigation.ts` | etiqueta, ruta, icono |

El contenido actual ya es el real del CV: nombre, correo, teléfono, GitHub (`https://github.com/KendallSN`), LinkedIn (`https://www.linkedin.com/in/kendall-salazar-navarro`), tres estudios, dos entradas de experiencia, seis grupos de habilidades y cuatro proyectos con sus repositorios públicos. No inventes empleadores, fechas, certificaciones, métricas ni tecnologías al editarlo.

La disponibilidad («prácticas profesionales y roles junior»), la preferencia de trabajo remoto y el plazo de respuesta de 24 a 48 horas son supuestos editables, no datos que aparezcan en el CV. Ajústalos en `profile.availability`, `profile.responseTime` y en el cierre de `content[lang].contact` si cambian.

Los textos de página están tipados con las interfaces de `content.ts` y el diccionario inglés se declara como `Record<keyof typeof es, string>`. Si agregas una clave en español y olvidas la inglesa, `npm run check` falla.

Las barras de habilidades no muestran porcentajes: el nivel numérico (0–100, en los atributos `aria-valuenow`) se traduce a tres bandas —Avanzado con 85 o más, Intermedio desde 65 y Básico por debajo— definidas en `src/i18n/ui.ts` (`skills.band*`).

## Paleta y estilo

Los colores viven en `src/styles/global.css`, en el bloque `:root`. La identidad es morado profundo con detalles dorados.

| Token | Valor | Uso |
|-------|-------|-----|
| `--violet-deep` | `#3D0066` | Rellenos de profundidad, halos del fondo |
| `--violet` | `#5C0099` | Acentos oscuros y degradados |
| `--violet-light` / `--primary` | `#C86BFA` | Color interactivo: enlaces, botones, iconos, foco |
| `--gold` / `--secondary` | `#FDC500` | Detalles brillantes: cifras, etiquetas de nivel, distinguidos |
| `--gold-bright` / `--warning` | `#FFD500` | Avisos y realces secundarios |
| `--yellow` / `--accent` | `#FFEE32` | Reservado para brillos puntuales |
| `--bg` / `--ink` | `#03071E` | Fondo base y tinta sobre acentos |

Las superficies (`--surface`, `--surface-glass`, `--border`) derivan de esos tonos. El diseño evita bloques rectangulares duros: las tarjetas son translúcidas, sin borde completo, con radios grandes y separadores punteados. Si cambias la paleta, ajusta primero los tokens y después los degradados de `.backdrop`, `.card` y `.portrait-frame`, que son los que más color concentran.

## Imágenes

Todas las rutas viven en `src/data/site.ts` (`images`). Puedes conservar los nombres de archivo o cambiar la ruta en ese mapa.

| Archivo | Tamaño | Dónde aparece |
|---------|--------|---------------|
| `public/images/hero-systems.svg` | 1600 × 1000 | Fondo de la portada (Acerca de mí) |
| `public/images/bg-education.svg` | 1600 × 900 | Cabecera de Educación |
| `public/images/bg-experience.svg` | 1600 × 900 | Cabecera de Experiencia |
| `public/images/bg-skills.svg` | 1600 × 900 | Cabecera de Habilidades |
| `public/images/bg-projects.svg` | 1600 × 900 | Cabecera de Proyectos |
| `public/images/bg-contact.svg` | 1600 × 900 | Cabecera de Contacto |
| `public/images/avatar-placeholder.svg` | 800 × 800 (1:1) | Retrato en la portada |
| `public/images/project-1.svg` | 1200 × 750 (16:9) | Tarjeta de proyecto 1 |
| `public/images/project-2.svg` | 1200 × 750 (16:9) | Tarjeta de proyecto 2 |
| `public/images/project-3.svg` | 1200 × 750 (16:9) | Tarjeta de proyecto 3 |
| `public/images/project-4.svg` | 1200 × 750 (16:9) | Tarjeta de proyecto 4 |
| `public/images/og-cover.svg` | 1200 × 630 | Vista previa en redes sociales (`og:image` y `twitter:image`) |
| `public/favicon.svg` | 64 × 64 (vectorial) | Icono de la pestaña |

`hero-systems.svg` es solo el fondo de la portada. La imagen social que se publica en las metaetiquetas es `og-cover.svg`.

Los seis SVG decorativos (retrato, portada social y las cuatro miniaturas de proyecto) siguen siendo marcadores de posición dibujados: el texto y los enlaces de los proyectos ya son reales, pero las imágenes no son capturas. Reemplázalas cuando tengas fotografía y capturas propias.

Cómo reemplazarlas:

1. Usa JPG, PNG, WebP o AVIF con la misma proporción y al menos el tamaño indicado.
2. Sube el archivo a `public/images/`. Si cambias la extensión, actualiza la ruta en `images` de `src/data/site.ts`.
3. Mantén el retrato cuadrado y los thumbnails en 16:9 para evitar recortes inesperados.
4. Actualiza el texto alternativo en `content.ts` (`imageAlt`) y en `ui.ts` (`about.portraitAlt`).
5. Conserva un fondo oscuro en las imágenes de cabecera: el sitio aplica degradados encima para garantizar contraste.

Los SVG incluidos son decorativos y livianos. No contienen texto legible salvo micro-etiquetas técnicas; puedes sustituirlos por fotografía sin cambiar CSS.

## CV

`public/cv/CV-Espanol.pdf` y `public/cv/CV-English.pdf` son los CV reales de Kendall Salazar Navarro. No los sobrescribas con marcadores de posición.

- El botón usa el atributo `download` y apunta al PDF del idioma activo.
- Mantén una página, A4 o carta, con texto seleccionable.
- Si cambias de nombre, actualiza también la ruta en `site.ts`; el script de verificación comprueba que ambos PDF existan y empiecen con `%PDF`.

## Comportamiento del formulario

Campos: nombre, correo, empresa (opcional) y mensaje. Incluye validación nativa más mensajes localizados, un campo trampa `_gotcha`, el honeypot `botcheck` de Web3Forms y estados anunciados por `aria-live`.

| Situación | Comportamiento |
|-----------|----------------|
| Access Key configurada | `POST` de `FormData` a `https://api.web3forms.com/submit` con `Accept: application/json`; éxito solo con HTTP 2xx y `{ "success": true }` |
| Sin Access Key | Se compone un `mailto:` con los datos del formulario y se avisa que el cliente de correo debe abrirse |
| Error de red o respuesta inválida | Mensaje de error localizado; nunca se falla en silencio |
| JavaScript desactivado | Envío nativo a Web3Forms; te devuelve a la página de contacto con `?sent=true` |
| Respuesta de Web3Forms con `redirect` | `?sent=true` dispara el mensaje de éxito y se limpia la URL |

## Comandos

| Comando | Qué hace |
|---------|----------|
| `npm run dev` | Servidor de desarrollo en `http://localhost:4321` |
| `npm run build` | Genera el sitio estático en `dist/` |
| `npm run preview` | Sirve `dist/` localmente |
| `npm run check` | Diagnóstico de Astro y TypeScript (estricto) |
| `npm run verify` | Nueve verificaciones estructurales sobre `dist/` |

`npm run verify` comprueba: las seis rutas en cada idioma, `<html lang>` correcto, las seis etiquetas de navegación, el CV del idioma, el formulario y su endpoint, los PDF y SVG, ausencia de emojis, el selector de idioma en la misma sección y el prefijo de base en cada `href`/`src` interno.

## Lista de reemplazo

- [x] Nombre, rol, correo, teléfono, ubicación y disponibilidad en `src/data/site.ts`
- [x] URLs reales de GitHub y LinkedIn en `src/data/site.ts`
- [x] Textos y datos reales de las seis secciones en `src/data/content.ts`
- [x] CV reales en `public/cv/CV-Espanol.pdf` y `public/cv/CV-English.pdf`
- [ ] Retrato en `public/images/avatar-placeholder.svg` (o reemplazo con tu ruta)
- [ ] Fondos de sección y miniaturas de proyectos (`public/images/project-*.svg`, `bg-*.svg`, `hero-systems.svg`)
- [ ] `og-cover.svg` y `favicon.svg` con tu identidad
- [ ] `PUBLIC_WEB3FORMS_ACCESS_KEY` en tu `.env` (y como *repository variable* en GitHub) con tu Access Key real
- [ ] `SITE_URL` y `BASE_PATH` en las variables del repositorio
- [ ] Ejecutar `npm run check && npm run build && npm run verify`

## Notas técnicas

- Astro 5 con `output: 'static'`; sin servidor ni runtime SSR.
- CSS propio con tokens en `src/styles/global.css`; sin framework de UI.
- Iconos de `bootstrap-icons`; el proyecto no usa emojis en código, contenido ni HTML generado.
- Un único `IntersectionObserver` controla las animaciones de entrada, desactivadas con `prefers-reduced-motion`.
- Navegación móvil con `aria-expanded`, cierre con `Escape` y cierre al elegir un enlace.
- Todas las rutas internas pasan por `toUrl()` o `localizePath()`; ninguna URL depende de la raíz del dominio.
- GitHub Pages recibe el artefacto ya construido; no se requiere `.nojekyll` manual porque lo maneja la acción oficial.

## Próximo paso

Configura las variables del repositorio y publica con el workflow incluido: [Publicar en GitHub Pages](#publicar-en-github-pages).
