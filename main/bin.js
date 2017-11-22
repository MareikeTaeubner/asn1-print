const asn1print = require('.')

const input = process.argv[2]
const output = asn1print(input)
console.log(output)