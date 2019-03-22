const {
  loginTest,
} = require('./system/login')

module.exports = describe('System', function() {
  it('Login and Navigate', loginTest)
})