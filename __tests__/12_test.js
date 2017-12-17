const { nodeCounter, nodeGroupCounter } = require('../12')

describe('Day 12: Digital Plumber', () => {
  const input = `0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5`.split('\n').join('|')
  const resultPart1 = 6
  const resultPart2 = 2

  test(`Expect Part 1 (node counter) to result in ${resultPart1}`, () => {
    expect(nodeCounter(input, 0)).toBe(resultPart1)
  })

  test(`Expect Part 2 (node group counter) to result in ${resultPart2}`, () => {
    expect(nodeGroupCounter(input)).toBe(resultPart2)
  })
})
