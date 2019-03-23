const ViewBase = require('../../base/Base')

class Company extends ViewBase {
  constructor(page) {
    super(page)
  }
}

Company.companyConfigurationRootID = '#companyConfigurationRoot'
Company.companyConfigurationDetailCardID = '#companyConfigurationDetailCard'
Company.companyConfigurationNewCompanyButtonID = '#companyConfigurationNewCompanyButton'

/**
 * a list of selectors (e.g. IDs, className etc) which need to be
 * visible for this class to be able to work.
 * @type {string[]}
 */
Company.initialSelectors = [
  ...ViewBase.initialSelectors,
  Company.companyConfigurationRootID,
  Company.companyConfigurationDetailCardID,
  Company.companyConfigurationNewCompanyButtonID,
]

/**
 * Create New CompanyConfiguration view class instance
 * return instance after initialisation
 * @param page
 * @returns {Promise<Company>}
 */
async function newCompanyConfigurationView(page) {
  const newHome = new Company(page)
  await newHome.initialise()
  return newHome
}

module.exports = newCompanyConfigurationView