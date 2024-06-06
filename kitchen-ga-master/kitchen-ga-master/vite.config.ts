import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import { vercelPreset } from '@vercel/remix/vite';
installGlobals();

export default defineConfig({
  plugins: [remix({
    ignoredRouteFiles: [".scss"],
    presets: [vercelPreset()]
  }), tsconfigPaths()],
  envPrefix: "MIX_",
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./app/_mantine";`,
      },
    },
  },
});
