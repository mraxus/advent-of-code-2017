const { spinlockNaive } = require('../17')

describe('Day x', () => {
  const input = 3
  const resultPart1 = 638

  test(`Expect Part 1 with input '${input}' to result in ${resultPart1}`, () => {
    expect(spinlockNaive(input, 2017)).toBe(resultPart1)
  })
})
