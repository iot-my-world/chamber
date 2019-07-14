const PublicSession = require('../../classes/utility/session/Public')

async function navigateTest() {
  // total amount of time allowed for test
  this.timeout(150000)

  const publicSession = new PublicSession(browser, iotMyWorldURL)

  await publicSession.start()

  // await publicSession.page.waitForSelector('#publicPageRoot')
  // await publicSession.page.waitForSelector('#infoTab')
  // await publicSession.page.waitForSelector('#contributorsTab')
  // await publicSession.page.waitForSelector('#loginForgotPasswordTab')
  //
  // await publicSession.page.click('#infoTab')
  // await publicSession.page.click('#contributorsTab')
  // await publicSession.page.click('#loginForgotPasswordTab')
}

module.exports.navigateTest = navigateTest