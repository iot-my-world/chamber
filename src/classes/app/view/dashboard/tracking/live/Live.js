const ViewBase = require('../../../base/Base')
const newFullPageLoader = require('../../../../component/loader/fullPage/FullPage')

class Live extends ViewBase {
  constructor(page) {
    super(page)
    this._fullPageLoader = null
  }

  async initialise(timeout=4000){
    await super.initialise(timeout)
    this._fullPageLoader = await newFullPageLoader(this.page)
    await this._fullPageLoader.WaitForClose(10000)
  }
}

Live.liveTrackingDashboardRootID = '#liveTrackingDashboardRoot'

/**
 * a list of selectors (e.g. IDs, className etc) which need to be
 * visible for this class to be able to work.
 * @type {string[]}
 */
Live.initialSelectors = [
  ...ViewBase.initialSelectors,
  Live.liveTrackingDashboardRootID,
]

/**
 * Create New LiveConfiguration view class instance
 * return instance after initialisation
 * @param page
 * @returns {Promise<Live>}
 */
async function newLiveTrackingDashboardView(page) {
  const newHome = new Live(page)
  await newHome.initialise()
  return newHome
}

module.exports = newLiveTrackingDashboardView