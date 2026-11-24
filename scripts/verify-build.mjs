/**
 * Structural verification of the generated site in `dist/`.
 *
 * Plain Node, no dependencies. Prints one line per check and exits non-zero
 * when any check fails.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

/** Mirror of the base-path normalization used by `astro.config.mjs`. */
function normalizeBase(raw) {
  if (!raw) return '/';
  let base = String(raw).trim();
  if (!base) return '/';
  base = base.replace(/^[a-z][a-z0-9+.-]*:\/\/[^/]+/i, '');
  base = base.replace(/\\/g, '/');
  if (!base.startsWith('/')) base = `/${base}`;
  if (!base.endsWith('/')) base = `${base}/`;
  return base.replace(/\/{2,}/g, '/');
}

const base = normalizeBase(process.env.BASE_PATH);

const LOCALES = ['es', 'en'];

const SECTIONS = [
  { slug: '', label: 'about' },
  { slug: 'education', label: 'education' },
  { slug: 'experience', label: 'experience' },
  { slug: 'skills', label: 'skills' },
  { slug: 'projects', label: 'projects' },
  { slug: 'contact', label: 'contact' },
];

const NAV_LABELS = {
  es: ['Acerca de mí', 'Educación', 'Experiencia', 'Habilidades', 'Proyectos', 'Contacto'],
  en: ['About me', 'Education', 'Experience', 'Skills', 'Projects', 'Contact'],
};

const CV_FILES = {
  es: 'Kendall_Salazar_Ingeniero_Sistemas_CV.pdf',
  en: 'Kendall_Salazar_Software_Engineer_CV.pdf',
};

const IMAGE_FILES = [
  'hero-systems.svg',
  'bg-education.svg',
  'bg-experience.svg',
  'bg-skills.svg',
  'bg-projects.svg',
  'bg-contact.svg',
  'avatar-placeholder.svg',
  'project-1.svg',
  'project-2.svg',
  'project-3.svg',
  'project-4.svg',
  'og-cover.svg',
];

const EMOJI_PATTERN =
  /[\u{1F000}-\u{1FAFF}\u{1F1E6}-\u{1F1FF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{23E9}-\u{23FA}\u{25AA}-\u{25FE}]/u;

const results = [];

function check(id, title, run) {
  const details = [];
  let passed = true;
  try {
    const outcome = run((message) => details.push(message));
    if (outcome === false) passed = false;
  } catch (error) {
    passed = false;
    details.push(error instanceof Error ? error.message : String(error));
  }
  results.push({ id, title, passed, details });
}

function pagePath(locale, slug) {
  return join(dist, locale, slug, 'index.html');
}

function read(file) {
  return readFileSync(file, 'utf8');
}

function walk(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, acc);
    else if (entry.endsWith('.html')) acc.push(full);
  }
  return acc;
}

if (!existsSync(dist)) {
  console.error('dist/ not found. Run `npm run build` before `npm run verify`.');
  process.exit(1);
}

const htmlFiles = walk(dist);
const htmlByLocale = {
  es: htmlFiles.filter((file) => file.startsWith(join(dist, 'es'))),
  en: htmlFiles.filter((file) => file.startsWith(join(dist, 'en'))),
};

/* 1 ---------------------------------------------------------------------- */
check(1, 'six routes exist in both locales', (fail) => {
  for (const locale of LOCALES) {
    for (const section of SECTIONS) {
      const file = pagePath(locale, section.slug);
      if (!existsSync(file)) fail(`missing ${relative(root, file)}`);
    }
  }
  return htmlByLocale.es.length >= 6 && htmlByLocale.en.length >= 6;
});

/* 2 ---------------------------------------------------------------------- */
check(2, 'generated pages declare the matching html lang', (fail) => {
  for (const locale of LOCALES) {
    for (const file of htmlByLocale[locale]) {
      const html = read(file);
      if (!html.includes(`<html lang="${locale}"`)) {
        fail(`${relative(root, file)} is missing lang="${locale}"`);
      }
    }
  }
  return true;
});

/* 3 ---------------------------------------------------------------------- */
check(3, 'navigation renders the six localized labels', (fail) => {
  for (const locale of LOCALES) {
    for (const section of SECTIONS) {
      const html = read(pagePath(locale, section.slug));
      for (const label of NAV_LABELS[locale]) {
        if (!html.includes(label)) {
          fail(`${locale}/${section.label} is missing nav label "${label}"`);
        }
      }
      const activeLinks = html.match(/aria-current="page"/g) ?? [];
      if (activeLinks.length < 1) fail(`${locale}/${section.label} has no active nav item`);
    }
  }
  return true;
});

/* 4 ---------------------------------------------------------------------- */
check(4, 'CV links match the page language and offer both options', (fail) => {
  for (const locale of LOCALES) {
    const expected = `${base}cv/${CV_FILES[locale]}`;
    const otherLocale = locale === 'es' ? 'en' : 'es';
    const foreign = `${base}cv/${CV_FILES[otherLocale]}`;

    for (const file of htmlByLocale[locale]) {
      const html = read(file);
      if (!html.includes(`href="${expected}"`)) {
        fail(`${relative(root, file)} does not link ${expected}`);
      }
      if (!new RegExp(`href="[^"]*${CV_FILES[locale]}"[^>]*download`).test(html)) {
        fail(`${relative(root, file)} link to ${CV_FILES[locale]} has no download attribute`);
      }

      /* The dual-language picker is the only place allowed to link both CVs. */
      const hasPicker = html.includes('data-cv-group');
      if (hasPicker) {
        if (!html.includes(`href="${foreign}"`)) {
          fail(`${relative(root, file)} has a CV picker without the ${otherLocale} CV`);
        }
        if (!new RegExp(`href="[^"]*${CV_FILES[otherLocale]}"[^>]*download`).test(html)) {
          fail(`${relative(root, file)} picker link to ${CV_FILES[otherLocale]} has no download attribute`);
        }
      } else if (html.includes(foreign)) {
        fail(`${relative(root, file)} links the other language CV (${foreign})`);
      }
    }
  }
  return true;
});

