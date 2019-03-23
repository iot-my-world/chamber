const ViewBase = require('../../base/Base')
const newTK102ConfigurationView = require('./tk102/TK102')

class Device extends ViewBase {
  constructor(page) {
    super(page)
    this._activeTab = null
  }

  async initialise(timeout = 4000) {
    await super.initialise(timeout)
    this._activeTab = await newTK102ConfigurationView(this.page)
  }

  get activeTab() {
    if (this._activeTab === null) {
      throw new Error('active device configuration tab not set')
    }
  }
}

Device.deviceConfigurationRootID = '#deviceConfigurationRoot'
Device.tk102TabId = '#tk102Tab'

/**
 * a list of selectors (e.g. IDs, className etc) which need to be
 * visible for this class to be able to work.
 * @type {string[]}
 */
Device.initialSelectors = [
  ...ViewBase.initialSelectors,
  Device.deviceConfigurationRootID,
]

/**
 * Create New DeviceConfiguration view class instance
 * return instance after initialisation
 * @param page
 * @returns {Promise<Device>}
 */
async function newDeviceConfigurationView(page) {
  const newHome = new Device(page)
  await newHome.initialise()
  return newHome
}

module.exports = newDeviceConfigurationView