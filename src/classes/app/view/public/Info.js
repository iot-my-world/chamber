const ViewBase = require('../Base')

class Info extends ViewBase {

}

Info.initialSelectors = [
  '#infoRoot',
]

/**
 * Create New Sidebar component class instance
 * return instance after initialisation
 * @param page
 * @returns {Promise<Info>}
 */
async function newInfoView(page) {
  const newInfoView = new Info(page)
  await newInfoView.initialise()
  return newInfoView
}

module.exports = newInfoView

