// @ts-check

import { unified } from "@astrojs/markdown-remark"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig, fontProviders } from "astro/config"
import expressiveCode from "astro-expressive-code"
import rehypeSlug from "rehype-slug"

// https://astro.build/config
export default defineConfig({
  site: "https://arkhins.com",
  session: false,

  integrations: [expressiveCode(), mdx(), sitemap()],

  vite: {
    plugins: [tailwindcss()],

    resolve: {
      tsconfigPaths: true,
    },
  },

  image: {
    layout: "constrained",
  },

  prefetch: {
    defaultStrategy: "hover",
  },

  markdown: {
    processor: unified({
      rehypePlugins: [rehypeSlug],
    }),
  },

  experimental: {
    incrementalBuild: true,
  },

  fonts: [
    {
      name: "Lora",
      cssVariable: "--font-lora",
      provider: fontProviders.google(),
      display: "swap",
      weights: ["400 700"],
      styles: ["normal", "italic"],
    },
    {
      name: "IBM Plex Mono",
      cssVariable: "--font-ibm-plex-mono",
      provider: fontProviders.google(),
      display: "swap",
      weights: ["400", "600"],
      styles: ["normal"],
    },
    {
      name: "Fraunces",
      cssVariable: "--font-fraunces",
      provider: fontProviders.google(),
      display: "swap",
      weights: ["400 600"],
      styles: ["normal"],
    },
  ],
})
