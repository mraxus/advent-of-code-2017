const { hexTraversing } = require('../11')

describe('Day 11: Hex Ed', () => {
  const testCases = [
    { input: 'ne,ne,ne', result: 3 },
    { input: 'ne,ne,sw,sw', result: 0 },
    { input: 'ne,ne,s,s', result: 2 },
    { input: 'se,sw,se,sw,sw', result: 3 },
  ]

  testCases.forEach(({ input, result }) => {
    test(`Expect Part 1 (hex traversing) input "${input}" to be ${result}`, () => {
      expect(hexTraversing(input).distance).toBe(result)
    })
  })
})
