import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: "https://github-agent-system-test.pages.dev",
  output: "server",
  adapter: cloudflare(),
});
