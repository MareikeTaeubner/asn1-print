const { describe, it } = require('mocha')
const { expect } = require('chai')

describe('initial setup', () => {
  it('should be a green test', () => {
    expect(1 + 2).to.equal(3)
  })

  it('should fail - oh no!', () => {
    expect(true).to.be.false
  })
})
