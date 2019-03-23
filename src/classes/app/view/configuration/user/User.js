const ViewBase = require('../../base/Base')

class User extends ViewBase {
  constructor(page) {
    super(page)
  }
}

User.userConfigurationRootID = '#userConfigurationRoot'
User.userConfigurationDetailCardID = '#userConfigurationDetailCard'
User.userConfigurationNewUserButtonID = '#userConfigurationNewUserButton'

/**
 * a list of selectors (e.g. IDs, className etc) which need to be
 * visible for this class to be able to work.
 * @type {string[]}
 */
User.initialSelectors = [
  ...ViewBase.initialSelectors,
  User.userConfigurationRootID,
  User.userConfigurationDetailCardID,
  User.userConfigurationNewUserButtonID,
]

/**
 * Create New UserConfiguration view class instance
 * return instance after initialisation
 * @param page
 * @returns {Promise<User>}
 */
async function newUserConfigurationView(page) {
  const newHome = new User(page)
  await newHome.initialise()
  return newHome
}

module.exports = newUserConfigurationView