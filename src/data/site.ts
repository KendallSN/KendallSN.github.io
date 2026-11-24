import type { Lang } from '../i18n/ui';

/**
 * Single source of truth for identity, links, files, and media slots.
 * Everything a visitor can replace lives here or in `content.ts`.
 */

export interface LocalizedText {
  es: string;
  en: string;
}

export interface SocialLink {
  key: 'github' | 'linkedin';
  label: string;
  icon: string;
  url: string;
}

export const site = {
  profile: {
    name: 'Kendall Salazar Navarro',
    role: {
      es: 'Ingeniero en Sistemas de Información Full Stack',
      en: 'Full Stack Information Systems Engineer',
    },
    email: 'kendallsalazarnavarro@gmail.com',
    /** Display form of the phone number. */
    phone: '+506 6451 5600',
    /** Dialable form used by the `tel:` link. */
    phoneHref: 'tel:+50664515600',
    location: {
      es: 'Pérez Zeledón, Costa Rica',
      en: 'Pérez Zeledón, Costa Rica',
    },
    availability: {
      es: 'Disponible para prácticas profesionales y roles junior de desarrollo full stack',
      en: 'Open to internships and junior full stack roles',
    },
    responseTime: {
      es: 'Respondo en 24 a 48 horas',
      en: 'I reply within 24 to 48 hours',
    },
    preferredChannel: {
      es: 'Correo electrónico o formulario',
      en: 'Email or contact form',
    },
  },
  /**
   * Contact form — Web3Forms (https://web3forms.com).
   *
   * The Access Key comes ONLY from the `PUBLIC_WEB3FORMS_ACCESS_KEY`
   * environment variable (local `.env` file or a GitHub Actions repository
   * variable). It is never hardcoded here.
   *
   * The key is public by design: Web3Forms requires it in the browser, so it
   * ships with the page. While it is unset, the form falls back to `mailto:`.
   */
  contact: {
    endpoint: 'https://api.web3forms.com/submit',
    accessKey: (import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY ?? '').trim(),
  },
  cv: {
    es: '/cv/Kendall_Salazar_Ingeniero_Sistemas_CV.pdf',
    en: '/cv/Kendall_Salazar_Software_Engineer_CV.pdf',
  } satisfies Record<Lang, string>,
  socials: [
    {
      key: 'github',
      label: 'GitHub',
      icon: 'bi-github',
      url: 'https://github.com/KendallSN',
    },
    {
      key: 'linkedin',
      label: 'LinkedIn',
      icon: 'bi-linkedin',
      url: 'https://www.linkedin.com/in/kendall-salazar-navarro',
    },
  ] satisfies SocialLink[],
} as const;

/**
 * Replaceable media slots. Every path is relative to the site root and is
 * resolved through the base-path helper at render time.
 */
export const images = {
  hero: '/images/hero-systems.svg',
  og: '/images/og-cover.svg',
  avatar: '/images/avatar-placeholder.jpg',
  backgrounds: {
    about: '/images/hero-systems.svg',
    education: '/images/bg-education.svg',
    experience: '/images/bg-experience.svg',
    skills: '/images/bg-skills.svg',
    projects: '/images/bg-projects.svg',
    contact: '/images/bg-contact.svg',
  },
  projects: {
    platform: '/images/project-1.svg',
    observability: '/images/project-2.svg',
    environments: '/images/project-3.svg',
    events: '/images/project-4.svg',
  },
} as const;

export type SectionKey = keyof typeof images.backgrounds;
export type ProjectImageKey = keyof typeof images.projects;
