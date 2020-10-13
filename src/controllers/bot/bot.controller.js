const ClientController = require('../client/client.controller')

class BotController {
  constructor (dependencies) {
    this._dependencies = dependencies
    this._utilities = dependencies.utilities
    this._console = dependencies.console
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
    const products = await this.client.getAllProducts()
    const navigationLinks = await this.client.getAllNavigationLinks()
    this._console.info(products)
    this._console.info(navigationLinks)
  }
}

module.exports = BotController
