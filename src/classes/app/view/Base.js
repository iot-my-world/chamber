const AppBaseClass = require('../Base')

/**
 * view base class
 * @type {module.Base}
 */
class Base extends AppBaseClass {
  constructor(page) {
    super(page)
  }
}

/**
 * a list of selectors (e.g. IDs, className etc) which need to be
 * visible for this class to be able to work.
 * @type {string[]}
 */
Base.initialSelectors = [
  ...AppBaseClass.initialSelectors,
]

module.exports = Base