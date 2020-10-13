[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![GitHub license](https://img.shields.io/github/license/thepisode/beat.svg)](https://github.com/thepisode/beat/blob/master/LICENSE) 
[![npm](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/beat-cli)

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

# MeLi scrapping project

Project based on [Beat Open Source Project](https://github.com/thEpisode/beat) to speed up the development.

## Features

* Web Scrapping to Mercado Libre
* Fully configurable in /config/default.json
* String matching with [Jaro Wrinker](https://en.wikipedia.org/wiki/Jaro–Winkler_distance) proximity algorithm, is not perfect but is a good approach!
* Plug-in functions based (runs the scraper as a plugin)
* Some software design techniques and patterns applied, like, dependency injection, abstract factory, plug-in pattern
* Can be executed from remote servers with Docker, only deploy it and run on your cloud
* To start reading the scrapper, you need to locate the /src/functions/startup/scrapping.function.js


## Documentation

All code will be documented, but if you need to start to follow the code, please refer to app.js file

## License

The code is available under the [GNU GENERAL PUBLIC LICENSE](LICENSE).
