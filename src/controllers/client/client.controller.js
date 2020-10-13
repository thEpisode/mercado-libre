const ScraperController = require('../scraper/scraper.controller')

class ClientController {
  constructor (dependencies) {
    this._dependencies = dependencies
    this._controllers = dependencies.controllers
    this._selectors = dependencies.browserSelectors
    this._config = dependencies.config
    this._browserSelectors = dependencies.browserSelectors
    this._browserPlugins = dependencies.browserPlugins
    this._browserConfig = dependencies.browserConfig
    this._root = dependencies.root
    this._path = dependencies.path
  }

  async setupClient () {
    this.browser = await this._dependencies.puppeteer.launch(this._config.browserOptions)

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
    this.scripts = this._browserPlugins.map(script => {
      script.data = this._dependencies.fs.readFileSync(this._path.join(this._root, script.path), 'utf8')
      return script
    })
  }

  createScraper () {
    this.scraper = new ScraperController({
      selectors: this.selectors,
      config: this.config,
      browser: this.browser,
      scripts: this.scripts
    })
    return this.scraper
  }

  async startSession () {
    await this.scraper.startSession()
  }
}

module.exports = ClientController
