const Base = require('./Base')

class Public extends Base {
  constructor(browser, rootURL) {
    super(browser, rootURL)
    /**
     * navbar component for the
     * public session
     * @type {Navbar}
     * @private
     */
    this._navbar = null
  }

}

module.exports = Public