const PublicSession = require('../../classes/utility/session/Public')

async function navigateTest() {
  // total amount of time allowed for test
  this.timeout(150000)

  const publicSession = new PublicSession(browser, iotMyWorldURL)

  await publicSession.start()
}

module.exports.navigateTest = navigateTest