const ViewBase = require('../Base')

class Contributors extends ViewBase {

}

Contributors.initialSelectors = [
  '#contributorsRoot',
]

/**
 * Create New Sidebar component class instance
 * return instance after initialisation
 * @param page
 * @returns {Promise<Contributors>}
 */
async function newContributorsView(page) {
  const newContributorsView = new Contributors(page)
  await newContributorsView.initialise()
  return newContributorsView
}

module.exports = newContributorsView

