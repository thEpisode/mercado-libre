class DependenciesManager {
  constructor (args) {
    this._args = args
    this._dependencies = {}

    this.loadDependencies()
  }

  loadDependencies () {
    const root = this._args.root
    const events = require('events')
    const eventBus = new events.EventEmitter()
    const multerModule = require('multer')

    this._dependencies = {
      root,
      multerModule,
      eventBus,
      fs: require('fs'),
      path: require('path'),
      aesjs: require('aes-js'),
      moment: require('moment'),
      crypto: require('crypto'),
      config: require('config'),
      colors: require('colors/safe'),
      compress: require('compression')
    }

    this.importCustomDependencies()

    console.log(` ${this._dependencies.colors.green(`${this._dependencies.config.SERVER_NAME}:`)} Dependencies manager loaded`)
  }

  importCustomDependencies () {
    const dependencies = this._dependencies.config.CUSTOM_DEPENDENCIES

    if (!dependencies || !dependencies.length) {
      return
    }

    dependencies.map(customDependency => {
      this._dependencies[customDependency.name] = require(customDependency.package)
    })
  }

  getDependencies () {
    return this._dependencies
  }

  addCustomDependency (dependency, name) {
    this._dependencies[name] = dependency
  }

  get get () {
    return this.getDependencies
  }

  get core () {
    return {
      add: this.addCustomDependency.bind(this),
      get: this.getDependencies.bind(this)
    }
  }
}

module.exports = { DependenciesManager }
