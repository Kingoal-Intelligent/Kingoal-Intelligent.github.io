import { getCopy, pathsFor, withBase } from "./copy.mjs"

const knownPages = new Set(["home", "product", "about", "services", "contact"])

export function renderDocument({ lang, page, base = "/" }) {
  if (!knownPages.has(page)) {
    throw new Error(`Unknown page: ${page}`)
  }
  const copy = getCopy(lang, base)
  const self = copy.paths
  const title = copy.pageTitles[page]
  const description = copy.descriptions[page]

  return `<!DOCTYPE html>
<html lang="${copy.site.htmlLang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="${esc(description)}" />
  <meta name="theme-color" content="#000000" />
  <title>${esc(title)}</title>
  <link rel="icon" href="/favicon.png" type="image/png" />
  <link rel="alternate" hreflang="en" href="${esc(pathsFor("en", base)[page])}" vite-ignore />
  <link rel="alternate" hreflang="zh-Hans" href="${esc(pathsFor("zh", base)[page])}" vite-ignore />
  <link rel="alternate" hreflang="x-default" href="${esc(pathsFor("en", base)[page])}" vite-ignore />
</head>
<body data-page="${page}">
  <a class="skip" href="#content">${esc(copy.skip)}</a>
  <div class="frame-main">
    ${header(copy, page, self)}
    <main id="content" tabindex="-1">
      ${pageBody(copy, page)}
    </main>
    ${footer(copy)}
  </div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>`
}

function pageBody(copy, page) {
  if (page === "home") return home(copy)
  if (page === "product") return product(copy)
  if (page === "about") return about(copy)
  if (page === "services") return services(copy)
  return contact(copy)
}

function home(copy) {
  const homeCopy = copy.home
  const preview = copy.services.items
  return `<div class="wrap">
    <section class="hero">
      ${kicker(homeCopy.kicker)}
      <h1>${esc(homeCopy.title)}</h1>
      <p class="lead">${esc(homeCopy.lead)}</p>
      <div class="actions">
        <a class="button" href="${esc(copy.paths.contact)}">${esc(homeCopy.primary)}</a>
        <a class="button button-secondary" href="${esc(copy.paths.product)}">${esc(homeCopy.secondary)}</a>
      </div>
    </section>
    <section class="section">
      ${kicker(homeCopy.roleKicker)}
      <h2>${esc(homeCopy.roleTitle)}</h2>
      <div class="split">
        <div>
          <h3>${esc(homeCopy.whoTitle)}</h3>
          ${blocks(homeCopy.who)}
        </div>
        <div>
          <h3>${esc(homeCopy.whatTitle)}</h3>
          ${blocks(homeCopy.what)}
        </div>
      </div>
    </section>
    <section class="section">
      ${kicker(homeCopy.servicesKicker)}
      <h2>${esc(homeCopy.servicesTitle)}</h2>
      <p class="section-lead">${esc(homeCopy.servicesLead)}</p>
      <div class="service-grid">
        ${preview
          .map(
            (item) => `<a class="service-card" href="${esc(copy.paths.services)}#${esc(item.id)}">
            <h3>${esc(item.title)}</h3>
            <p>${esc(item.text)}</p>
            <span class="more">${esc(homeCopy.details)}</span>
          </a>`,
          )
          .join("")}
      </div>
      <p class="end-link"><a href="${esc(copy.paths.services)}">${esc(homeCopy.allServices)}</a></p>
    </section>
    <section class="section">
      ${kicker(homeCopy.processKicker)}
      <h2>${esc(homeCopy.processTitle)}</h2>
      <ol class="steps">
        ${homeCopy.steps
          .map(
            (step) => `<li>
            <h3>${esc(step.title)}</h3>
            <p>${esc(step.text)}</p>
          </li>`,
          )
          .join("")}
      </ol>
    </section>
  </div>
  <aside class="close-band">
    <div class="wrap close-band-inner">
      <div>
        <h2>${esc(homeCopy.closeTitle)}</h2>
        <p class="lead">${esc(homeCopy.closeLead)}</p>
      </div>
      <a class="button" href="${esc(copy.paths.contact)}">${esc(homeCopy.closeAction)}</a>
    </div>
  </aside>`
}

