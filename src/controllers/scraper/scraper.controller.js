class ScraperController {
  constructor (dependencies) {
    this._dependencies = dependencies
    this._utilities = dependencies.utilities
    this._controllers = dependencies.controllers
  }

  async startSession () {
    console.log('scrapping...')
  }
}

module.exports = ScraperController
