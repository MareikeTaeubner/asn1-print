const os = require('os')
const tree = require('asn1-tree')
const universalTags = require('./universalTags')

module.exports = decode

function decode(binary) {
  const buffer = Buffer.from(binary, 'hex')
  const element = tree.decode(buffer)
  const tagCode = element.tagCode
  const valueBuffer = element.value
  const length = Buffer.byteLength(valueBuffer, 'hex')
  const hexValue = valueBuffer.toString('hex')

  return parsePrimitive(tagCode, hexValue, length)
}

/**
 * Parses the given ASN1 primitive.
 * Returns the ASN1 string representation of the given primitive.
 * 
 * @param {number} tagCode the ASN1 tag code of the primitive
 * @param {String} value the hex encoded value of the primitive
 * @param {number} length the length of the value
 * @returns {String} the ASN1 string representation of the given primitive.
 */
function parsePrimitive(tagCode, value, length) {
  switch (tagCode) {
    case universalTags.NULL:
      return `NULL (0)${os.EOL}`
    case universalTags.BOOLEAN:
      return parseBoolean(value)
    case universalTags.INTEGER:
      return parseInteger(value, length)
    default:
      return undefined
  }
}

/**
 * Parses the given hex encoded integer.
 * Returns the ASN1 string representation of the given integer value.
 * 
 * @param {String} value the hex value of the integer
 * @param {number} length the length of the hex value
 * @returns {String} the ASN1 string representation of the given integer value
 */
function parseInteger(value, length) {
  let int = parseInt(value, 16)
  // console.log(parseInt('7F', 16))
  if (!isPositiveNumber(value)) {
    int = int * -1
  }

  const intString = `INTEGER (${length}): ${int}${os.EOL}`

  return intString
}

/**
 * Returns true if the given integer is a positive number.
 * Returns false otherwise.
 * 
 * A number is positive if the most significant bit is 0.
 * 
 * @param {String} hexInt the hex encoded integer
 * @returns {boolean} true if the given integer is a positive number. Returns false otherwise.
 */
function isPositiveNumber(hexInt) {
  return hexInt.startsWith('0')
}

/**
 * Parses the boolean from the given hex string.
 * Returns the ASN1 string representation of the given value.
 * 
 * @param {String} value the hex encoded value of the boolean
 * @returns {String} the ASN1 string representation of the given value.
 */
function parseBoolean(value) {
  if ('00' === value) {
    return `BOOLEAN (1): FALSE${os.EOL}`
  } else {
    return `BOOLEAN (1): TRUE${os.EOL}`
  }
}