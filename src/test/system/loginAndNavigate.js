const {SystemPartyType} = require('../../brain/party/types')
const {newAppSession} = require('../../classes/utility/session/App')

async function loginAndNavigateTest() {
  // total amount of time allowed for test
  this.timeout(150000)

  // create and log into session
  const systemAppSession = await newAppSession(
    browser, iotMyWorldURL,
    'root', '12345', SystemPartyType,
  )

  // await systemSession.sidebar.selectViewCompanyConfiguration()
  // await systemSession.sidebar.selectViewClientConfiguration()
  // await systemSession.sidebar.selectViewUserConfiguration()
  // await systemSession.sidebar.selectViewDeviceConfiguration()
  // await systemSession.sidebar.selectViewLiveTrackingDashboard()
  // await systemSession.sidebar.selectViewHistoricalTrackingDashboard()
  //
  // await systemSession.end()
}

module.exports.loginAndNavigateTest = loginAndNavigateTest
