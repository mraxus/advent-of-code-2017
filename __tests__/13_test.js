const { func1, func2 } = require('../13')

describe('Day 13', () => {
  const testCases = [
    { input: '0: 3|1: 2|4: 4|6: 4', result: 24 }
  ]
  const testCases2 = [
    { input: '0: 3|1: 2|4: 4|6: 4', result: 10 }
  ]

  testCases.forEach(({ input, result }) => {
    test(`Expect Part 1  to result in ${result}`, () => {
      expect(func1(input)).toBe(result)
    })
  })

  testCases2.forEach(({ input, result }) => {
    test(`Expect Part 2 to result in ${result}`, () => {
      expect(func2(input)).toBe(result)
    })
  })
})
