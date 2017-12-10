const { asciiKnotHash, numericKnotHash } = require('../10')

describe('Day 10: Knot Hash', () => {
  const inputLengths = '3,4,1,5'
  const listSize = 5
  const result = 12

  const asciiResult = [
    { input: '', result: 'a2582a3a0e66e6e86e3812dcb672a272' },
    { input: 'AoC 2017', result: '33efeb34ea91902bb2f59c9920caa6cd' },
    { input: '1,2,3', result: '3efbe78a8d82f29979031a4aa0b16a9d' },
    { input: '1,2,4', result: '63960835bcdc130f0b66d7ff4f6a5a8e' },
  ]

  test(`Expect Part 1 (numeric knot size) input to be ${result}`, () => {
    expect(numericKnotHash(inputLengths, listSize)).toBe(result)
  })

  asciiResult.forEach(({ input, result }) => {
    test(`Expect Part 2 (peak registry value) input to be ${result}`, () => {
      expect(asciiKnotHash(input)).toBe(result)
    })
  })
})
