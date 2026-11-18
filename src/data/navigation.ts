import type { UiKey } from '../i18n/ui';

/** Top-level sections, in the order they appear in the header. */
export type NavKey = 'about' | 'education' | 'experience' | 'skills' | 'projects' | 'contact';

export interface NavItem {
  key: NavKey;
  /** Language-relative path; the `about` section is the locale home page. */
  path: string;
  /** Bootstrap Icons class. */
  icon: string;
  /** Dictionary key holding the localized label. */
  labelKey: UiKey;
}

export const navigation: NavItem[] = [
  { key: 'about', path: '/', icon: 'bi-person-badge', labelKey: 'nav.about' },
  { key: 'education', path: '/education/', icon: 'bi-mortarboard', labelKey: 'nav.education' },
  { key: 'experience', path: '/experience/', icon: 'bi-briefcase', labelKey: 'nav.experience' },
  { key: 'skills', path: '/skills/', icon: 'bi-cpu', labelKey: 'nav.skills' },
  { key: 'projects', path: '/projects/', icon: 'bi-diagram-3', labelKey: 'nav.projects' },
  { key: 'contact', path: '/contact/', icon: 'bi-envelope-at', labelKey: 'nav.contact' },
];
