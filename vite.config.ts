// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // GitHub Pages is static hosting, so prerender every app route and disable the server build.
  nitro: false,
  tanstackStart: {
    ssr: false,
    prerender: {
      enabled: true,
      routes: ["/", "/works", "/conclusion", "/talk"],
    },
  },
  vite: {
    // The repository is served from https://itsmeaya08.github.io/club-showcase-spectacle/
    base: "/club-showcase-spectacle/",
  },
});
