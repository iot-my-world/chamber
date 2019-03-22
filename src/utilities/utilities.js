function isString(value) {
  return typeof value === 'string' || value instanceof String
}

module.exports.isString = isString

function isArray(value) {
  return value && typeof value === 'object' && value.constructor === Array
}

module.exports.isArray = isArray

function isObject(value) {
  return value && typeof value === 'object' && value.constructor === Object
}

module.exports.isObject = isObject

function isNumber(value) {
  return typeof value === 'number' && isFinite(value)
}

module.exports.isNumber = isNumber

function isFunction(value) {
  return typeof value === 'function'
}

module.exports.isFunction = isFunction

function isBoolean(value) {
  return typeof(value) === typeof(true)
}

module.exports.isBoolean = isBoolean

function round(value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals)
}

module.exports.round = round

function objectCopy(input, recursionDepth) {
  // Increment recursion depth to prevent infinite recursion
  // with circular objects
  recursionDepth = recursionDepth ? recursionDepth + 1 : 1

  if (recursionDepth > 30) {
    console.error('max recursion depth exceeded, abandoning object copy')
    return input
  }

  let copy

  switch (true) {

    case (isObject(input)):
      copy = {}
      for (let field in input) {
        copy[field] = objectCopy(input[field], recursionDepth)
      }
      break

    case isArray(input):
      copy = []
      input.forEach(item => {
        copy.push(objectCopy(item, recursionDepth))
      })
      break

      // -bool, null, undefined, string and number are all passed by value
      //  through a = b
      // functions will be passed by reference
    default:
      copy = input
  }
  return copy
}

module.exports.objectCopy = objectCopy

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

module.exports.sleep = sleep


async function animationSleep(type = 1) {
  let time
  switch (type) {
    case 1:
      time = 50 * sleepFactor
      break

    case 2:
      time = 100 * sleepFactor
      break

    case 3:
      time = 200 * sleepFactor
      break
    case 4:
      time = 500 * sleepFactor
      break

    case 5:
      time = 1000 * sleepFactor
      break

    default:
      throw new TypeError('invalid type given to animation sleep')
  }
  await sleep(time)
}

module.exports.animationSleep = animationSleep