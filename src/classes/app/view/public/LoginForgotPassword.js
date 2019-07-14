const ViewBase = require('../Base')

class LoginForgotPassword extends ViewBase {

}

LoginForgotPassword.initialSelectors = [
  '#loginForgotPasswordRoot',
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

