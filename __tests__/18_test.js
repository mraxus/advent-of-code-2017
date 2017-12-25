const { recoveredValue, duet } = require('../18')

describe('Day 18', () => {
  const inputPart1 = 'set a 1,add a 2,mul a a,mod a 5,snd a,set a 0,rcv a,jgz a -1,set a 1,jgz a -2'
  const resultPart1 = 4

  const inputPart2 = 'snd 1,snd 2,snd p,rcv a,rcv b,rcv c,rcv d'
  const resultPart2 = 3

  test(`Expect Part 1 to result in ${resultPart1}`, () => {
    expect(recoveredValue(inputPart1)).toBe(resultPart1)
  })

  test(`Expect Part 2 that process 1 sends ${resultPart2} values`, () => {
    expect(duet(inputPart2)).toBe(resultPart2)
  })
})
