import "@fontsource/ibm-plex-sans/400.css"
import "@fontsource/ibm-plex-sans/500.css"
import "@fontsource/ibm-plex-sans/600.css"
import "@ibm/plex-sans-sc/fonts/split/woff2/hinted/IBMPlexSansSC-Regular.css"
import "@ibm/plex-sans-sc/fonts/split/woff2/hinted/IBMPlexSansSC-Medium.css"
import "@ibm/plex-sans-sc/fonts/split/woff2/hinted/IBMPlexSansSC-SemiBold.css"
import "./styles/main.css"

setupNav()
setupForm()
setupTabs()

function setupNav() {
  const button = document.querySelector("[data-nav-toggle]")
  const nav = document.querySelector("[data-site-nav]")
  if (!button || !nav || button.dataset.bound === "true") return
  button.dataset.bound = "true"
  const label = button.querySelector(".sr-only")
  const openLabel = button.dataset.openLabel
  const closeLabel = button.dataset.closeLabel

  const setOpen = (open) => {
    button.setAttribute("aria-expanded", String(open))
    nav.classList.toggle("is-open", open)
    document.body.classList.toggle("nav-open", open)
    if (label) label.textContent = open ? closeLabel : openLabel
  }

  button.addEventListener("click", () => {
    setOpen(button.getAttribute("aria-expanded") !== "true")
  })

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false)
  })

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false)
  })

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 960) setOpen(false)
  })
}

function setupForm() {
  const form = document.querySelector("[data-contact-form]")
  if (!form || form.dataset.bound === "true") return
  form.dataset.bound = "true"
  const messageNode = document.getElementById("form-messages")
  const success = document.querySelector("[data-form-success]")
  const alertBox = form.querySelector("[data-form-alert]")
  if (!messageNode || !success || !alertBox) return
  const messages = JSON.parse(messageNode.textContent)
  const fields = ["name", "organization", "phone", "email", "message"]

  form.addEventListener("input", (event) => {
    const field = event.target.closest(".field")
    if (!field) return
    clearField(field)
    if (!form.querySelector("[aria-invalid='true']")) alertBox.hidden = true
  })

  form.addEventListener("submit", (event) => {
    event.preventDefault()
    let valid = true
    for (const name of fields) {
      const input = form.elements[name]
      const error = validate(name, input.value, messages)
      const field = input.closest(".field")
      if (error) {
        valid = false
        showError(field, input, error)
      } else {
        clearField(field)
      }
    }
    if (!valid) {
      alertBox.hidden = false
      alertBox.textContent = messages.summary
      form.querySelector("[aria-invalid='true']")?.focus()
      return
    }
    form.hidden = true
    success.hidden = false
    success.querySelector("h2")?.focus()
  })
}

function validate(name, value, messages) {
  const text = value.trim()
  if (!text) return messages[name]
  if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) return messages.email
  if (name === "phone") {
    const digits = text.replace(/\D/g, "")
    const shape = /^[+()\d][\d\s().+-]*$/.test(text)
    if (!shape || digits.length < 7 || digits.length > 15) return messages.phone
  }
  return ""
}

function showError(field, input, message) {
  const error = field.querySelector(".field-error")
  error.hidden = false
  error.textContent = message
  input.setAttribute("aria-invalid", "true")
  const hint = field.querySelector(".field-hint")
  input.setAttribute("aria-describedby", hint ? `${hint.id} ${error.id}` : error.id)
}

function setupTabs() {
  document.querySelectorAll("[data-switch]").forEach((root) => {
    if (root.dataset.bound === "true") return
    root.dataset.bound = "true"
    const tabs = [...root.querySelectorAll('[role="tab"]')]

    const reveal = (tab) => {
      const scroller = tab.parentElement
      if (!scroller || scroller.scrollWidth <= scroller.clientWidth) return
      const pad = 8
      const left = tab.offsetLeft - pad
      const right = tab.offsetLeft + tab.offsetWidth + pad
      if (left < scroller.scrollLeft) scroller.scrollLeft = left
      else if (right > scroller.scrollLeft + scroller.clientWidth) {
        scroller.scrollLeft = right - scroller.clientWidth
      }
    }

    const select = (tab) => {
      for (const item of tabs) {
        const on = item === tab
        item.setAttribute("aria-selected", String(on))
        item.tabIndex = on ? 0 : -1
        const panel = document.getElementById(item.getAttribute("aria-controls"))
        panel.classList.toggle("is-active", on)
        panel.hidden = !on
      }
      reveal(tab)
      if (window.matchMedia("(max-width: 960px)").matches) {
        const active = document.getElementById(tab.getAttribute("aria-controls"))
        const box = active.getBoundingClientRect()
        if (box.top < 80 || box.bottom > window.innerHeight - 12) {
          active.scrollIntoView({ block: "nearest" })
        }
      }
    }

    for (const tab of tabs) {
      tab.addEventListener("click", () => select(tab))
    }

    root.addEventListener("keydown", (event) => {
      const key = event.key
      if (key !== "ArrowRight" && key !== "ArrowLeft" && key !== "ArrowDown" && key !== "ArrowUp") return
      const index = tabs.indexOf(document.activeElement)
      if (index < 0) return
      event.preventDefault()
      const forward = key === "ArrowRight" || key === "ArrowDown"
      let next = forward ? index + 1 : index - 1
      if (next < 0) next = tabs.length - 1
      if (next >= tabs.length) next = 0
      select(tabs[next])
      tabs[next].focus()
    })
  })
}

function clearField(field) {
  const input = field.querySelector("input, textarea")
  const error = field.querySelector(".field-error")
  error.hidden = true
  error.textContent = ""
  input.removeAttribute("aria-invalid")
  const hint = field.querySelector(".field-hint")
  if (hint) input.setAttribute("aria-describedby", hint.id)
  else input.removeAttribute("aria-describedby")
}
