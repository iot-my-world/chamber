const ViewBase = require('../../base/Base')

class Home extends ViewBase {
  constructor(page) {
    super(page)
  }
}

Home.systemHomeID = '#systemHomeRoot'

/**
 * a list of selectors (e.g. IDs, className etc) which need to be
 * visible for this class to be able to work.
 * @type {string[]}
 */
Home.initialSelectors = [
  ...ViewBase.initialSelectors,
  Home.systemHomeID,
]

/**
 * Create New Home view class instance
 * return instance after initialisation
 * @param page
 * @returns {Promise<Home>}
 */
async function newHome(page) {
  const newHome = new Home(page)
  await newHome.initialise()
  return newHome
}

module.exports = newHome