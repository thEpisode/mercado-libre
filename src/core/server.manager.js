class ServerManager {
  constructor (args) {
    const { SettingsManager } = require('./settings.manager')
    const { ConsoleManager } = require('./console.manager')

    this._settings = new SettingsManager(args)
    this._console = new ConsoleManager(this._settings._dependencies.core.get())
  }

  async loadServer () {
    try {
      this.registerSettings()

      this.registerConsole()

      this.registerControllers()

      this.registerFunctions()

      this._console.success('Server manager loaded')

      this.executeStartupFunctions()

      return this._settings._dependencies.get()
    } catch (error) {
      console.log(error)
      process.exit()
    }
  }

  registerSettings () {
    this._settings._dependencies.core.add(this._settings, 'settings')
  }

  registerConsole () {
    this._settings._dependencies.core.add(this._console, 'console')
  }

  registerControllers () {
    const { ControllerManager } = require('./controller.manager')
    const _controllersManager = new ControllerManager(this._settings._dependencies.get())

    this._settings._dependencies.core.add(_controllersManager.controllers, 'controllers')
  }

  registerFunctions () {
    const { FunctionsManager } = require('./functions.manager')
    const _functionsManager = new FunctionsManager(this._settings._dependencies.get())

    this._settings._dependencies.core.add(_functionsManager.functions, 'functions')
  }

  executeStartupFunctions () {
    const functions = this._settings._dependencies.core.get().functions.startup
    for (const _function in functions) {
      functions[_function].run()
    }
  }

  normalizePort (val) {
    const port = parseInt(val, 10)

    if (isNaN(port)) return val
    if (port >= 0) return port

    return false
  }

  get settings () {
    return this._settings
  }
}

module.exports = { ServerManager }
