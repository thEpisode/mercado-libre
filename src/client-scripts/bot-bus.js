class BotBus {
  getAllProducts (productContainerSelector, titleSelector, priceSelector) {
    const output = []
    const products = document.querySelectorAll(productContainerSelector)

    for (const product of products) {
      const productName = product.querySelector(titleSelector) || {}
      const productPrice = product.querySelector(priceSelector) || {}

      output.push({
        name: productName.innerText || '',
        priceSelector: productPrice.innerText || ''
      })
    }

    return JSON.stringify(output)
  }

  getAllNavigationLinks (navigationItemSelector, maxLengthNavigation) {
    const output = []
    const links = document.querySelectorAll(navigationItemSelector)
    maxLengthNavigation = maxLengthNavigation || 1
    const maxLengthNavigationSanitized = maxLengthNavigation <= links.length ? maxLengthNavigation : links.length

    for (let i = 1; i < maxLengthNavigationSanitized; i++) {
      const link = links[i]
      if (link) {
        output.push({
          href: link.href || ''
        })
      }
    }

    return JSON.stringify(output)
  }
}

(() => {
  window.BotBus = new BotBus()
})()
