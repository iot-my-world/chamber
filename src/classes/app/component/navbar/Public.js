const Base = require('./Base')

class PublicNavBar extends Base {

}

PublicNavBar.initialSelectors = [
  '#publicAppBar',
  '#publicNavTabBar',
  '#infoTab',
  '#contributorsTab',
  '#loginForgotPasswordTab',
  '#termsConditionsAndPrivacyTab'
]

/**
 * Create New NavBar class instance
 * and return after initialisation
 * @param {Page} page
 * @returns {Promise<PublicNavBar>}
 */
async function newNavBar(page) {
  const newNavBar = new PublicNavBar(page)
  await newNavBar.initialise()
  return newNavBar
}

module.exports = newNavBar