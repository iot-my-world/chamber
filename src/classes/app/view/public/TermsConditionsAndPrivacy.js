const ViewBase = require('../Base')

class TermsConditionsAndPrivacy extends ViewBase {

}

TermsConditionsAndPrivacy.initialSelectors = [
  '#termsConditionsAndPrivacyRoot',
]

/**
 * Create New Sidebar component class instance
 * return instance after initialisation
 * @param page
 * @returns {Promise<TermsConditionsAndPrivacy>}
 */
async function newTermsConditionsAndPrivacyView(page) {
  const newTermsConditionsAndPrivacyView = new TermsConditionsAndPrivacy(page)
  await newTermsConditionsAndPrivacyView.initialise()
  return newTermsConditionsAndPrivacyView
}

module.exports = newTermsConditionsAndPrivacyView

