/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Formspree-compatible endpoint used by the contact form. Safe to expose. */
  readonly PUBLIC_CONTACT_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
