const ViewBase = require('../../../base/Base')

class TK102 extends ViewBase {
  constructor(page) {
    super(page)
  }
}

TK102.tk102ConfigurationRootID = '#tk102ConfigurationRoot'

/**
 * a list of selectors (e.g. IDs, className etc) which need to be
 * visible for this class to be able to work.
 * @type {string[]}
 */
TK102.initialSelectors = [
  ...ViewBase.initialSelectors,
  TK102.tk102ConfigurationRootID,
]

/**
 * Create New TK102Configuration view class instance
 * return instance after initialisation
 * @param page
 * @returns {Promise<TK102>}
 */
async function newTK102ConfigurationView(page) {
  const newHome = new TK102(page)
  await newHome.initialise()
  return newHome
}

module.exports = newTK102ConfigurationView