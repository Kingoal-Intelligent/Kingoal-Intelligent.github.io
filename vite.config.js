import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"
import { sitePlugin } from "./src/vite-plugin-site.js"

const root = dirname(fileURLToPath(import.meta.url))

// GitHub Pages project sites are served from /<repo>/. Leave unset for local dev and for a user site at /.
function pagesBase() {
  const value = process.env.PAGES_BASE || "/"
  if (value === "/") return "/"
  const withLeadingSlash = value.startsWith("/") ? value : `/${value}`
  return withLeadingSlash.endsWith("/") ? withLeadingSlash : `${withLeadingSlash}/`
}

export default defineConfig({
  base: pagesBase(),
  appType: "mpa",
  plugins: [sitePlugin()],
  build: {
    rollupOptions: {
      input: {
        enHome: resolve(root, "index.html"),
        enAbout: resolve(root, "about.html"),
        enServices: resolve(root, "services.html"),
        enContact: resolve(root, "contact.html"),
        enProduct: resolve(root, "product.html"),
        zhHome: resolve(root, "zh/index.html"),
        zhAbout: resolve(root, "zh/about.html"),
        zhServices: resolve(root, "zh/services.html"),
        zhContact: resolve(root, "zh/contact.html"),
        zhProduct: resolve(root, "zh/product.html"),
      },
    },
  },
})
