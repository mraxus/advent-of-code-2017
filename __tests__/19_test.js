const { readPlumbingMessage } = require('../19')

describe('Day 19', () => {
  const input = '     |          ,     |  +--+    ,     A  |  C    , F---|----E|--+ ,     |  |  |  D ,     +B-+  +--+ '
  const resultPart1 = 'ABCDEF'
  const resultPart2 = 38

  test(`Expect Part 1 plumbing to result in ${resultPart1}`, () => {
    expect(readPlumbingMessage(input).msg).toBe(resultPart1)
  })

  test(`Expect Part 2 plumbing to walk ${resultPart1}`, () => {
    expect(readPlumbingMessage(input).steps).toBe(resultPart2)
  })
})
