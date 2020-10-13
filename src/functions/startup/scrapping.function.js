const BotController = require('../../controllers/bot/bot.controller')

function scrappingFunction (dependencies) {
  /* Dependencies */
  const _console = dependencies.console
  let bot = {}

  const run = async (data) => {
    scrapping()
  }

  const scrapping = async (data) => {
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
    run,
    scrapping
  }
}

module.exports = scrappingFunction