/* 5 ---------------------------------------------------------------------- */
check(5, 'contact page contains the real form and Web3Forms wiring', (fail) => {
  for (const locale of LOCALES) {
    const html = read(pagePath(locale, 'contact'));
    if (!html.includes('<form')) fail(`${locale} contact page has no <form> element`);
    if (!html.includes('data-contact-form')) fail(`${locale} contact page lacks data-contact-form`);
    if (!html.includes('data-endpoint')) fail(`${locale} contact page lacks data-endpoint`);
    if (!html.includes('https://api.web3forms.com/submit')) {
      fail(`${locale} contact page does not post to Web3Forms`);
    }
    if (!html.includes('name="access_key"')) fail(`${locale} contact page lacks the access_key field`);
    if (!html.includes('aria-live="polite"')) fail(`${locale} contact page lacks an aria-live region`);
    if (!html.includes('name="_gotcha"')) fail(`${locale} contact page lacks the honeypot field`);
  }
  return true;
});

/* 6 ---------------------------------------------------------------------- */
check(6, 'PDFs and placeholder SVGs exist', (fail) => {
  for (const locale of LOCALES) {
    const file = join(root, 'public', 'cv', CV_FILES[locale]);
    if (!existsSync(file)) {
      fail(`missing public/cv/${CV_FILES[locale]}`);
      continue;
    }
    const head = readFileSync(file).subarray(0, 5).toString('latin1');
    if (head !== '%PDF-') fail(`public/cv/${CV_FILES[locale]} does not start with %PDF`);
    const tail = readFileSync(file).subarray(-16).toString('latin1').trimEnd();
    if (!tail.endsWith('%%EOF')) fail(`public/cv/${CV_FILES[locale]} does not end with %%EOF`);
  }
  for (const name of IMAGE_FILES) {
    if (!existsSync(join(root, 'public', 'images', name))) fail(`missing public/images/${name}`);
  }
  if (!existsSync(join(root, 'public', 'favicon.svg'))) fail('missing public/favicon.svg');
  return true;
});

/* 7 ---------------------------------------------------------------------- */
check(7, 'no emoji codepoints in generated HTML', (fail) => {
  for (const file of htmlFiles) {
    const html = read(file);
    const match = html.match(EMOJI_PATTERN);
    if (match) {
      fail(`${relative(root, file)} contains ${JSON.stringify(match[0])} (U+${match[0].codePointAt(0).toString(16).toUpperCase()})`);
    }
  }
  return true;
});

/* 8 ---------------------------------------------------------------------- */
check(8, 'language switcher keeps the same section', (fail) => {
  const cases = [
    { locale: 'es', slug: 'projects', targetHref: `${base}en/projects/` },
    { locale: 'en', slug: 'skills', targetHref: `${base}es/skills/` },
  ];

  for (const item of cases) {
    const html = read(pagePath(item.locale, item.slug));
    if (!html.includes(`href="${item.targetHref}"`)) {
      fail(`${item.locale}/${item.slug} switcher does not link ${item.targetHref}`);
    }
    if (!html.includes('aria-current="true"')) {
      fail(`${item.locale}/${item.slug} switcher does not mark the active locale`);
    }
  }
  return true;
});

/* 9 ---------------------------------------------------------------------- */
check(9, 'internal links and asset URLs respect the base path', (fail) => {
  const attribute = /(?:href|src)="([^"]*)"/g;
  const skipped = /^(?:https?:)?\/\/|^mailto:|^tel:|^#|^data:|^javascript:/i;

  for (const file of htmlFiles) {
    const html = read(file);
    for (const match of html.matchAll(attribute)) {
      const value = match[1];
      if (!value || skipped.test(value)) continue;
      if (!value.startsWith('/')) {
        fail(`${relative(root, file)} has a relative URL "${value}" (must be base-path aware)`);
        continue;
      }
      if (!value.startsWith(base)) {
        fail(`${relative(root, file)} has "${value}" outside the base path "${base}"`);
      }
    }
  }
  return true;
});

/* ----------------------------------------------------------------- report */

let failures = 0;

for (const result of results) {
  const label = `${result.id}/${results.length}`;
  if (result.passed && result.details.length === 0) {
    console.log(`PASS ${label} ${result.title}`);
    continue;
  }
  failures += 1;
  console.log(`FAIL ${label} ${result.title}`);
  for (const detail of result.details) console.log(`       - ${detail}`);
}

console.log('');
console.log(
  failures === 0
    ? `All ${results.length} checks passed (base path: ${base}).`
    : `${failures} of ${results.length} checks failed (base path: ${base}).`,
);

process.exit(failures === 0 ? 0 : 1);
