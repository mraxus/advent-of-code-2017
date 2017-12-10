const { anagramPassword, simplyAPassword, } = require('../04')

describe('Day 4', () => {
  const partOne = [
    {input: 'aa bb cc dd ee', result: true},
    {input: 'aa bb cc dd aa', result: false},
    {input: 'aa bb cc dd aaa', result: true},
  ]
  const partTwo = [
    {input: 'abcde fghij', result: true},
    {input: 'abcde xyz ecdab', result: false},
    {input: 'a ab abc abd abf abj', result: true},
    {input: 'iiii oiii ooii oooi oooo', result: true},
    {input: 'oiii ioii iioi iiio', result: false},
  ]

  partOne.forEach(({input, result}) => {
    test(`Expect Part 1 (simply password) input to be ${result}`, () => {
      expect(simplyAPassword(input)).toBe(result)
    })
  })

  partTwo.forEach(({input, result}) => {
    test(`Expect Part 2 (evenly divisible values) input to be ${result}`, () => {
      expect(anagramPassword(input)).toBe(result)
    })
  })
})
