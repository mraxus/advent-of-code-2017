const { getBaseDiscName, getProperWeightOfWrongDisc } = require('../07')

describe('Day 7', () => {
  const input = 'pbga (66)|xhth (57)|ebii (61)|havc (66)|ktlj (57)|fwft (72) -> ktlj, cntj, xhth|qoyq (66)|padx (45) -> pbga, havc, qoyq|tknk (41) -> ugml, padx, fwft|jptl (61)|ugml (68) -> gyxo, ebii, jptl|gyxo (61)|cntj (57)'
  const resultPart1 = 'tknk'
  const resultPart2 = 60

  test(`Expect Part 1 (base disc name) to be ${resultPart1}`, () => {
    expect(getBaseDiscName(input)).toBe(resultPart1)
  })
  test(`Expect Part 2 (corrected wrong disc weight) to be ${resultPart2}`, () => {
    expect(getProperWeightOfWrongDisc(input)).toBe(resultPart2)
  })
})
