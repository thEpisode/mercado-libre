const BotController = require('../../controllers/bot/bot.controller')

function scrappingFunction (dependencies) {
  /* Dependencies */
  const _console = dependencies.console
  let bot = {}

  const run = async _ => {
    scrapping()
  }

  const scrapping = async () => {
    try {
      _console.info('Executing scrapper function')

      bot = new BotController(dependencies)
      await bot.setupBot()
      bot.startScrapping()
    } catch (error) {
      _console.error(error)
    }
  }

  return {
    run
  }
}

module.exports = scrappingFunction
