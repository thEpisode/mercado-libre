const ScraperController = require('../scraper/scraper.controller')

class ClientController {
  constructor (dependencies) {
    this._dependencies = dependencies
    this._controllers = dependencies.controllers
    this._config = dependencies.config
    this._browser = dependencies.browser
    this._root = dependencies.root
    this._path = dependencies.path
  }

  async setupClient () {
    this._browserInstance = await this._dependencies.puppeteer.launch(this._browser.config.options)

    this.loadClientScripts()
    return this.createScraper()
  }

  updateConfig (config) {
    if (!config) {
      return
    }

    this.config = config
  }

  loadClientScripts () {
    this.scripts = this._browser.scripts.map(script => {
      script.data = this._dependencies.fs.readFileSync(this._path.join(this._root, script.path), 'utf8')
      return script
    })
  }

  createScraper () {
    this.scraper = new ScraperController(
      {
        ...this._dependencies,
        ...{
          browserInstance: this._browserInstance,
          browserScripts: this.scripts
        }
      })
    return this.scraper
  }

  async startSession () {
    await this.scraper.startSession()
  }

  async getAllProducts () {
    return this.scraper.getAllProducts()
  }

  async getAllNavigationLinks () {
    return this.scraper.getAllNavigationLinks()
  }
}

module.exports = ClientController
