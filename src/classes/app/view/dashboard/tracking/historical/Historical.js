const ViewBase = require('../../../base/Base')

class Historical extends ViewBase {
  constructor(page) {
    super(page)
  }
}

Historical.historicalTrackingDashboardRootID = '#historicalTrackingDashboardRoot'

/**
 * a list of selectors (e.g. IDs, className etc) which need to be
 * visible for this class to be able to work.
 * @type {string[]}
 */
Historical.initialSelectors = [
  ...ViewBase.initialSelectors,
  Historical.historicalTrackingDashboardRootID,
]

/**
 * Create New HistoricalConfiguration view class instance
 * return instance after initialisation
 * @param page
 * @returns {Promise<Historical>}
 */
async function newHistoricalTrackingDashboardView(page) {
  const newHome = new Historical(page)
  await newHome.initialise()
  return newHome
}

module.exports = newHistoricalTrackingDashboardView