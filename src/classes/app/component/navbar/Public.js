const Base = require('./Base')

class PublicNavBar extends Base {

}

PublicNavBar.InfoTabID = '#infoTab'
PublicNavBar.ContributorsTabID = '#contributorsTab'
PublicNavBar.LoginForgotPasswordTabID = '#loginForgotPasswordTab'
PublicNavBar.TermsConditionsAndPrivacyTabID = '#termsConditionsAndPrivacyTab'

PublicNavBar.initialSelectors = [
  '#publicAppBar',
  '#publicNavTabBar',
  PublicNavBar.InfoTabID,
  PublicNavBar.ContributorsTabID,
  PublicNavBar.LoginForgotPasswordTabID,
  PublicNavBar.TermsConditionsAndPrivacyTabID,
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