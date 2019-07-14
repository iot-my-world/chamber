import Base from './Base'

class Navbar extends Base {

}

Navbar.initialSelectors = []

/**
 * Create New NavBar class instance
 * and return after initialisation
 * @param {Page} page
 * @returns {Promise<FullPage>}
 */
async function newNavBar(page) {
  const newNavBar = new Navbar(page)
  await newNavBar.initialise()
  return newNavBar
}

module.exports = newNavBar