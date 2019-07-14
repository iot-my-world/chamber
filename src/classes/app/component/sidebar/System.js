const {TimeoutError} = require('puppeteer/Errors')
const SidebarBase = require('./Base')
const newHomeView = require('../../view/app/home/System')
// const newClientConfigurationView = require(
//   'classes/app/view/app/configuration/Client')
// const newCompanyConfigurationView = require(
//   'classes/app/view/app/configuration/Company')
// const newUserConfigurationView = require(
//   'classes/app/view/app/configuration/User')

/**
 * system sidebar component class
 * defines system party specific
 * sidebar functionality
 */
class System extends SidebarBase {
  constructor(page) {
    super(page)
    this.configurationMenuOpen = false
  }

  async openConfigurationMenu() {
    if (this.configurationMenuOpen) {
      throw new Error('client configuration menu already open')
    }
    await this.click(System.CompanyConfigurationMenuOpen)
    await this.waitForVisible(System.ClientConfigurationLinkID)
    await this.waitForVisible(System.CompanyConfigurationLinkID)
    await this.waitForVisible(System.UserConfigurationLinkID)
    this.configurationMenuOpen = true
  }

  async selectViewCompanyConfiguration() {
    if (!this.configurationMenuOpen) {
      await this.openConfigurationMenu()
    }
    await this.click(System.CompanyConfigurationLinkID)
    // return await newCompanyConfigurationView(this.page)
  }

  async selectViewClientConfiguration() {
    if (!this.configurationMenuOpen) {
      await this.openConfigurationMenu()
    }
    await this.click(System.ClientConfigurationLinkID)
    /*return await newClientConfigurationView(this.page)*/
  }

  async selectViewUserConfiguration() {
    if (!this.configurationMenuOpen) {
      await this.openConfigurationMenu()
    }
    await this.click(System.UserConfigurationLinkID)
    // return await newUserConfigurationView(this.page)
  }

  async selectViewHome() {
    try {
      // click on the home page link in the sidebar
      await this.click(System.homePageLinkID)

      // return an instance of the home view
      return await newHomeView(this.page)
    } catch (e) {
      if (e instanceof TimeoutError) {
        console.error(`timeout occurred while trying to select home view`)
        throw e
      } else {
        console.error(`unknown error occurred trying to select home view: ${e}`)
        throw new Error(
          `unknown error occurred trying to select home view: ${e}`)
      }
    }
  }

}

// other sidebar link ids
System.homePageLinkID = '#sidebarHomeLink'

System.CompanyConfigurationMenuOpen = '#sidebarConfigurationMenuOpen'
System.CompanyConfigurationLinkID = '#sidebarCompanyConfigurationLink'
System.ClientConfigurationLinkID = '#sidebarClientConfigurationLink'
System.UserConfigurationLinkID = '#sidebarUserConfigurationLink'

/**
 * a list of selectors (e.g. IDs, className etc) which need to be
 * visible for this class to be able to work.
 * @type {string[]}
 */
System.initialSelectors = [
  ...SidebarBase.initialSelectors,
  System.homePageLinkID,
  System.CompanyConfigurationMenuOpen,
]

/**
 * Create New Sidebar component class instance
 * return instance after initialisation
 * @param page
 * @returns {Promise<System>}
 */
async function newSidebar(page) {
  const newSidebar = new System(page)
  await newSidebar.initialise()
  return newSidebar
}

module.exports = newSidebar
