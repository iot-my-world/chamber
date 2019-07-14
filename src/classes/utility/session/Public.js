const Base = require('./Base')
const newPublicNavBar = require('../../app/component/navbar/Public')

class Public extends Base {
  constructor(browser, rootURL) {
    super(browser, rootURL)
    /**
     * navbar component for the
     * public session
     * @type {PublicNavBar}
     * @private
     */
    this._navbar = null
  }

  async start() {
    await super.start()
    this._navbar = await newPublicNavBar(this.page)
  }

}

module.exports = Public