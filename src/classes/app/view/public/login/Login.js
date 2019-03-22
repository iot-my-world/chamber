const ViewBase = require('../../base/Base')

/**
 * login view class
 * defines login in functionality
 */
class Login extends ViewBase {
  constructor(page) {
    super(page)
  }

  /**
   * log in to site
   * returns sidebar and home view for party type
   * @param {string} username
   * @param {string} password
   * @returns {Promise<{sidebar: Sidebar, homeView: Home}>}
   */
  async login(username, password) {
    await this.focusAndType(Login.usernameEmailInputBoxID, username)
    await this.focusAndType(Login.passwordBoxID, password)
    await this.click(Login.loginButtonID)
  }

}

Login.usernameEmailInputBoxID = '#usernameOrEmailAddressInput'
Login.passwordBoxID = '#passwordInput'
Login.loginButtonID = '#loginButton'

/**
 * a list of selectors (e.g. IDs, className etc) which need to be
 * visible for this class to be able to work.
 * @type {string[]}
 */
Login.initialSelectors = [
  ...ViewBase.initialSelectors,
  Login.usernameEmailInputBoxID,
  Login.passwordBoxID,
  Login.loginButtonID,
]

/**
 * Create New Login view class instance
 * return instance after initialisation
 * @param page
 * @returns {Promise<Login>}
 */
async function newLogin(page) {
  const newLogin = new Login(page)
  await newLogin.initialise()
  return newLogin
}

module.exports = newLogin