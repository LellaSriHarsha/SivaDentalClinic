// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// GitHub Pages is a static host: it cannot render HTML per request and it cannot
// run the /api/appointment-check server route. Setting GITHUB_PAGES=true makes the
// production build prerender the site into plain files in .output/public.
// Regular Lovable and local builds keep the default SSR + Nitro output untouched.
const isGitHubPages = process.env["GITHUB_PAGES"] === "true";

// A repository site is served from https://<owner>.github.io/<repo>/, so every
// asset URL needs that prefix. The workflow passes BASE_PATH; local builds use "/".
const rawBase = process.env["BASE_PATH"] ?? "/";
const base = rawBase.endsWith("/") ? rawBase : `${rawBase}/`;
const routerBasepath = base === "/" ? "/" : base.replace(/\/$/, "");

export default defineConfig({
  vite: isGitHubPages ? { base } : {},
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(isGitHubPages
      ? {
          // Fully prerender the single page route so index.html ships real content
          // (good for SEO and for visitors before JS loads). The workflow copies it
          // to 404.html so deep links still land on the site instead of GitHub's 404.
          prerender: { enabled: true, crawlLinks: true, retryCount: 1 },
          router: { basepath: routerBasepath },
        }
      : {}),
  },
});
