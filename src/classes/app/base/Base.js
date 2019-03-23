const {TimeoutError} = require('puppeteer/Errors')
const {
  isString, animationSleep,
} = require('../../../utilities/utilities')

class Base {
  constructor(page) {
    this._page = page
    this._initialised = false
  }

  /**
   * initialise class. i.e. wait for all given initial selectors to
   * become visible
   * @param {number} [timeout] - amount of time to wait (ms)
   * @returns {Promise<void>}
   */
  async initialise(timeout = 4000) {
    const {initialSelectors} = this.constructor
    for (let i = 0; i < initialSelectors.length; i++) {
      if (isString(initialSelectors[i])) {
        await this.waitForVisible(initialSelectors[i], timeout)
      } else {
        throw new TypeError('invalid type provided in initial selectors')
      }
    }
    this._initialised = true
  }

  async confirmInitialisation() {
    if (!this._initialised) {
      await this.initialise()
    }
  }

  get page() {
    return this._page
  }

  get initialised() {
    return this._initialised
  }

  async bringPageToFront() {
    try {
      await this._page.bringToFront()
    } catch (e) {
      if (e instanceof TimeoutError) {
        console.error(`timeout waiting bringing page to front`)
        throw e
      } else {
        console.error(`unknown error occurred bringing page to front: ${e}`)
        throw new Error(`unknown error occurred bringing page to front: ${e}`)
      }
    }
  }

  /**
   * wait for an element to be invisible
   * @param elementSelector - a selector referencing the element
   * @param {number} [timeout] - amount of time to wait (ms)
   * @returns {Promise<void>}
   */
  async waitForInvisible(elementSelector, timeout = 4000) {
    try {
      await this.bringPageToFront()
      await this._page.waitForSelector(
        elementSelector,
        {
          timeout,
          hidden: true,
        })
    } catch (e) {
      if (e instanceof TimeoutError) {
        console.error(
          `timeout waiting for selector: ${elementSelector} to become invisible.`)
        throw e
      } else {
        console.error(`unknown error occurred: ${e}`)
        throw new Error(`unknown error occurred: ${e}`)
      }
    }
  }

  /**
   * Check for timeout amount of time if element referenced by given
   * selector is visible
   * @param {string} elementSelector - a selector referencing the element
   * @param {number} timeout - amount of time to wait for visibility
   * @returns {Promise<boolean>}
   */
  async checkIfVisible(elementSelector, timeout = 100) {
    try {
      await this._page.waitForSelector(elementSelector, {timeout})
      return true
    } catch (e) {
      if (e instanceof TimeoutError) {
        return false
      } else {
        console.error(`unknown error occurred: ${e}`)
        throw e
      }
    }
  }

  /**
   * wait for an element to be visible
   * @param elementSelector - a selector referencing the element
   * @param {number} [timeout] - amount of time to wait (ms)
   * @returns {Promise<void>}
   */
  async waitForVisible(elementSelector, timeout = 4000) {
    try {
      await this.bringPageToFront()
      await this._page.waitForSelector(elementSelector, {timeout})
    } catch (e) {
      if (e instanceof TimeoutError) {
        console.error(
          `timeout waiting for selector: ${elementSelector} to become visible`)
        throw e
      } else {
        console.error(`unknown error occurred: ${e}`)
        throw new Error(`unknown error occurred: ${e}`)
      }
    }
  }

  /**
   * Focus on and type text into element
   * @param elementSelector - selector for the element
   * @param text - text to type into element
   * @returns {Promise<void>}
   */
  async focusAndType(elementSelector, text) {
    try {
      await this.bringPageToFront()
      await this._page.waitForSelector(elementSelector, {timeout: 4000})
      await this._page.focus(elementSelector)
      await animationSleep(2)
      await this._page.keyboard.type(text.toString())
      await animationSleep(2)
    } catch (e) {
      if (e instanceof TimeoutError) {
        console.error(
          `timeout waiting for selector: ${elementSelector}. confirm element with given selector is visible.`)
        throw e
      } else {
        console.error(`unknown error occurred: ${e}`)
        throw new Error(`unknown error occurred: ${e}`)
      }
    }
  }

