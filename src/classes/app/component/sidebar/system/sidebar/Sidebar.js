const {TimeoutError} = require('puppeteer/Errors')
const SidebarBase = require('../../base/Sidebar')
const newHomeView = require('../../../../view/home/system/home/Home')
const newClientConfigurationView = require('../../../../view/configuration/client/Client')
const newCompanyConfigurationView = require('../../../../view/configuration/company/Company')
const newUserConfigurationView = require('../../../../view/configuration/user/User')

/**
 * system sidebar component class
 * defines system party specific
 * sidebar functionality
 */
class Sidebar extends SidebarBase {
  constructor(page) {
    super(page)
    this.configurationMenuOpen = false
    this.dashboardMenuOpen = false
  }

  async openConfigurationMenu() {
    if (this.configurationMenuOpen) {
      throw new Error('client configuration menu already open')
    }
    await this.click(Sidebar.CompanyConfigurationMenuOpen)
    await this.waitForVisible(Sidebar.ClientConfigurationLinkID)
    await this.waitForVisible(Sidebar.CompanyConfigurationLinkID)
    await this.waitForVisible(Sidebar.UserConfigurationLinkID)
    this.configurationMenuOpen = true
  }

  async openDashboardsMenu() {
    if (this.dashboardMenuOpen) {
      throw new Error('dashboards menu already open')
    }
    await this.click(Sidebar.DashboardsMenuOpen)
    await this.waitForVisible(Sidebar.LiveTrackingDashboardLinkID)
    await this.waitForVisible(Sidebar.HistoricalTrackingDashboardLinkID)
    this.dashboardMenuOpen = true
  }

  async selectViewCompanyConfiguration() {
    if (!this.configurationMenuOpen) {
      await this.openConfigurationMenu()
    }
    await this.click(Sidebar.CompanyConfigurationLinkID)
    return await newCompanyConfigurationView(this.page)
  }

  async selectViewClientConfiguration() {
    if (!this.configurationMenuOpen) {
      await this.openConfigurationMenu()
    }
    await this.click(Sidebar.ClientConfigurationLinkID)
    return await newClientConfigurationView(this.page)
  }

  async selectViewUserConfiguration() {
    if (!this.configurationMenuOpen) {
      await this.openConfigurationMenu()
    }
    await this.click(Sidebar.UserConfigurationLinkID)
    return await newUserConfigurationView(this.page)
  }

  async selectViewHome() {
    try {
      // click on the home page link in the sidebar
      await this.click(Sidebar.homePageLinkID)

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
Sidebar.homePageLinkID = '#sidebarHomeLink'

Sidebar.CompanyConfigurationMenuOpen = '#sidebarConfigurationMenuOpen'
Sidebar.CompanyConfigurationLinkID = '#sidebarCompanyConfigurationLink'
Sidebar.ClientConfigurationLinkID = '#sidebarClientConfigurationLink'
Sidebar.UserConfigurationLinkID = '#sidebarUserConfigurationLink'
Sidebar.DeviceConfigurationLinkID = '#sidebarDeviceConfigurationLink'

Sidebar.DashboardsMenuOpen = '#sidebarDashboardsMenuOpen'
Sidebar.LiveTrackingDashboardLinkID = '#sidebarLiveTrackingDashboardLink'
Sidebar.HistoricalTrackingDashboardLinkID = '#sidebarHistoricalTrackingDashboardLink'

/**
 * a list of selectors (e.g. IDs, className etc) which need to be
 * visible for this class to be able to work.
 * @type {string[]}
 */
Sidebar.initialSelectors = [
  ...SidebarBase.initialSelectors,
  Sidebar.homePageLinkID,
  Sidebar.CompanyConfigurationMenuOpen,
  Sidebar.DashboardsMenuOpen,
]

/**
 * Create New Sidebar component class instance
 * return instance after initialisation
 * @param page
 * @returns {Promise<Sidebar>}
 */
async function newSidebar(page) {
  const newSidebar = new Sidebar(page)
  await newSidebar.initialise()
  return newSidebar
}

module.exports = newSidebar
