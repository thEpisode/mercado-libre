class ScraperController {
  constructor (dependencies) {
    this._dependencies = dependencies
    this._console = this._dependencies.console
    this._browser = dependencies.browser
    this._browserInstance = dependencies.browserInstance
  }

  async startSession () {
    this._console.info('Starting session...')
    this.context = await this._browserInstance.createIncognitoBrowserContext()
    this.page = await this.context.newPage()

    await this.page.evaluateOnNewDocument(() => {
      window.navigator = {}
    })
    await this.page.goto(`${this._browser.origin}${this._browser.query}`)
    await this.page.waitForSelector(this._browser.selectors.PAGE_LOGO, { visible: true })

    this.injectClientScripts()
  }

  async injectClientScripts () {
    this._browser.scripts.map(async script => {
      await this.page.evaluate(script.data)
    })
  }

  async navigateToNextPage (href) {
    if (!href) {
      return
    }

    await this.page.goto(href)
    this.injectClientScripts()
    return this.page.waitForSelector(this._browser.selectors.PAGE_LOGO, { visible: true })
  }

  async getAllProducts () {
    const script = `window.BotBus.getAllProducts('${this._browser.selectors.PRODUCT_ITEM_CONTAINER}', '${this._browser.selectors.PRODUCT_ITEM_TITLE}', '${this._browser.selectors.PRODUCT_ITEM_PRICE}')`
    this._console.info('Getting products...')
    return this.page.evaluate(script)
  }

  async getAllNavigationLinks () {
    const script = `window.BotBus.getAllNavigationLinks('${this._browser.selectors.PAGE_NAVIGATION_ITEMS}', ${this._browser.config.maxNavigationPages})`
    this._console.info('Getting navigation links...')
    return this.page.evaluate(script)
  }
}

module.exports = ScraperController
