const {TimeoutError} = require('puppeteer/Errors')
const SidebarBase = require('../../sidebar/Sidebar')
const newHomeView = require('../../../view/system/home/Home')

/**
 * system sidebar component class
 * defines system party specific
 * sidebar functionality
 */
class Sidebar extends SidebarBase {
  constructor(page) {
    super(page)
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

/**
 * a list of selectors (e.g. IDs, className etc) which need to be
 * visible for this class to be able to work.
 * @type {string[]}
 */
Sidebar.initialSelectors = [
  ...SidebarBase.initialSelectors,
  Sidebar.homePageLinkID,
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
