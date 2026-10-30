import { renderDocument } from "./render.mjs"

const pages = new Set(["home", "product", "about", "services", "contact"])

function pageFrom(filename) {
  const file = filename.split("/").pop() || "index.html"
  return file === "index.html" ? "home" : file.replace(/\.html$/, "")
}

export function sitePlugin() {
  let base = "/"
  return {
    name: "site-html",
    configResolved(config) {
      base = config.base
    },
    transformIndexHtml: {
      order: "pre",
      handler(html, ctx) {
        const filename = String(ctx.filename || ctx.path || "").replaceAll("\\", "/")
        const page = pageFrom(filename)
        if (!pages.has(page)) return html
        const lang = filename.includes("/zh/") ? "zh" : "en"
        return renderDocument({ lang, page, base })
      },
    },
  }
}
