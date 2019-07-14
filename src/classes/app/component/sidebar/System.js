const SidebarBase = require('./Base')

/**
 * system sidebar component class
 * defines system party specific
 * sidebar functionality
 */
class System extends SidebarBase {

}

// other sidebar link ids

/**
 * a list of selectors (e.g. IDs, className etc) which need to be
 * visible for this class to be able to work.
 * @type {string[]}
 */
System.initialSelectors = [
  ...SidebarBase.initialSelectors,
]

/**
 * Create New Sidebar component class instance
 * return instance after initialisation
 * @param page
 * @returns {Promise<System>}
 */
async function newSidebar(page) {
  const newSidebar = new System(page)
  await newSidebar.initialise()
  return newSidebar
}

module.exports = newSidebar
