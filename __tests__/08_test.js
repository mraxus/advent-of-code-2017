const { instruct } = require('../08')

describe('Day 8', () => {
  const largestRegistryValue = 1
  const peakRegistryValue = 10

  const { largestValue, peakValue } = instruct(`b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`)

  test(`Expect Part 1 (largest registry value) input to be ${largestRegistryValue}`, () => {
    expect(largestValue).toBe(largestRegistryValue)
  })

  test(`Expect Part 2 (peak registry value) input to be ${peakRegistryValue}`, () => {
    expect(peakValue).toBe(peakRegistryValue)
  })
})
