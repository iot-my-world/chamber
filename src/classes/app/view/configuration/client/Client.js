const ViewBase = require('../../base/Base')

class Client extends ViewBase {
  constructor(page) {
    super(page)
  }
}

Client.clientConfigurationRootID = '#clientConfigurationRoot'
Client.clientConfigurationDetailCardID = '#clientConfigurationDetailCard'
Client.clientConfigurationNewClientButtonID = '#clientConfigurationNewClientButton'

/**
 * a list of selectors (e.g. IDs, className etc) which need to be
 * visible for this class to be able to work.
 * @type {string[]}
 */
Client.initialSelectors = [
  ...ViewBase.initialSelectors,
  Client.clientConfigurationRootID,
  Client.clientConfigurationDetailCardID,
  Client.clientConfigurationNewClientButtonID,
]

/**
 * Create New ClientConfiguration view class instance
 * return instance after initialisation
 * @param page
 * @returns {Promise<Client>}
 */
async function newClientConfigurationView(page) {
  const newHome = new Client(page)
  await newHome.initialise()
  return newHome
}

module.exports = newClientConfigurationView