const input = { a: 883, b: 879 }

function generatorMatches(a, b) {
  const sampleSize = 40 * 1000000
  const bits16 = Math.pow(2, 16)

  let result = 0

  for (let i = 0; i < sampleSize; i += 1) {
    a = (a * 16807) % 2147483647
    b = (b * 48271) % 2147483647

    if ((a % bits16) === (b % bits16)) {
      result += 1
    }
  }

  return result
}
function betterGeneratorMatches(a, b) {
  const sampleSize = 5 * 1000000
  const bits16 = Math.pow(2, 16)

  let result = 0

  for (let i = 0; i < sampleSize; i += 1) {
    a = (a * 16807) % 2147483647
    while ((a % 4) > 0) {
      a = (a * 16807) % 2147483647
    }

    b = (b * 48271) % 2147483647
    while ((b % 8) > 0) {
      b = (b * 48271) % 2147483647
    }

    // if ((i % 10000) === 0 ) { console.log(i)}

    // console.log('a', a, 'b', b)

    if ((a % bits16) === (b % bits16)) {
      result += 1
    }
  }

  return result
}

if (require.main === module) {
  console.log('Part 1 (counting 16 bits matches):', generatorMatches(input.a, input.b))
  console.log('Part 2 (better counting 16 bits matches):', betterGeneratorMatches(input.a, input.b))
}

module.exports = {
  generatorMatches, betterGeneratorMatches
}
