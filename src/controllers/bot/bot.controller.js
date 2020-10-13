const ClientController = require('../client/client.controller')

class BotController {
  constructor (dependencies) {
    this._dependencies = dependencies
    this._utilities = dependencies.utilities
    this._controllers = dependencies.controllers
  }

  async setupBot () {
    this.client = new ClientController({
      ...this._dependencies,
      ...{
        browserSelectors: this._dependencies.config.BROWSER_PAGE_SELECTORS,
        browserPlugins: this._dependencies.config.BROWSER_PAGE_PLUGINS,
        browserConfig: {
          maxNavigationPages: this._dependencies.config.BROWSER_PAGE_MAX_NAVIGATION_PAGES,
          browserOptions: this._dependencies.config.BROWSER_OPTIONS
        }
      }
    })

    await this.client.setupClient()
  }

  async startScrapping () {
    await this.client.startSession()
  }
}

module.exports = BotController
