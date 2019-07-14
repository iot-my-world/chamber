const BaseClass = require('../Base')

class Base extends BaseClass {
}

Base.initialSelectors = [
  ...BaseClass.initialSelectors,
]

module.exports = Base

