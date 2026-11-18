import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';

/**
 * Normalize a base path so it always starts and ends with a single slash.
 * "" | "/" | "repo" | "/repo" | "/repo/" -> "/" or "/repo/"
 */
function normalizeBase(raw) {
  if (!raw) return '/';
  let base = String(raw).trim();
  if (!base) return '/';
  // Accept a full URL and keep only its pathname.
  base = base.replace(/^[a-z][a-z0-9+.-]*:\/\/[^/]+/i, '');
  base = base.replace(/\\/g, '/');
  if (!base.startsWith('/')) base = `/${base}`;
  if (!base.endsWith('/')) base = `${base}/`;
  base = base.replace(/\/{2,}/g, '/');
  return base;
}

const site = process.env.SITE_URL?.trim() || 'https://kendallsn.github.io';
const base = normalizeBase(process.env.BASE_PATH);

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  devToolbar: {
    enabled: false,
  },
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
});
