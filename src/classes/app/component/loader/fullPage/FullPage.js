const ComponentBase = require('../../base/Base')

class FullPage extends ComponentBase {
  constructor(page) {
    super(page)
  }

  async WaitForClose(timeout = 1000) {
    if (await this.checkIfVisible(FullPage.id)) {
      await this.waitForInvisible(FullPage.id, timeout)
    }
  }
}

FullPage.id = '#fullPageLoader'

/**
 * a list of selectors (e.g. IDs, className etc) which need to be
 * visible for this class to be able to work.
 * @type {string[]}
 */
FullPage.initialSelectors = [
  ...ComponentBase.initialSelectors,
]

/**
 * Create New FullPage component class instance
 * return instance after initialisation
 * @param page
 * @param notificationSelector
 * @returns {Promise<FullPage>}
 */
async function newFullPageLoader(page, notificationSelector) {
  const newFullPage = new FullPage(page, notificationSelector)
  await newFullPage.initialise()
  return newFullPage
}

module.exports = newFullPageLoader