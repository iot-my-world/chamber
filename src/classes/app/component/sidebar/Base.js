const ComponentBase = require('classes/app/component/Base')

/**
 * base sidebar component class
 * defines functionality shared by all
 * party specific sidebars
 */
class Sidebar extends ComponentBase {
  constructor(page) {
    super(page)
  }
}

Sidebar.rootID = '#sidebarRoot'
Sidebar.profileLinkID = '#sidebarProfileLink'
Sidebar.homeLinkID = '#sidebarHomeLink'
Sidebar.logoutLinkID = '#sidebarLogoutLink'

/**
 * a list of selectors (e.g. IDs, className etc) which need to be
 * visible for this class to be able to work.
 * @type {string[]}
 */
Sidebar.initialSelectors = [
  ...ComponentBase.initialSelectors,
  Sidebar.rootID,
  Sidebar.profileLinkID,
  Sidebar.homeLinkID,
  Sidebar.logoutLinkID,
]

module.exports = Sidebar