const Base = require('./Base')

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
  }
}

module.exports = App