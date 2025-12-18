;(function () {
  const getCurrentScriptUrl = () => {
    const cs = document.currentScript
    if (cs && cs.src) return cs.src

    const scripts = document.getElementsByTagName('script')
    for (let i = scripts.length - 1; i >= 0; i--) {
      const el = scripts[i]
      const src = el.getAttribute('src') || el.src
      if (src) return new URL(src, document.baseURI).href
    }

    return ''
  }

  const resolveSiblingUrl = (relativePath) => {
    const scriptUrl = getCurrentScriptUrl()
    if (!scriptUrl) return relativePath
    return new URL(relativePath, scriptUrl).href
  }

  const injectCss = (href) => {
    if (!href) return
    if (document.querySelector('link[data-butterpop-css="true"]')) return

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = href
    link.setAttribute('data-butterpop-css', 'true')
    document.head.appendChild(link)
  }

  injectCss(resolveSiblingUrl('./butterpop.min.css'))
})()
