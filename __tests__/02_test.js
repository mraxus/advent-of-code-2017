const { checksum, evenly } = require('../02')

describe('Day 2', () => {
  const partOne = [
    {input: '5 1 9 5\n7 5 3\n2 4 6 8', result: 18},
  ]
  const partTwo = [
    {input: '5 9 2 8\n9 4 7 3\n3 8 6 5', result: 9},
  ]

  partOne.forEach(({input, result}) => {
    test(`Expect Part 1 (checksum) input to be ${result}`, () => {
      expect(checksum(input)).toBe(result)
    })
  })

  partTwo.forEach(({input, result}) => {
    test(`Expect Part 2 (evenly divisible values) input to be ${result}`, () => {
      expect(evenly(input)).toBe(result)
    })
  })
})
