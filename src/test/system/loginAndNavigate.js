const { SystemPartyType } = require('../../constants/party')
const Session = require('../../classes/utility/session')

async function loginAndNavigateTest () {
  // total amount of time allowed for test
  this.timeout(150000)

  // create and log into session
  const systemSession = new Session(browser, tbdURL)
  await systemSession.login('root', '12345', SystemPartyType)

  await systemSession.sidebar.selectViewCompanyConfiguration()
  await systemSession.sidebar.selectViewClientConfiguration()

  await systemSession.end()
}

module.exports.loginAndNavigateTest = loginAndNavigateTest
