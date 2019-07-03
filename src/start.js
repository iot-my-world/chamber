const puppeteer = require('puppeteer')
const {expect} = require('chai')
const {before, after} = require('mocha')

// preserve global variables state
const globalVariables = {
  browser: global.browser,
  expect: global.expect,
}

// puppeteer options
const opts = {
  // Whether to ignore HTTPS errors
  // during navigation. Defaults to false.

  // ignoreHTTPSErrors: true,

  // whether to open chromium or run test in memory
  headless: false,

  // Slows down Puppeteer operations by the
  // specified amount of milliseconds
  slowMo: 10,

  // Maximum time in milliseconds to wait for the browser instance to start.
  // Defaults to 30000 (30 seconds). Pass 0 to disable timeout.
  timeout: 10000,

  // To open the dev tools of chrome browser when test is running
  // devtools: true,

  // additional chrome command line switches
  // https://peter.sh/experiments/chromium-command-line-switches/
  args: [
    '--start-fullscreen',
    '--no-sandbox',
  ],

  defaultViewport: {
    width: 1440,
    height: 900,
  },
}

function parseCommandLineArgs() {
  let args = {
    environment: 'local',
    iotMyWorldURL: 'http://localhost:3000',
    sleepFactor: 1,
  }

  for (let cmdLineArg in process.env) {
    switch (cmdLineArg) {
      case 'ENVIRONMENT':
        switch (process.env[cmdLineArg]) {
          case 'build':
            args.iotMyWorldURL = 'http://localhost:5000'
            args.environment = 'build'
            break

          case 'local':
          default:
            args.environment = 'local'
            args.iotMyWorldURL = 'http://localhost:3000'
        }
        break

      case 'SLEEP_FACTOR':
        const sleepFactor = parseInt(process.env[cmdLineArg])
        if (isNaN(sleepFactor) || (sleepFactor === 0)) {
          console.error(
            `invalid sleepFactor command line argument: ${cmdLineArg}`)
          args.sleepFactor = 1
        } else {
          args.sleepFactor = Math.abs(sleepFactor)
        }

    }
  }

  return args
}

// controlled by mocha
// will run before any tests are run
// expose variables
before(async function() {
  this.timeout(10000)
  global.expect = expect
  const cmdLineArgs = parseCommandLineArgs()
  global.iotMyWorldURL = cmdLineArgs.iotMyWorldURL
  global.sleepFactor = cmdLineArgs.sleepFactor

  if (cmdLineArgs.environment === 'build') {
    opts.headless = true
  }

  global.browser = await puppeteer.launch(opts)
})

// controlled by mocha
// will run before any tests are run
// close browser and reset global variables
after(function() {
  browser.close()
  global.browser = globalVariables.browser
  global.expect = globalVariables.expect
})
