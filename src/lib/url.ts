/**
 * Base-path aware URL helper.
 *
 * Every internal link and asset URL must be created through `toUrl` so the site
 * works both at the domain root (`BASE_PATH=/`) and under a project path
 * (`BASE_PATH=/repo-name`). The result never contains a double slash.
 */
export function toUrl(path = ''): string {
  const rawBase = import.meta.env.BASE_URL || '/';
  const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;
  const clean = path.replace(/^\/+/, '');
  return clean ? `${base}${clean}` : base;
}

/** Absolute URL for canonical/OG metadata, based on the configured site origin. */
export function toAbsoluteUrl(path: string, site: URL): string {
  return new URL(path.replace(/^\/+/, ''), new URL(import.meta.env.BASE_URL || '/', site)).href;
}
