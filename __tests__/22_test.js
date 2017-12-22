const { infectionsAfterBursts, infectionsAfterBurstsAdvanced } = require('../22')

describe('Day 22', () => {
  const input = '..#|#..|...'
  const resultPart1 = 5587

  test(`Expect Part 1 to result in ${resultPart1}`, () => {
    expect(infectionsAfterBursts(input, 10000)).toBe(resultPart1)
  });

  [
    { bursts: 100, result: 26 },
    { bursts: 10000000, result: 2511944 },
  ].forEach(({ bursts, result }) => {
    test(`Expect Part 2 with ${bursts} bursts to result in ${result}`, () => {
      expect(infectionsAfterBurstsAdvanced(input, bursts)).toBe(result)
    })
  })
})
