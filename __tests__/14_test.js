const { countUsedSquares, countUsedRegions } = require('../14')

describe('Day 14', () => {
  const input = 'flqrgnkx'
  const resultUsedCount = 8108
  const resultRegionCount = 1242

  test(`Expect Part 1 with '${input}' to result in ${resultUsedCount}`, () => {
    expect(countUsedSquares(input)).toBe(resultUsedCount)
  })

  test(`Expect Part 2 with '${input}' to result in ${resultRegionCount}`, () => {
    expect(countUsedRegions(input)).toBe(resultRegionCount)
  })
})
