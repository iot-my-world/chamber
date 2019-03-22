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
  // args: [
  //     e.g. '--start-fullscreen',
  // ]
  args: [
    `--window-size=1920,1080`,
  ],

  defaultViewport: {
    width: 1920,
    height: 1080,
  },
}

function parseCommandLineArgs() {
  let args = {
    tbdURL: 'http://localhost:3000',
    sleepFactor: 1,
  }

  console.log('this is srunnng!!')

  for (let cmdLineArg in process.env) {
    switch (cmdLineArg) {
      case 'ENVIRONMENT':
        switch (process.env[cmdLineArg]) {
          case 'server':
            args.tbdURL = 'https://spotnav.net'
            break

          case 'local':
          default:
            args.tbdURL = 'http://localhost:3000'
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
  global.browser = await puppeteer.launch(opts)

  const cmdLineArgs = parseCommandLineArgs()
  global.tbdURL = cmdLineArgs.tbdURL
  global.sleepFactor = cmdLineArgs.sleepFactor
})

// controlled by mocha
// will run before any tests are run
// close browser and reset global variables
after(function() {
  browser.close()
  global.browser = globalVariables.browser
  global.expect = globalVariables.expect
})
