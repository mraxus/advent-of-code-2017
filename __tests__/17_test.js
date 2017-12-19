const { spinlockPreAllocated } = require('../17')

describe('Day 17', () => {
  const input = 3
  const resultPart1 = 638

  test(`Expect Part 1 with input '${input}' to result in ${resultPart1}`, () => {
    expect(spinlockPreAllocated(input, 2017)).toBe(resultPart1)
  })
})
