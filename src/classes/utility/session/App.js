const {isFunction} = require('../../../utilities/utilities')
const ViewBase = require('../../app/view/Base')
const Base = require('./Base')
const newLoginForgotPasswordView = require(
  '../../app/view/public/LoginForgotPassword')
const {SystemPartyType} = require('../../../brain/party/types')
const newSystemSidebar = require('../../app/component/sidebar/System')
const newSystemHomeView = require('../../app/view/app/home/System')

class App extends Base {
  constructor(browser, rootURL) {
    super(browser, rootURL)

    /**
     * Sidebar component for the
     * party type logged in to the
     * app session
     * @type {Sidebar}
     * @private
     */
    this._sidebar = null

    // sidebar handler to set
    this.sidebarGetHandler = setActiveView => ({
      get(target, prop) {
        if (
          (isFunction(target[prop])) &&
          (target[prop].name.startsWith('selectView'))
        ) {
          return (async () => {
            const view = await Promise.resolve(target[prop]())
            if (!(view instanceof ViewBase)) {
              throw new TypeError(
                `active view should always be an instance of the ViewBase class or one of it's children`)
            }
            setActiveView(view)
          })
        }
        return target[prop]
      },
    })
  }

  async startAndLogin(usernameOrEmailAddress, password, partyType) {
    await super.start()
    await this.login(usernameOrEmailAddress, password, partyType)
  }

  async login(usernameOrEmailAddress, password, partyType) {
    if (!this.started) {
      await this.start()
    }
    await this.page.bringToFront()

    const loginView = await newLoginForgotPasswordView(this.page)
    await loginView.login(usernameOrEmailAddress, password)

    switch (partyType) {
      case SystemPartyType:
        this._sidebar = new Proxy(
          await newSystemSidebar(this._page),
          this.sidebarGetHandler(activeView => this._activeView = activeView),
        )
        this._activeView = await newSystemHomeView(this._page)
        break

      default:
        throw new TypeError('invalid or unsupported party type: ' + partyType)
    }
  }

}

/**
 * Create new Public Session
 * return instance after starting
 * @param {Browser} browser
 * @param {string} rootURL
 * @param {string} usernameOrEmailAddress
 * @param {string} password
 * @param {string} partyType
 * @returns {Promise<App>}
 */
module.exports.newAppSession = async function(
  browser, rootURL,
  usernameOrEmailAddress, password, partyType,
) {
  const newAppSession = new App(browser, rootURL)
  await newAppSession.startAndLogin(usernameOrEmailAddress, password, partyType)
  return newAppSession
}