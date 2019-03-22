const BaseClass = require('../../base')

class Base extends BaseClass {
  constructor(page) {
    super(page)
  }
}

Base.initialSelectors = [
  ...BaseClass.initialSelectors,
]

module.exports = Base

