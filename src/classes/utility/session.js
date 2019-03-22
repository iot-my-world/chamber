const newSystemSidebar = require('../app/component/system/sidebar/Sidebar')
const newSystemHomeView = require('../app/view/System/home/Home')
const newLoginView = require('../app/view/public/login/Login')
const {isFunction} = require('../../utilities/utilities')
const ViewBase = require('../app/view/base/Base')
const {SystemPartyType} = require('../../constants/party')

class Session {
  /**
   * construct new session object
   * @param {Browser} browser
   * @param {string} tbdURL
   */
  constructor(browser, tbdURL) {
    /**
     * indicates whether session
     * has been logged in
     * @type {boolean}
     * @private
     */
    this._loggedIn = false
    /**
     * started indicates that log in has completed
     * and the sidebar and first active view are set up
     * @type {boolean}
     * @private
     */
    this._started = false
    /**
     * wrapped puppeteer browser
     * this is the intersession state
     * vessel
     * @type {Browser}
     * @private
     */
    this._browser = browser
    /**
     * url where the session can be started
     * @type {string}
     * @private
     */
    this._rootURL = tbdURL
    /**
     * Sidebar component for the
     * party type logged in to the
     * session
     * @type {Sidebar}
     * @private
     */
    this._sidebar = null
    /**
     * instanceOf ViewBase === true
     * i.e. this is an instance of a class
     * which inherits from ViewBase
     * @type {ViewBase}
     * @private
     */
    this._activeView = null

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

  async start() {
    if (this._started) {
      throw new Error(`session has already been started`)
    }
    this._page = await this._browser.newPage({timeout: 10000})
    await this._page.bringToFront()
    await this._page.goto(this._rootURL, {waitUntil: 'networkidle2'})
    this._started = true
  }

  async end() {
    if (!this._started) {
      throw new Error('cannot end session that was not started')
    }
    await this._page.close()
  }

  get loggedIn() {
    return this._loggedIn
  }

  async login(username, password, partyType) {
    if (!this._started) {
      await this.start()
    }
    await this._page.bringToFront()

    const loginView = await newLoginView(this._page)
    await loginView.login(username, password)

    switch (partyType) {

      case SystemPartyType:
        this._sidebar = new Proxy(
          await newSystemSidebar(this._page),
          this.sidebarGetHandler(activeView => this._activeView = activeView),
        )
        // this._activeView = await newSystemHomeView(this._page)
        break

      default:
        throw new TypeError(
          `invalid/unsupported party type ${partyType} provided to Login.login`)
    }
  }

  get sidebar() {
    if (this._sidebar === undefined) {
      throw new ReferenceError(
        `sidebar is not yet defined. must log in before accessing sidebar`)
    }
    return this._sidebar
  }

  get activeView() {
    if (this._activeView === undefined) {
      throw new ReferenceError(
        `active view is not yet defined. must log in before getting active view`)
    }
    return this._activeView
  }

  get page() {
    return this._page
  }
}

module.exports = Session