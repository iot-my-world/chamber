const ComponentBase = require('../base/base')

/**
 * base sidebar component class
 * defines functionality shared by all
 * party specific sidebars
 */
class Sidebar extends ComponentBase {
  constructor(page){
    super(page)
  }
}

Sidebar.rootID = '#sidebarRoot'
Sidebar.linksRootID = '#sidebarLinksRoot'
Sidebar.userRootID = '#sidebarUserRoot'
Sidebar.listRootID = '#sidebarListRoot'

/**
 * a list of selectors (e.g. IDs, className etc) which need to be
 * visible for this class to be able to work.
 * @type {string[]}
 */
Sidebar.initialSelectors = [
    ...ComponentBase.initialSelectors,
    Sidebar.rootID,
    Sidebar.linksRootID,
    Sidebar.userRootID,
    Sidebar.listRootID,
]

module.exports = Sidebar