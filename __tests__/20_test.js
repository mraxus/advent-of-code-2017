const { minDeviationFromOrigo, countNonCollisions } = require('../20')

describe('Day 20', () => {
  const resultPart1 = 0
  const resultPart2 = 1

  test(`Expect Part 1 should result in ${resultPart1}`, () => {
    const input = 'p=< 3,0,0>, v=< 2,0,0>, a=<-1,0,0>|p=< 4,0,0>, v=< 0,0,0>, a=<-2,0,0>'
    expect(minDeviationFromOrigo(input)).toBe(resultPart1)
  })
  test(`Expect Part 2 should result in ${resultPart2}`, () => {
    const input = 'p=<-6,0,0>, v=< 3,0,0>, a=< 0,0,0>|p=<-4,0,0>, v=< 2,0,0>, a=< 0,0,0>|p=<-2,0,0>, v=< 1,0,0>, a=< 0,0,0>|p=< 3,0,0>, v=<-1,0,0>, a=< 0,0,0>'
    expect(countNonCollisions(input)).toBe(resultPart2)
  })
})
