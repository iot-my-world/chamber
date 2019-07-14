const ComponentBase = require('../Base')

/**
 * base sidebar component class
 * defines functionality shared by all
 * party specific sidebars
 */
class Sidebar extends ComponentBase {
  constructor(page) {
    super(page)
    this._profileMenuOpen = false
  }

  async initialise(timeout = 4000) {
    await super.initialise(timeout)
    await this.openProfileMenu()
    await this.closeProfileMenu()
  }

  async openProfileMenu() {
    if (this._profileMenuOpen) {
      throw new Error('profile menu already open')
    }
    await this.focusAndClick(Sidebar.profileMenuLinkID)
    await this.waitForVisible(Sidebar.userProfileLinkID)
    await this.waitForVisible(Sidebar.partyProfileLinkID)
    await this.waitForVisible(Sidebar.logoutLinkID)
    this._profileMenuOpen = true
  }

  async closeProfileMenu() {
    if (!this._profileMenuOpen) {
      throw new Error('profile menu already closed')
    }
    await this.focusAndClick(Sidebar.profileMenuLinkID)
    await this.waitForInvisible(Sidebar.userProfileLinkID)
    await this.waitForInvisible(Sidebar.partyProfileLinkID)
    await this.waitForInvisible(Sidebar.logoutLinkID)
    this._profileMenuOpen = false
  }
}

Sidebar.rootID = '#sidebarRoot'
Sidebar.logoutLinkID = '#sidebarLogoutLink'

Sidebar.profileMenuLinkID = '#sidebarProfileMenuLink'
Sidebar.userProfileLinkID = '#sidebarUserProfileLink'
Sidebar.partyProfileLinkID = '#sidebarPartyProfileLink'

/**
 * a list of selectors (e.g. IDs, className etc) which need to be
 * visible for this class to be able to work.
 * @type {string[]}
 */
Sidebar.initialSelectors = [
  ...ComponentBase.initialSelectors,
  Sidebar.rootID,
  Sidebar.profileMenuLinkID,
]

module.exports = Sidebar