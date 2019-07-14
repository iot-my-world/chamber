const ViewBase = require('../../Base')

class System extends ViewBase {
  constructor(page) {
    super(page)
  }
}

System.systemHomeID = '#systemHomeRoot'

/**
 * a list of selectors (e.g. IDs, className etc) which need to be
 * visible for this class to be able to work.
 * @type {string[]}
 */
System.initialSelectors = [
  ...ViewBase.initialSelectors,
  System.systemHomeID,
]

/**
 * Create New Home view class instance
 * return instance after initialisation
 * @param page
 * @returns {Promise<System>}
 */
async function newHome(page) {
  const newHome = new System(page)
  await newHome.initialise()
  return newHome
}

module.exports = newHome