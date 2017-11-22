const os = require('os')
const tree = require('asn1-tree')
const universalTags = require('./universalTags')

module.exports = decode

function decode(binary) {
  const buffer = Buffer.from(binary, 'hex')
  const element = tree.decode(buffer)
  const tagCode = element.tagCode
  if (tagCode === universalTags.NULL) {
    return `NULL (0)${os.EOL}`
  } else {
    const value = element.value
    if (Buffer.from('00', 'hex').equals(value)) {
      return `BOOLEAN (1): FALSE${os.EOL}`
    } else {
      return `BOOLEAN (1): TRUE${os.EOL}`
    }
  }
}