function product(copy) {
  const productCopy = copy.product
  const secondary = productCopy.secondary
    ? `\n        <a class="button button-secondary" href="#capabilities">${esc(productCopy.secondary)}</a>`
    : ""
  const claims = productCopy.claims?.length
    ? `
    <section class="product-section" aria-label="${esc(productCopy.claimsLabel)}">
      <div class="claim-grid">
        ${productCopy.claims
          .map(
            (item) => `<article class="claim">
            <img src="/visionx/${esc(item.file)}" alt="${esc(item.alt)}">
            <div>
              <h2>${esc(item.title)}</h2>
              <p>${esc(item.text)}</p>
            </div>
          </article>`,
          )
          .join("")}
      </div>
    </section>`
    : ""
  return `<div class="wrap">
    <section class="hero">
      <img class="product-logo" src="/visionx/logo.svg" alt="" width="36" height="28">
      ${kicker(productCopy.kicker)}
      <h1>${esc(productCopy.title)}</h1>
      <p class="lead">${esc(productCopy.lead)}</p>
      <div class="actions">
        <a class="button" href="${esc(copy.paths.contact)}">${esc(productCopy.primary)}</a>${secondary}
      </div>
    </section>${claims}
    ${capabilityBlock(productCopy.capabilities)}
    ${valueBlock(productCopy.value)}
    <section class="product-section" id="extensions">
      ${productCopy.extensions.kicker ? kicker(productCopy.extensions.kicker) : ""}
      <h2>${esc(productCopy.extensions.title)}</h2>
      <ul class="ext-grid">
        ${productCopy.extensions.items
          .map(
            ([file, title]) => `<li>
            <img src="/visionx/${esc(file)}" alt="">
            <h3>${esc(title)}</h3>
          </li>`,
          )
          .join("")}
      </ul>
    </section>
  </div>
  <aside class="close-band">
    <div class="wrap close-band-inner">
      <div>
        ${kicker(productCopy.closeKicker)}
        <h2>${esc(productCopy.closeTitle)}</h2>
        <p class="lead">${esc(productCopy.closeLead)}</p>
      </div>
      <a class="button" href="${esc(copy.paths.contact)}">${esc(productCopy.closeAction)}</a>
    </div>
  </aside>`
}

function capabilityBlock(block) {
  const tabsLabel = block.tabsLabel ? ` aria-label="${esc(block.tabsLabel)}"` : ""
  return `<section class="product-section" id="capabilities" data-switch>
    ${block.kicker ? kicker(block.kicker) : ""}
    ${block.title ? `<h2>${esc(block.title)}</h2>` : ""}
    ${block.lead ? `<p class="section-lead">${esc(block.lead)}</p>` : ""}
    <div class="cap-layout">
      <div class="cap-tabs" role="tablist"${tabsLabel}>
        ${block.tabs
          .map((tab, index) => {
            const selected = index === 0
            return `<button type="button" role="tab" id="cap-tab-${esc(tab.id)}" aria-controls="cap-panel-${esc(tab.id)}" aria-selected="${selected}" tabindex="${selected ? "0" : "-1"}">
            <span class="tab-kicker">${esc(tab.kicker)}</span>
            <span class="tab-name">${esc(tab.name)}</span>
          </button>`
          })
          .join("")}
      </div>
      <div class="cap-panels">
        ${block.tabs
          .map((tab, index) => {
            const active = index === 0
            const note = tab.footnote ? `<p class="footnote">${esc(tab.footnote)}</p>` : ""
            return `<article class="cap-panel${active ? " is-active" : ""}" id="cap-panel-${esc(tab.id)}" role="tabpanel" aria-labelledby="cap-tab-${esc(tab.id)}"${active ? "" : " hidden"}>
            <div>
              <p class="panel-kicker">${esc(tab.panelKicker)}</p>
              <h3>${esc(tab.title)}</h3>
              <ul class="points">
                ${tab.points
                  .map(
                    ([title, text]) => `<li>
                    <strong>${esc(title)}</strong>
                    <span>${esc(text)}</span>
                  </li>`,
                  )
                  .join("")}
              </ul>
              ${note}
            </div>
            <img src="/visionx/${esc(tab.file)}" alt="${esc(tab.alt)}">
          </article>`
          })
          .join("")}
      </div>
    </div>
  </section>`
}

