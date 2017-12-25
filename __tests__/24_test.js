const { getBridgeCompositions } = require('../24')

describe('Day 24', () => {
  const input = `0/2|2/2|2/3|3/4|3/5|0/1|10/1|9/10`
  const expectedStrongest = 31
  const expectedStrongestOfLongest = 19

  const { strongest, strongestOfLongest } = getBridgeCompositions(input)

  test(`Expect Part 1 (strongest) to result in ${expectedStrongest}`, () => {
    expect(strongest).toBe(expectedStrongest)
  })
  test(`Expect Part 2 (strongest of longest) to result in ${expectedStrongestOfLongest}`, () => {
    expect(strongestOfLongest).toBe(expectedStrongestOfLongest)
  })
})
