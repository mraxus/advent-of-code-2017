const { incOnly, incOrDec } = require('../05')

describe('Day 5', () => {
  const partOne = [
    {input: `0 3 0 1 -3`, result: 5},
  ]
  const partTwo = [
    {input: `0 3 0 1 -3`, result: 10},
  ]

  partOne.forEach(({input, result}) => {
    test(`Expect Part 1 (increase only) input to be ${result}`, () => {
      expect(incOnly(input)).toBe(result)
    })
  })

  partTwo.forEach(({input, result}) => {
    test(`Expect Part 2 (increase or decrease) input to be ${result}`, () => {
      expect(incOrDec(input)).toBe(result)
    })
  })
})
