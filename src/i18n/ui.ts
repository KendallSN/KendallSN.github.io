/**
 * Localization primitives and the UI chrome dictionary.
 *
 * `es` is the source of truth for the key set. `en` is typed as
 * `Record<keyof typeof es, string>`, so adding a key to Spanish without an
 * English translation is a compile-time error (and the reverse is rejected by
 * excess property checks).
 */

export const languages = ['es', 'en'] as const;

export type Lang = (typeof languages)[number];

export const defaultLang: Lang = 'es';

export interface LanguageMeta {
  /** Locale code used for routing and `hreflang`. */
  code: Lang;
  /** Native language name, used as accessible label. */
  label: string;
  /** Short badge label shown in the switcher. */
  short: string;
  /** Value written to `<html lang>`. */
  htmlLang: string;
  /** Open Graph locale identifier. */
  ogLocale: string;
}

export const languageMeta: Record<Lang, LanguageMeta> = {
  es: { code: 'es', label: 'Español', short: 'ES', htmlLang: 'es', ogLocale: 'es_MX' },
  en: { code: 'en', label: 'English', short: 'EN', htmlLang: 'en', ogLocale: 'en_US' },
};

const es = {
  // Global chrome -----------------------------------------------------------
  'common.skipToContent': 'Saltar al contenido',
  'common.home': 'Inicio',
  'common.openMenu': 'Abrir menú de navegación',
  'common.closeMenu': 'Cerrar menú de navegación',
  'common.languageSwitcher': 'Cambiar idioma',
  'common.languageSwitcherHint': 'Ver este mismo apartado en el otro idioma',
  'common.downloadCv': 'Descargar CV',
  'common.downloadCvLabel': 'Descargar el CV en PDF',
  'common.cvShort': 'CV',
  'common.viewRepo': 'Ver repositorio',
  'common.viewDemo': 'Ver demostración',
  'common.newTab': 'abre en una pestaña nueva',
  'common.socialLabel': 'Perfiles profesionales',
  'common.footerNavigation': 'Navegación del sitio',
  'common.footerContact': 'Contacto directo',
  'common.footerBuiltWith': 'Construido con Astro. Publicado en GitHub Pages.',
  'common.rights': 'Todos los derechos reservados.',
  'common.sectionNav': 'Índice de secciones',
  'common.sectionPrefix': 'Sección',

  // Navigation --------------------------------------------------------------
  'nav.primary': 'Navegación principal',
  'nav.mobile': 'Navegación principal móvil',
  'nav.about': 'Acerca de mí',
  'nav.education': 'Educación',
  'nav.experience': 'Experiencia',
  'nav.skills': 'Habilidades',
  'nav.projects': 'Proyectos',
  'nav.contact': 'Contacto',

  // About -------------------------------------------------------------------
  'about.ctaContact': 'Hablemos de tu proyecto',
  'about.portraitAlt': 'Marcador de posición para la fotografía profesional',
  'about.portraitLabel': 'Retrato',
  'about.highlightsTitle': 'Líneas de trabajo',
  'about.highlightsEyebrow': 'Enfoque',
  'about.statsLabel': 'Indicadores de trayectoria',
  'about.profileLabel': 'Ficha profesional',

  // Education / experience --------------------------------------------------
  'education.timelineLabel': 'Cronología académica',
  'experience.timelineLabel': 'Cronología profesional',
  'timeline.current': 'Actual',
  'timeline.tagsLabel': 'Temas',

  // Skills ------------------------------------------------------------------
  'skills.groupsLabel': 'Grupos de habilidades',
  'skills.levelLabel': 'Nivel de dominio',
  'skills.levelCaption': 'Nivel',
  'skills.toolboxLabel': 'Herramientas complementarias',
  'skills.bandAdvanced': 'Avanzado',
  'skills.bandIntermediate': 'Intermedio',
  'skills.bandBasic': 'Básico',

  // Projects ----------------------------------------------------------------
  'projects.gridLabel': 'Galería de proyectos',
  'projects.techLabel': 'Tecnologías',
  'projects.linksLabel': 'Enlaces del proyecto',

  // Contact -----------------------------------------------------------------
  'contact.formTitle': 'Envía un mensaje',
  'contact.formSubtitle': 'Cuéntame el contexto, el alcance y el plazo estimado.',
  'contact.name': 'Nombre',
  'contact.namePlaceholder': 'Nombre y apellido',
  'contact.email': 'Correo electrónico',
  'contact.emailPlaceholder': 'nombre@empresa.com',
  'contact.company': 'Empresa',
  'contact.companyOptional': 'opcional',
  'contact.companyPlaceholder': 'Nombre de la empresa',
  'contact.message': 'Mensaje',
  'contact.messagePlaceholder': 'Describe el objetivo del proyecto, el equipo y las restricciones técnicas.',
  'contact.requiredHint': 'Los campos marcados con asterisco son obligatorios.',
  'contact.honeypot': 'No completar este campo',
  'contact.submit': 'Enviar mensaje',
  'contact.sending': 'Enviando…',
  'contact.success': 'Mensaje enviado. Gracias, responderé lo antes posible.',
  'contact.mailtoSuccess': 'Tu cliente de correo debería abrirse con el mensaje preparado. Si no ocurre, escríbeme directamente.',
  'contact.errorName': 'Indica tu nombre (al menos 2 caracteres).',
  'contact.errorEmail': 'Indica un correo electrónico válido.',
  'contact.errorMessage': 'Escribe un mensaje de al menos 20 caracteres.',
  'contact.errorValidation': 'Revisa los campos marcados antes de enviar.',
  'contact.errorSubmit': 'No pudimos enviar el mensaje. Intenta de nuevo o escríbeme por correo.',
  'contact.errorNetwork': 'Hubo un problema de red. Revisa tu conexión e intenta otra vez.',
  'contact.noJavascript': 'Sin JavaScript, el envío lo hace el navegador y no verás los mensajes de estado.',
  'contact.statusLabel': 'Estado del formulario',
  'contact.infoTitle': 'Canales directos',
  'contact.infoSubtitle': 'Respondo consultas técnicas y propuestas de colaboración.',
  'contact.emailLabel': 'Correo',
  'contact.phoneLabel': 'Teléfono',
  'contact.locationLabel': 'Ubicación',
  'contact.responseLabel': 'Tiempo de respuesta',
  'contact.preferredLabel': 'Canal preferido',
  'contact.formPrivacy': 'Tus datos se usan solo para responder esta consulta.',
  'contact.honeypotLabel': 'Este campo es un filtro anti-spam',

  // Command palette ---------------------------------------------------------
  'palette.open': 'Abrir la paleta de navegación',
  'palette.trigger': 'Buscar',
  'palette.title': 'Navegación rápida',
  'palette.placeholder': 'Filtrar secciones',
  'palette.empty': 'Ninguna sección coincide con la búsqueda.',
  'palette.hint': 'Flechas para moverte, Enter para abrir, Esc para cerrar.',
  'palette.close': 'Cerrar la paleta de navegación',
  'palette.listLabel': 'Secciones del sitio',
  'palette.results': '{count} resultados',

  // 404 ---------------------------------------------------------------------
  'notFound.eyebrow': 'Error 404',
  'notFound.title': 'Ruta no encontrada',
  'notFound.description': 'La dirección solicitada no existe en este sitio. Revisa la URL o vuelve al inicio.',
  'notFound.cta': 'Ir al inicio',
  'notFound.langSwitch': 'Ver la página en el otro idioma',
};

