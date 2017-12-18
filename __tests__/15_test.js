const { generatorMatches, betterGeneratorMatches } = require('../15')

describe('Day 15', () => {
  const input = { a: 65, b: 8921 }
  const resultPart1 = 588
  const resultPart2 = 309

  test(`Expect Part 1  to result in ${resultPart1}`, () => {
    expect(generatorMatches(input.a, input.b)).toBe(resultPart1)
  })

  test(`Expect Part 2 (node group counter) to result in ${resultPart2}`, () => {
    expect(betterGeneratorMatches(input.a, input.b)).toBe(resultPart2)
  })
})
