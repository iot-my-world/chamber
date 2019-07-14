const ViewBase = require('../../app/view/Base')

class Session {
  /**
   * construct new session object
   * @param {Browser} browser
   * @param {string} rootURL
   */
  constructor(browser, rootURL) {
    /**
     * started indicates that the browser has
     * opened and navigation to root URL is complete
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
    this._rootURL = rootURL
    /**
     * instanceOf ViewBase === true
     * i.e. this is an instance of a class
     * which inherits from ViewBase
     * @type {ViewBase}
     * @private
     */
    this._activeView = null
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

  get activeView() {
    if (this._activeView === undefined) {
      throw new ReferenceError('active view is not yet defined')
    }
    return this._activeView
  }

  get page() {
    return this._page
  }
}

module.exports = Session