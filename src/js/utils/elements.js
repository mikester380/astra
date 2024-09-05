export function buildDom(template) {
  const dom = {}

  Object.entries(template).forEach(([k, v]) => {
    if (isElement(v)) {
      return (dom[k] = v)
    }

    const e = document.querySelectorAll(v)
    dom[k] = e && e.length > 1 ? [...e] : e[0]
  })

  return dom
}

export function isElement(testValue) {
  return testValue instanceof HTMLElement
}
