const ComponentBase = require('./Base')

class MeinCaptcha extends ComponentBase {
  constructor(page, id = '#meinCaptcha') {
    super(page)
    this._id = id
  }

  async initialise(timeout = 4000) {
    await this.waitForVisible(this._id)

    await super.initialise(timeout)
    await this.focusAndClick(MeinCaptcha.notARobotCheckboxID)
    const elementsToCheck = [
      MeinCaptcha.captchaImageRootID,
      MeinCaptcha.captchaAnswerInputID,
      MeinCaptcha.captchaImageRootID,
      MeinCaptcha.submitCaptchaButtonID,
      MeinCaptcha.regenerateCaptchaButtonID,
    ]
    elementsToCheck.forEach(
      async selector => await this.waitForVisible(selector),
    )
    await this.focusAndClick(MeinCaptcha.regenerateCaptchaButtonID)
    await this.focusAndClick(MeinCaptcha.submitCaptchaButtonID)
    await this.waitForVisible(MeinCaptcha.incorrectMessageID)
    await this.waitForVisible(MeinCaptcha.tryAgainButtonID)
    await this.focusAndClick(MeinCaptcha.tryAgainButtonID)

    await super.initialise(timeout)
    await this.focusAndClick(MeinCaptcha.notARobotCheckboxID)
    elementsToCheck.forEach(
      async selector => await this.waitForVisible(selector),
    )
  }
}

MeinCaptcha.askingForCaptchaRootID = '#askingForCaptchaRoot'
MeinCaptcha.notARobotCheckboxID = '#notARobotCheckbox'

MeinCaptcha.captchaImageRootID = '#captchaImageRoot'
MeinCaptcha.captchaAnswerInputID = '#captchaAnswer'
MeinCaptcha.submitCaptchaButtonID = '#submitCaptchaButton'
MeinCaptcha.regenerateCaptchaButtonID = '#regenerateCaptchaButton'

MeinCaptcha.incorrectMessageID = '#incorrectMessage'
MeinCaptcha.tryAgainButtonID = '#tryAgainButton'

/**
 * a list of selectors (e.g. IDs, className etc) which need to be
 * visible for this class to be able to work.
 * @type {string[]}
 */
MeinCaptcha.initialSelectors = [
  ...ComponentBase.initialSelectors,
  MeinCaptcha.askingForCaptchaRootID,
  MeinCaptcha.notARobotCheckboxID,
]

/**
 * Create New MeinCaptcha component class instance
 * return instance after initialisation
 * @param {Page} page - puppeteer page object
 * @param {string} [id] - id set on the mein captcha
 * @returns {Promise<MeinCaptcha>}
 */
async function newMeinCaptcha(page, id) {
  const newMeinCaptcha = new MeinCaptcha(page, id)
  await newMeinCaptcha.initialise()
  return newMeinCaptcha
}

module.exports = newMeinCaptcha