function valueBlock(block) {
  const tabsLabel = block.tabsLabel ? ` aria-label="${esc(block.tabsLabel)}"` : ""
  return `<section class="product-section" id="value" data-switch>
    ${block.kicker ? kicker(block.kicker) : ""}
    ${block.title ? `<h2>${esc(block.title)}</h2>` : ""}
    ${block.lead ? `<p class="section-lead">${esc(block.lead)}</p>` : ""}
    <div class="value-layout">
      <div class="value-tabs" role="tablist"${tabsLabel}>
        ${block.tabs
          .map((tab, index) => {
            const selected = index === 0
            return `<button type="button" role="tab" id="value-tab-${esc(tab.id)}" aria-controls="value-panel-${esc(tab.id)}" aria-selected="${selected}" tabindex="${selected ? "0" : "-1"}">
            <span class="tab-name">${esc(tab.name)}</span>
            <span class="tab-detail">${esc(tab.detail)}</span>
          </button>`
          })
          .join("")}
      </div>
      <div class="value-panels">
        ${block.tabs
          .map((tab, index) => {
            const active = index === 0
            return `<article class="value-panel${active ? " is-active" : ""}" id="value-panel-${esc(tab.id)}" role="tabpanel" aria-labelledby="value-tab-${esc(tab.id)}"${active ? "" : " hidden"}>
            <h3>${esc(tab.title)}</h3>
            <ul>
              ${tab.points.map((line) => `<li>${esc(line)}</li>`).join("")}
            </ul>
            <img src="/visionx/${esc(tab.file)}" alt="${esc(tab.alt)}">
          </article>`
          })
          .join("")}
      </div>
    </div>
  </section>`
}

function about(copy) {
  const aboutCopy = copy.about
  return `<div class="wrap page-end">
    ${pageHead(aboutCopy.kicker, aboutCopy.title)}
    <p class="demo-note">${esc(aboutCopy.demoNote)}</p>
    <div class="prose">
      ${aboutCopy.body.map((paragraph) => `<p>${esc(paragraph)}</p>`).join("")}
    </div>
    <section class="section">
      <h2>${esc(aboutCopy.roleTitle)}</h2>
      <div class="spec-grid specs-5">
        ${specCards(aboutCopy.roles)}
      </div>
    </section>
    <section class="section">
      <h2>${esc(aboutCopy.principlesTitle)}</h2>
      <ol class="principles">
        ${aboutCopy.principles
          .map(
            (item) => `<li>
            <h3>${esc(item.title)}</h3>
            <p>${esc(item.text)}</p>
          </li>`,
          )
          .join("")}
      </ol>
    </section>
    <section class="section">
      <h2>${esc(aboutCopy.teamTitle)}</h2>
      <p class="section-lead">${esc(aboutCopy.teamNote)}</p>
      <div class="spec-grid specs-3">
        ${specCards(aboutCopy.team)}
      </div>
    </section>
    <p class="end-link"><a class="button" href="${esc(copy.paths.contact)}">${esc(aboutCopy.cta)}</a></p>
  </div>`
}

