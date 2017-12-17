const { asciiKnotHash } = require('./10')

const input = 'nbysizxe'

function countUsedSquares(input) {
  return (new Array(128)).fill(0)
    .map((_, i) => `${input}-${i}`)
    .map(asciiKnotHash)
    .map(str => str
      .split('')
      .map(s => parseInt(s, 16).toString(2))
      .join('')
      .split('')
      .filter(b => b === '1')
      .length
    )
    .reduce((sum, row) => sum + row, 0)
}
function fillRegion(m, x, y, r) {
  if (m[y][x] === '1') {
    m[y][x] = '.'
    fillRegion(m, x, Math.max(y - 1, 0), r)   // Up
    fillRegion(m, Math.max(x - 1, 0), y, r)   // Left
    fillRegion(m, x, Math.min(y + 1, m.length - 1), r) // Down
    fillRegion(m, Math.min(x + 1, m.length - 1), y, r) // Right
  }
}
function countUsedRegions(input) {
  const matrix = (new Array(128)).fill(0)
    .map((_, i) => `${input}-${i}`)
    .map(asciiKnotHash)
    .map(str => str
      .split('')
      .map(s => parseInt(s, 16).toString(2))
      .map(s => '0000'.slice(s.length) + s)
      .join('')
      .split('')
    )

  let regions = 0
  for (let y = 0; y < 128; y++) {
    for (let x = 0; x < 128; x++) {
      if (matrix[y][x] === '1') {
        fillRegion(matrix, x, y, regions)
        regions++
      }
    }
  }

  return regions
}

if (require.main === module) {
  console.log('Part 1 (used squares):', countUsedSquares(input))
  console.log('Part 2 (used regions):', countUsedRegions(input))
}

module.exports = {
  countUsedSquares, countUsedRegions
}