  /**
   * Focus on and set text of element
   * @param elementSelector - selector for the element
   * @param text - text to type into element
   * @returns {Promise<void>}
   */
  async focusAndSet(elementSelector, text) {
    // make the this.page's tab active
    await this.bringPageToFront()

    // wait for given element referenced by given elementSelector to become visible
    await this.waitForVisible(elementSelector)

    // get the current value of the input
    let inputValue
    // get the current value of the input
    inputValue = await this._page.$eval(elementSelector, el => el.value)

    // try and clear the referenced element
    const maxNoTries = 5
    for (let tryNo = 0; tryNo <= maxNoTries; tryNo++) {
      // focus on the element
      await this._page.focus(elementSelector)
      // wait for select animation on material ui input to finish
      await animationSleep(2)
      // try and clear the element referenced by selector
      for (let i = 0; i < inputValue.length; i++) {
        await this._page.keyboard.press('Backspace')
      }
      // get the new value of the input
      const newInputValue = await this._page.$eval(elementSelector,
        el => el.value)
      if (newInputValue.length === 0) {
        // if it has been cleared, break here
        break
      }
      // otherwise try again
      if (tryNo === maxNoTries) {
        throw new Error(
          `unable to clear element referenced by ${elementSelector}`)
      }
    }

    // referenced element is now clear, type given text
    await this.focusAndType(elementSelector, text)
    // wait for typing animation on material ui input to finish
    await animationSleep(2)
  }

  /**
   * Focus on given element. Throws error if focus cannot
   * be achieved
   * @param elementSelector - selector for the element
   * @returns {Promise<void>}
   */
  async focus(elementSelector) {
    // make the this.page's tab active
    await this.bringPageToFront()

    // wait for given element referenced by given elementSelector to become visible
    await this.waitForVisible(elementSelector)

    // try and focus on the the referenced element
    const maxNoTries = 5
    for (let tryNo = 0; tryNo <= maxNoTries; tryNo++) {
      // focus on the element
      await this._page.focus(elementSelector)

      const focused = await this._page.$eval(elementSelector,
        referencedElement => {
          // confirm referenced element is an actual element
          if (!(referencedElement instanceof Element)) {
            throw new TypeError('invalid referenced element type in focus')
          }
          // confirm active element (i.e. focused) is the referenced element
          return document.activeElement.id === referencedElement.id
        })
      // if the element is focused, break
      if (focused) {
        break
      } // otherwise try again

      if (tryNo === maxNoTries) {
        // if element is still not selected after max no of retries
        throw new Error(
          `unable to focus on element referenced by ${elementSelector}`)
      }
    }
  }

  /**
   * Focus on and then click on element
   * @param elementSelector - selector for the element
   * @returns {Promise<void>}
   */
  async focusAndClick(elementSelector) {
    // make the this.page's tab active
    await this.bringPageToFront()

    // wait for given element referenced by given elementSelector to become visible
    await this.waitForVisible(elementSelector)

    // focus on the given selector
    await this.focus(elementSelector)

    try {
      await animationSleep(3)
      await this._page.click(elementSelector)
    } catch (e) {
      if (e instanceof TimeoutError) {
        console.error(
          `timeout waiting for selector: ${elementSelector}. confirm element with given selector is visible.`)
        throw e
      } else {
        console.error(`unknown error occurred: ${e}`)
        throw new Error(`unknown error occurred: ${e}`)
      }
    }
  }

  /**
   * Focus on and then click on element
   * @param elementSelector - selector for the element
   * @returns {Promise<void>}
   */
  async click(elementSelector) {
    // make the this.page's tab active
    await this.bringPageToFront()

    // wait for given element referenced by given elementSelector to become visible
    await this.waitForVisible(elementSelector)

    try {
      await this._page.click(elementSelector)
    } catch (e) {
      if (e instanceof TimeoutError) {
        console.error(
          `timeout waiting for selector: ${elementSelector}. confirm element with given selector is visible.`)
        throw e
      } else {
        console.error(`unknown error occurred: ${e}`)
        throw new Error(`unknown error occurred: ${e}`)
      }
    }
  }

  /**
   * Finds and returns the first textual inner html content
   * from a given node identified by given rootNodeSelector
   * @param rootNodeSelector
   * @returns {Promise<string>|Promise<void>}
   */
  async findInnerTextFromNode(rootNodeSelector) {
    if (this._page.$(rootNodeSelector) === null) {
      return
    }
    return await this._page.$eval(rootNodeSelector, rootElement => {
      class ElementFinder {
        findFirstInnerText(startElement) {
          // provided the root element given is an instance of a valid
          // Web API Element
          if (!(startElement instanceof Element)) {
            throw new TypeError('invalid startElement object')
          }
          // if the start Element has children
          if (startElement.children.length > 0) {
            return this.findFirstInnerText(startElement.children[0])
          } else {
            // no children, return...
            switch (true) {
              case startElement instanceof HTMLInputElement:
                return startElement.value
              default:
                return startElement.innerHTML
            }
          }
        }
      }

      // create a recursive element finder
      const finder = new ElementFinder()
      return finder.findFirstInnerText(rootElement)
    })
  }
}

/**
 * a list of the things which need to be
 * visible for this class to be able to work
 * @type {string[]}
 */
Base.initialSelectors = []

module.exports = Base
