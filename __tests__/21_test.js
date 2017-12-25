const { countMatrixOn } = require('../21')

describe('Day 21', () => {
  const resultPart1 = 12

  test(`Expect Part 1 to result in ${resultPart1}`, () => {
    const input = '../.# => ##./#../...|.#./..#/### => #..#/..../..../#..#'
    expect(countMatrixOn(input, 2)).toBe(resultPart1)
  })
})
