const { computeChecksum } = require('../25')

describe('Day 23', () => {
  const input = {
    initialState: 'A',
    steps: 6,
    states: {
      A: [ { value: 1, pos: +1, state: 'B' }, { value: 0, pos: -1, state: 'B' } ],
      B: [ { value: 1, pos: -1, state: 'A' }, { value: 1, pos: +1, state: 'A' } ],
    }
  }
  const checksum = 3

  test(`Expect Part 1 (compute checksum) to result in ${checksum}`, () => {
    expect(computeChecksum(input)).toBe(checksum)
  })
})
