const ClientController = require('../client/client.controller')

class BotController {
  constructor (dependencies) {
    this._dependencies = dependencies
    this._utilities = dependencies.utilities
    this._console = dependencies.console
    this._controllers = dependencies.controllers
  }

  async setupBot () {
    this.client = new ClientController({
      ...this._dependencies,
      ...{
        browser: {
          selectors: this._dependencies.config.BROWSER_PAGE_SELECTORS,
          scripts: this._dependencies.config.BROWSER_PAGE_SCRIPTS,
          config: {
            maxNavigationPages: this._dependencies.config.BROWSER_PAGE_MAX_NAVIGATION_PAGES,
            options: this._dependencies.config.BROWSER_OPTIONS
          },
          origin: this._dependencies.config.BROWSER_PAGE_ORIGIN,
          query: this._dependencies.config.BROWSER_PAGE_QUERY
        }

      }
    })

    await this.client.setupClient()
  }

  async startScrapping () {
    await this.client.startSession()
    let products = []
    let navigationLinks = await this.client.getAllNavigationLinks()

    if (!navigationLinks) {
      return
    }

    navigationLinks = JSON.parse(navigationLinks)

    for (const navigationLink of navigationLinks) {
      let productsTmp = await this.client.getAllProducts()

      if (!productsTmp) {
        break
      }

      productsTmp = JSON.parse(productsTmp)

      // Merge Arrays in one with ES6 Array spread
      products = [...products, ...productsTmp]

      await this.client.navigateToNextPage(navigationLink.href)
    }

    this._console.info(`Found ${products.length} products in ${navigationLinks.length + 1} pages`)

    this.groupProducts(products)
  }

  groupProducts (products) {
    if (products.length <= 0) {
      return
    }

    const categories = [{ name: products[0].name, products: [] }]

    for (let i = 0; i < products.length; i++) {
      const product = products[i]

      for (let j = 0; j < categories.length; j++) {
        const category = categories[j]

        const distance = this._controllers.stringmatching.jaroWrinker(category.name, product.name)

        if (distance > 0.70) {
          category.products.push(product)
          break
        } else {
          categories.push({ name: product.name, products: [product] })
          break
        }
      }
    }

    console.log(categories)
  }
}

module.exports = BotController
