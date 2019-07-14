const Base = require('./Base')
const newInfoView = require('../../view/public/Info')
const newContributorsView = require('../../view/public/Contributors')

class PublicNavBar extends Base {
  async selectViewInfo() {
    await this.click(PublicNavBar.InfoTabID)
    return await newInfoView(this.page)
  }

  async selectViewContributors() {
    await this.click(PublicNavBar.ContributorsTabID)
    return await newContributorsView(this.page)
  }
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