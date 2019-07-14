const {isFunction} = require('../../../utilities/utilities')
const ViewBase = require('../../app/view/Base')
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

    this.navbarGetHandler = setActiveView => ({
      get(target, prop) {
        if (
          (isFunction(target[prop])) &&
          (target[prop].name.startsWith('selectView'))
        ) {
          return (async () => {
            const view = await Promise.resolve(target[prop]())
            if (!(view instanceof ViewBase)) {
              throw new TypeError(
                `active view should always be an instance of the ViewBase class or one of it's children`,
              )
            }
            setActiveView(view)
          })
        }
        return target[prop]
      },
    })
  }

  async start() {
    await super.start()
    this._navbar = new Proxy(
      await newPublicNavBar(this.page),
      this.navbarGetHandler(activeView => this._activeView = activeView),
    )
  }

  get navbar() {
    return this._navbar
  }

}

/**
 * Create new Public Session
 * return instance after starting
 * @param {Browser} browser
 * @param {string} rootURL
 * @returns {Promise<Public>}
 */
module.exports.newPublicSession = async function(browser, rootURL) {
  const newPublicSession = new Public(browser, rootURL)
  await newPublicSession.start()
  return newPublicSession
}