function services(copy) {
  const servicesCopy = copy.services
  return `<div class="wrap page-end">
    ${pageHead(servicesCopy.kicker, servicesCopy.title)}
    <p class="section-lead">${esc(servicesCopy.lead)}</p>
    <div class="service-list">
      ${servicesCopy.items
        .map(
          (item) => `<article class="service-block" id="${esc(item.id)}">
          <h2>${esc(item.title)}</h2>
          <p>${esc(item.text)}</p>
          <p class="gets-label">${esc(servicesCopy.getsLabel)}</p>
          <ul class="get-list">
            ${item.gets.map((line) => `<li>${esc(line)}</li>`).join("")}
          </ul>
        </article>`,
        )
        .join("")}
    </div>
    <section class="engage">
      <h2>${esc(servicesCopy.engageTitle)}</h2>
      <p>${esc(servicesCopy.engageText)}</p>
      <p class="end-link"><a class="button" href="${esc(copy.paths.contact)}">${esc(servicesCopy.engageAction)}</a></p>
    </section>
  </div>`
}

function contact(copy) {
  const contactCopy = copy.contact
  const messages = JSON.stringify(contactCopy.messages).replaceAll("<", "\\u003c")
  return `<div class="wrap page-end">
    ${pageHead(contactCopy.kicker, contactCopy.title)}
    <p class="section-lead">${esc(contactCopy.lead)}</p>
    <div class="contact-layout">
      <div>
        <form class="form" data-contact-form novalidate>
          <p class="required-note">${esc(contactCopy.required)}</p>
          <div class="form-alert" data-form-alert role="alert" hidden></div>
          ${field("name", contactCopy.labels.name, "text", "name")}
          ${field("organization", contactCopy.labels.organization, "text", "organization")}
          ${field("phone", contactCopy.labels.phone, "tel", "tel", contactCopy.hints.phone)}
          ${field("email", contactCopy.labels.email, "email", "email")}
          ${area("message", contactCopy.labels.message, contactCopy.hints.message)}
          <button class="button" type="submit">${esc(contactCopy.submit)}</button>
        </form>
        <div class="form-success" data-form-success hidden>
          <h2 tabindex="-1">${esc(contactCopy.successTitle)}</h2>
          <p>${esc(contactCopy.successBody)}</p>
        </div>
        <script type="application/json" id="form-messages">${messages}</script>
      </div>
      <aside class="contact-facts" aria-label="${esc(contactCopy.factsTitle)}">
        <h2>${esc(contactCopy.factsTitle)}</h2>
        <ul class="fact-list">
          <li>
            <span class="fact-label">${esc(contactCopy.phone)}</span>
            <a href="${esc(copy.site.phoneHref)}">${esc(copy.site.phone)}</a>
          </li>
          <li>
            <span class="fact-label">${esc(contactCopy.email)}</span>
            <a href="mailto:${esc(copy.site.email)}">${esc(copy.site.email)}</a>
          </li>
          <li>
            <span class="fact-label">${esc(contactCopy.address)}</span>
            <span>${esc(copy.site.address)}</span>
          </li>
          <li>
            <span class="fact-label">${esc(contactCopy.hours)}</span>
            <span>${esc(copy.site.hours)}</span>
            <span class="fact-note">${esc(copy.site.hoursNote)}</span>
          </li>
        </ul>
      </aside>
    </div>
  </div>`
}

function field(name, label, type, autocomplete, hint) {
  const hintHtml = hint
    ? `<p class="field-hint" id="${name}-hint">${esc(hint)}</p>`
    : ""
  const described = hint ? ` aria-describedby="${name}-hint"` : ""
  return `<div class="field">
    <label for="${name}">${esc(label)}</label>
    <input id="${name}" name="${name}" type="${type}" autocomplete="${autocomplete}" aria-required="true"${described} />
    ${hintHtml}
    <p class="field-error" id="${name}-error" hidden></p>
  </div>`
}

function area(name, label, hint) {
  return `<div class="field">
    <label for="${name}">${esc(label)}</label>
    <textarea id="${name}" name="${name}" rows="5" autocomplete="off" aria-required="true" aria-describedby="${name}-hint"></textarea>
    <p class="field-hint" id="${name}-hint">${esc(hint)}</p>
    <p class="field-error" id="${name}-error" hidden></p>
  </div>`
}

