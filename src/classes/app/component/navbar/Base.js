const ComponentBase = require('../Base')

class Base extends ComponentBase {
  constructor(page) {
    super(page)
  }
}

Base.initialSelectors = []

module.exports = Base