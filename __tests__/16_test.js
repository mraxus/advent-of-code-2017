const { danceMoves } = require('../16')

describe('Day 16', () => {
  const input = 's1,x3/4,pe/b'
  const resultPart1 = 'baedc'

  test(`Expect Part 1 with input '${input}' to result in ${resultPart1}`, () => {
    expect(danceMoves('abcde', input)).toBe(resultPart1)
  })
})
