const ViewBase = require('../Base')
const newMeinCaptcha = require('../../component/MeinCaptcha')

class LoginForgotPassword extends ViewBase {
  constructor(page) {
    super(page)
    this._forgotPasswordCaptcha = null
  }

  async initialise(timeout = 4000) {
    await super.initialise(timeout)

    // click through forgot password states
    await this.click(LoginForgotPassword.forgotPasswordLabelID)
    await this.waitForVisible(LoginForgotPassword.returnToLoginCardLabelID)
    this._forgotPasswordCaptcha = await newMeinCaptcha(
      this.page,
      '#forgotPasswordCaptcha',
    )
    await this.click(LoginForgotPassword.returnToLoginCardLabelID)
    await super.initialise(timeout)
  }

  async login(usernameOrEmailAddress, password) {
    await this.focusAndType(
      LoginForgotPassword.usernameOrEmailAddressInputID,
      usernameOrEmailAddress,
    )
    await this.focusAndType(
      LoginForgotPassword.passwordInputID,
      password,
    )
    await this.focusAndClick(LoginForgotPassword.loginButtonID)
  }
}

LoginForgotPassword.loginCardRootID = '#loginCardRoot'
LoginForgotPassword.usernameOrEmailAddressInputID = '#usernameOrEmailAddress'
LoginForgotPassword.passwordInputID = '#password'
LoginForgotPassword.loginButtonID = '#loginButton'
LoginForgotPassword.forgotPasswordLabelID = '#forgotPasswordLabel'

LoginForgotPassword.forgotPasswordCaptchaCardRootID = '#forgotPasswordCaptchaCardRoot'
LoginForgotPassword.returnToLoginCardLabelID = '#returnToLoginCardLabel'

LoginForgotPassword.initialSelectors = [
  '#loginForgotPasswordRoot',
  LoginForgotPassword.loginCardRootID,
  LoginForgotPassword.usernameOrEmailAddressInputID,
  LoginForgotPassword.passwordInputID,
  LoginForgotPassword.loginButtonID,
  LoginForgotPassword.forgotPasswordLabelID,
]

/**
 * Create New Sidebar component class instance
 * return instance after initialisation
 * @param page
 * @returns {Promise<LoginForgotPassword>}
 */
async function newLoginForgotPasswordView(page) {
  const newLoginForgotPasswordView = new LoginForgotPassword(page)
  await newLoginForgotPasswordView.initialise()
  return newLoginForgotPasswordView
}

module.exports = newLoginForgotPasswordView

