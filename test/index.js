const { describe, it } = require('mocha')
const { expect } = require('chai')
const os = require('os')
const decode = require('../main/index')

describe('primitives from hex', () => {
  it('should decode a NULL value', () => {
    const hex = '0500'
    const expectedOutput = 'NULL (0)' + os.EOL

    const result = decode(hex)
    expect(result).to.be.equal(expectedOutput)
  })

  it('should decode a true boolean value', () => {
    const hex = '0101FF'
    const expectedOutput = `BOOLEAN (1): TRUE${os.EOL}`

    const result = decode(hex)
    expect(result).to.be.equal(expectedOutput)
  })

  it('should decode a false boolean value', () => {
    const hex = '010100'
    const expectedOutput = `BOOLEAN (1): FALSE${os.EOL}`

    const result = decode(hex)
    expect(result).to.be.equal(expectedOutput)
  })
})