export type UiKey = keyof typeof es;

const en: Record<UiKey, string> = {
  'common.skipToContent': 'Skip to content',
  'common.home': 'Home',
  'common.openMenu': 'Open navigation menu',
  'common.closeMenu': 'Close navigation menu',
  'common.languageSwitcher': 'Change language',
  'common.languageSwitcherHint': 'View this same section in the other language',
  'common.downloadCv': 'Download CV',
  'common.downloadCvLabel': 'Download the CV as a PDF',
  'common.cvShort': 'CV',
  'common.viewRepo': 'View repository',
  'common.viewDemo': 'View live demo',
  'common.newTab': 'opens in a new tab',
  'common.socialLabel': 'Professional profiles',
  'common.footerNavigation': 'Site navigation',
  'common.footerContact': 'Direct contact',
  'common.footerBuiltWith': 'Built with Astro. Deployed on GitHub Pages.',
  'common.rights': 'All rights reserved.',
  'common.sectionNav': 'Section index',
  'common.sectionPrefix': 'Section',

  'nav.primary': 'Primary navigation',
  'nav.mobile': 'Primary mobile navigation',
  'nav.about': 'About me',
  'nav.education': 'Education',
  'nav.experience': 'Experience',
  'nav.skills': 'Skills',
  'nav.projects': 'Projects',
  'nav.contact': 'Contact',

  'about.ctaContact': "Let's talk about your project",
  'about.portraitAlt': 'Placeholder for the professional portrait',
  'about.portraitLabel': 'Portrait',
  'about.highlightsTitle': 'Areas of work',
  'about.highlightsEyebrow': 'Focus',
  'about.statsLabel': 'Career indicators',
  'about.profileLabel': 'Professional profile',

  'education.timelineLabel': 'Academic timeline',
  'experience.timelineLabel': 'Career timeline',
  'timeline.current': 'Current',
  'timeline.tagsLabel': 'Topics',

  'skills.groupsLabel': 'Skill groups',
  'skills.levelLabel': 'Proficiency level',
  'skills.levelCaption': 'Level',
  'skills.toolboxLabel': 'Supporting toolset',
  'skills.bandAdvanced': 'Advanced',
  'skills.bandIntermediate': 'Intermediate',
  'skills.bandBasic': 'Basic',

  'projects.gridLabel': 'Project gallery',
  'projects.techLabel': 'Technologies',
  'projects.linksLabel': 'Project links',

  'contact.formTitle': 'Send a message',
  'contact.formSubtitle': 'Share the context, the scope, and the expected timeline.',
  'contact.name': 'Name',
  'contact.namePlaceholder': 'First and last name',
  'contact.email': 'Email address',
  'contact.emailPlaceholder': 'name@company.com',
  'contact.company': 'Company',
  'contact.companyOptional': 'optional',
  'contact.companyPlaceholder': 'Company name',
  'contact.message': 'Message',
  'contact.messagePlaceholder': 'Describe the project goal, the team, and the technical constraints.',
  'contact.requiredHint': 'Fields marked with an asterisk are required.',
  'contact.honeypot': 'Do not fill in this field',
  'contact.submit': 'Send message',
  'contact.sending': 'Sending…',
  'contact.success': 'Message sent. Thanks, I will reply as soon as possible.',
  'contact.mailtoSuccess': 'Your email client should open with the message ready. If it does not, email me directly.',
  'contact.errorName': 'Enter your name (at least 2 characters).',
  'contact.errorEmail': 'Enter a valid email address.',
  'contact.errorMessage': 'Write a message of at least 20 characters.',
  'contact.errorValidation': 'Check the highlighted fields before sending.',
  'contact.errorSubmit': 'The message could not be sent. Try again or email me directly.',
  'contact.errorNetwork': 'There was a network problem. Check your connection and try again.',
  'contact.noJavascript': 'Without JavaScript, the browser submits the form and you will not see the status messages.',
  'contact.statusLabel': 'Form status',
  'contact.infoTitle': 'Direct channels',
  'contact.infoSubtitle': 'I respond to technical questions and collaboration proposals.',
  'contact.emailLabel': 'Email',
  'contact.phoneLabel': 'Phone',
  'contact.locationLabel': 'Location',
  'contact.responseLabel': 'Response time',
  'contact.preferredLabel': 'Preferred channel',
  'contact.formPrivacy': 'Your data is used only to answer this inquiry.',
  'contact.honeypotLabel': 'This field is an anti-spam filter',

  'palette.open': 'Open the navigation palette',
  'palette.trigger': 'Search',
  'palette.title': 'Quick navigation',
  'palette.placeholder': 'Filter sections',
  'palette.empty': 'No section matches that search.',
  'palette.hint': 'Arrow keys to move, Enter to open, Esc to close.',
  'palette.close': 'Close the navigation palette',
  'palette.listLabel': 'Site sections',
  'palette.results': '{count} results',

  'notFound.eyebrow': 'Error 404',
  'notFound.title': 'Route not found',
  'notFound.description': 'The requested address does not exist on this site. Check the URL or return to the home page.',
  'notFound.cta': 'Go to home',
  'notFound.langSwitch': 'View this page in the other language',
};

export const ui: Record<Lang, Record<UiKey, string>> = { es, en };
