import { toUrl } from '../lib/url';
import { defaultLang, languages, ui, type Lang, type UiKey } from './ui';

/** Type guard for a supported locale code. */
export function isLang(value: string | undefined | null): value is Lang {
  return !!value && (languages as readonly string[]).includes(value);
}

/** Strip the configured base path and return the first path segment. */
function firstSegment(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  const relative = path.startsWith(base) ? path.slice(base.length) : path.replace(/^\/+/, '');
  return relative.split('/')[0] ?? '';
}

/** Resolve the locale of the current pathname, falling back to Spanish. */
export function getLangFromPath(path: string): Lang {
  const segment = firstSegment(path);
  return isLang(segment) ? segment : defaultLang;
}

/** Return a translator bound to a locale, falling back to the default locale. */
export function useTranslations(lang: Lang): (key: UiKey) => string {
  return (key: UiKey) => ui[lang][key] ?? ui[defaultLang][key];
}

/**
 * Turn a language-relative path (for example `/education/`) into a
 * base-path aware absolute site path (for example `/repo/es/education/`).
 */
export function localizePath(lang: Lang, path = '/'): string {
  const clean = path.replace(/^\/+/, '').replace(/\/+$/, '');
  return toUrl(clean ? `${lang}/${clean}/` : `${lang}/`);
}

/**
 * Replace the locale segment of the current pathname, keeping the section.
 * `/repo/es/education/` + `en` -> `/repo/en/education/`
 */
export function swapLangPath(pathname: string, target: Lang): string {
  const base = import.meta.env.BASE_URL || '/';
  const relative = pathname.startsWith(base) ? pathname.slice(base.length) : pathname.replace(/^\/+/, '');
  const segments = relative.split('/').filter(Boolean);
  if (isLang(segments[0])) segments.shift();
  const rest = segments.join('/');
  return toUrl(rest ? `${target}/${rest}/` : `${target}/`);
}

/** Route params for every supported locale, used by `getStaticPaths`. */
export function languagePaths(): Array<{ params: { lang: Lang } }> {
  return languages.map((lang) => ({ params: { lang } }));
}
