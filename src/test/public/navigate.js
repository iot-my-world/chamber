const PublicSession = require('../../classes/utility/session/Public')

async function navigateTest() {
  // total amount of time allowed for test
  this.timeout(150000)

  const publicSession = new PublicSession(browser, iotMyWorldURL)

  await publicSession.start()

  await publicSession.navbar.selectViewInfo()
  await publicSession.navbar.selectViewContributors()
  await publicSession.navbar.selectViewLoginForgotPassword()
  await publicSession.navbar.selectViewTermsConditionsAndPrivacy()
}

module.exports.navigateTest = navigateTest