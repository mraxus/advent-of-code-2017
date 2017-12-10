const listSize = 256
const input = '31,2,85,1,80,109,35,63,98,255,0,13,105,254,128,33'

function numericKnotHash(input, listSize) {
  const list = [...Array(listSize).keys()]
  let pos = 0
  let skipSize = 0

  input.split(',')
    .map(x => +x)
    .forEach(len => {
      for (let i = 0; i < (len - 1) / 2; i++) {
        const posA = (pos + i) % listSize
        const posB = (pos + len - 1 - i) % listSize
        const tmp = list[posA]

        list[posA] = list[posB]
        list[posB] = tmp
      }
      pos = (pos + len + skipSize) % listSize
      skipSize += 1
    })

  return list[0] * list[1]
}

function asciiKnotHash(input) {
  const listSize = 256
  const asciiPostSequence = [17, 31, 73, 47, 23]
  const list = [...Array(listSize).keys()]
  let pos = 0
  let skipSize = 0

  const lengths = input.split('')
    .map(c => c.charCodeAt(0))
    .concat(asciiPostSequence)

  for (let i = 0; i < 64; i += 1) {
    lengths.forEach(len => {
      for (let i = 0; i < (len - 1) / 2; i++) {
        const posA = (pos + i) % listSize
        const posB = (pos + len - 1 - i) % listSize
        const tmp = list[posA]

        list[posA] = list[posB]
        list[posB] = tmp
      }
      pos = (pos + len + skipSize) % listSize
      skipSize += 1
    })
  }

  return list
    .reduce((result, num) => {
      if (result[result.length - 1].length >= 16) {
        result.push([num])
      } else {
        result[result.length - 1].push(num)
      }
      return result
    }, [[]])
    .map(chunk => chunk.reduce((res, i) => res ^ i, 0))
    .map(num => Number(num).toString(16))
    .map(str => str.length === 1 ? `0${str}` : str)
    .join('')
}

if (require.main === module) {
  console.log('Part 1 (numeric knot hash):', numericKnotHash(input, listSize)) // 6952
  console.log('Part 2 (dense knot hash):', asciiKnotHash(input))
}

module.exports = {
  asciiKnotHash,
  numericKnotHash,
}
