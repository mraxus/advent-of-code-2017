const { reallocate } = require('../06')

describe('Day 6', () => {
  const expectedCycles = 5
  const expectedLoopLength = 4

  const {cycles, loopLength} = reallocate(`0 2 7 0`)

  test(`Expect Part 1 (cycles) input to be ${expectedCycles}`, () => {
    expect(cycles).toBe(expectedCycles)
  })

  test(`Expect Part 2 (loop length) input to be ${expectedLoopLength}`, () => {
    expect(loopLength).toBe(expectedLoopLength)
  })
})