function pageHead(kickerText, title) {
  return `<header class="page-head">
    ${kicker(kickerText)}
    <h1>${esc(title)}</h1>
  </header>`
}

function kicker(text) {
  return `<p class="kicker">${esc(text)}</p>`
}

function blocks(items) {
  return `<ul class="stack-list">
    ${items
      .map(
        (item) => `<li>
        <h3>${esc(item.title)}</h3>
        <p>${esc(item.text)}</p>
      </li>`,
      )
      .join("")}
  </ul>`
}

function specCards(items) {
  return items
    .map(
      (item) => `<article class="spec">
      <h3>${esc(item.title)}</h3>
      <p>${esc(item.text)}</p>
    </article>`,
    )
    .join("")
}

function header(copy, page, self) {
  const links = copy.pageIds
    .map((id) => {
      const current = id === page ? ` aria-current="page"` : ""
      return `<a href="${esc(self[id])}"${current}>${esc(copy.nav[id])}</a>`
    })
    .join("")
  return `<header class="site-header">
    <div class="wrap header-inner">
      <a class="brand" href="${esc(self.home)}">
        <img class="brand-mark" src="/brand/mark.png" alt="" width="41" height="36">
        <span class="brand-name">${esc(copy.site.name)}</span>
      </a>
      <nav id="site-nav" class="site-nav" data-site-nav aria-label="${esc(copy.primaryNav)}">
        ${links}
      </nav>
      <div class="header-tools">
        ${langSwitch(copy, page)}
        <button class="nav-toggle" type="button" data-nav-toggle aria-expanded="false" aria-controls="site-nav" data-open-label="${esc(copy.menuOpen)}" data-close-label="${esc(copy.menuClose)}">
          <span class="sr-only">${esc(copy.menuOpen)}</span>
          <span class="bar"></span>
          <span class="bar"></span>
        </button>
      </div>
    </div>
  </header>`
}

function langSwitch(copy, page) {
  const enHref = pathsFor("en", copy.base)[page]
  const zhHref = pathsFor("zh", copy.base)[page]
  return `<nav class="lang" aria-label="${esc(copy.langLabel)}">
    ${langItem("en", "EN", enHref, copy.lang === "en")}
    <span class="lang-slash" aria-hidden="true">/</span>
    ${langItem("zh-Hans", "中文", zhHref, copy.lang === "zh")}
  </nav>`
}

function langItem(langAttr, label, href, current) {
  if (current) {
    return `<span lang="${langAttr}" aria-current="true">${esc(label)}</span>`
  }
  return `<a href="${esc(href)}" lang="${langAttr}" hreflang="${langAttr}">${esc(label)}</a>`
}

function footer(copy) {
  const links = copy.pageIds
    .map((id) => `<a href="${esc(copy.paths[id])}">${esc(copy.nav[id])}</a>`)
    .join("")
  return `<footer class="site-footer">
    <div class="wrap footer-grid">
      <div>
        <p class="footer-name">${esc(copy.site.name)}</p>
        <p>${esc(copy.roleLine)}</p>
        <p>${esc(copy.site.address)}</p>
      </div>
      <div>
        <p><a href="${esc(copy.site.phoneHref)}">${esc(copy.site.phone)}</a></p>
        <p><a href="mailto:${esc(copy.site.email)}">${esc(copy.site.email)}</a></p>
      </div>
      <nav class="footer-nav" aria-label="${esc(copy.footerNav)}">${links}</nav>
    </div>
    <div class="wrap fine">
      <p>${esc(copy.finePrint)}</p>
      <p><a href="${esc(withBase(copy.base, "/licenses/IBM-Plex-OFL.txt"))}">${esc(copy.fontLicense)}</a></p>
    </div>
  </footer>`
}

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}
