const get = require('../09')

describe('Day 9', () => {
  const groupExamples = [
    {input: '{}', result: 1},
    {input: '{{{}}}', result: 6},
    {input: '{{},{}}', result: 5},
    {input: '{{{},{},{{}}}}', result: 16},
    {input: '{<a>,<a>,<a>,<a>}', result: 1},
    {input: '{{<ab>},{<ab>},{<ab>},{<ab>}}', result: 9},
    {input: '{{<!!>},{<!!>},{<!!>},{<!!>}}', result: 9},
    {input: '{{<a!>},{<a!>},{<a!>},{<ab>}}', result: 3},
  ]
  const garbageExamples = [
    {input: '<>', removed: 0},
    {input: '<random characters>', removed: 17},
    {input: '<<<<>', removed: 3},
    {input: '<{!>}>', removed: 2},
    {input: '<!!>', removed: 0},
    {input: '<!!!>>', removed: 0},
    {input: '<{o"i!a,<{i<a>', removed: 10},
  ]

  groupExamples.forEach(({input, result}) => {
    test(`testAll with input "${input}" to be ${result}`, () => {
      const {score} = get(input)
      expect(score).toBe(result)
    })
  })

  garbageExamples.forEach(({input, removed}) => {
    test(`verify garbage disposal of "${input}"`, () => {
      const {garbageRemoved} = get(input)
      expect(garbageRemoved).toBe(removed)
    })
  })
})
