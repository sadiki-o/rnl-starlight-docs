// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "RNL",
      social: {
        github: "https://github.com/sadiki-o/react-navigable-list",
      },
    }),
    react(),
    mdx(),
    tailwind({
      // applyBaseStyles: false,
    }),
  ],
});
