class BotBus {
  /**
   * Function to get all products formatted in JSON
   * @param {string} productContainerSelector is the product container to iterate over it
   * @param {string} titleSelector is the selector for product title or name
   * @param {string} priceSelector is the selector for price selector
   */
  getAllProducts (productContainerSelector, titleSelector, priceSelector) {
    const output = []
    const products = document.querySelectorAll(productContainerSelector)

    for (const product of products) {
      const productName = product.querySelector(titleSelector) || {}
      const productPrice = product.querySelector(priceSelector) || {}

      output.push({
        name: productName.innerText || '',
        price: productPrice.innerText || ''
      })
    }

    return JSON.stringify(output)
  }

  /**
   * Function to get all navigation links
   * @param {string} navigationItemSelector is the navigation item to iterate over it
   * @param {number} maxLengthNavigation is the maximum of pages to retrieve data
   */
  getAllNavigationLinks (navigationItemSelector, maxLengthNavigation) {
    const output = []
    const links = document.querySelectorAll(navigationItemSelector)
    maxLengthNavigation = maxLengthNavigation || 1
    // Prevent overflow indexes
    const maxLengthNavigationSanitized = maxLengthNavigation <= links.length ? maxLengthNavigation : links.length

    for (let i = 1; i < maxLengthNavigationSanitized; i++) {
      const link = links[i]
      // Prevent undefined access
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
