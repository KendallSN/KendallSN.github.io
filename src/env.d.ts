/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Web3Forms Access Key used by the contact form. Public by design. */
  readonly PUBLIC_WEB3FORMS_ACCESS_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
