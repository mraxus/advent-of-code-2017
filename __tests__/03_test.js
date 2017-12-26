const { totalSteps, largerValue } = require('../03')

describe('Day 3', () => {
  const partOne = [
    { input: 1, result: 0 },
    { input: 12, result: 3 },
    { input: 23, result: 2 },
    { input: 1024, result: 31 },
  ]
  const partTwo = [
    { input: 1, result: 2 },
    { input: 2, result: 4 },
    { input: 3, result: 4 },
    { input: 4, result: 5 },
    { input: 5, result: 10 },
    { input: 25, result: 26 },
    { input: 700, result: 747 },
  ]

  partOne.forEach(({input, result}) => {
    test(`Expect Part 1 with input ${input} to be ${result}`, () => {
      expect(totalSteps(input)).toBe(result)
    })
  })
  partTwo.forEach(({input, result}) => {
    test(`Expect Part 2 with input ${input} to be ${result}`, () => {
      expect(largerValue(input)).toBe(result)
    })
  })
})
