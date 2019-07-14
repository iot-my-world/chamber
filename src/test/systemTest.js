const {
  loginAndNavigateTest,
} = require('./system/loginAndNavigate')

module.exports = describe('System', function() {
  it.only('Login and Navigate', loginAndNavigateTest)
})