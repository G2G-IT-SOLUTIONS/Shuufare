/// <reference types="vite/client" />

declare module "*.png" {
  const src: string;
}
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}