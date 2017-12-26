const input = 265149

/*

  65  64  63  62  61  60  59  58  57
  66  37  36  35  34  33  32  31  56
  67  38  17  16  15  14  13  30  55
  68  39  18   5   4   3  12  29  54
  69  40  19   6   1   2  11  28  53
  70  41  20   7   8   9  10  27  52
  71  42  21  22  23  24  25  26  51
  72  43  44  45  46  47  48  49  50
  73  74  75  76  77  78  79  80  81

*/

function totalSteps(input) {
  if (input === 1) return 0

  const sqrt = Math.floor(Math.sqrt(input - 1))
  const innerRing = sqrt - ((sqrt - 1) % 2)
  const outerRing = innerRing + 2
  const stepsToRing = (outerRing-1)/2

  const maxNumForNextOuterRing = innerRing*innerRing
  const maxNumForOuterRing = outerRing*outerRing
  const sideLengthMinusOne = (maxNumForOuterRing-maxNumForNextOuterRing) / 4
  const deltaStepsBetweenSideAndNum = (maxNumForOuterRing - input) % sideLengthMinusOne
  const stepsRingToFinalNum = Math.abs(deltaStepsBetweenSideAndNum - stepsToRing)

  return stepsToRing + stepsRingToFinalNum
}

function largerValue(input) {
  const matrix = {}
  const getM = (x, y) => matrix[`${x},${y}`] || 0
  const setM = (x, y, value) => { matrix[`${x},${y}`] = value }
  const getSum = (x, y) => (
    getM(x-1, y+1) + getM(x  , y+1) + getM(x+1, y+1) +
    getM(x-1, y  )         +          getM(x+1, y  ) +
    getM(x-1, y-1) + getM(x  , y-1) + getM(x+1, y-1)
  )

// Initialize Origo
  setM(0,0,1)

  let dir = 3

  const dx = () => Math.round(Math.cos(dir*Math.PI/2))
  const dy = () => Math.round(Math.sin(dir*Math.PI/2))

  let steps = 1
  let sum = 1

  let x = 0
  let y = 0

  while (sum <= input) {
    // Check for directional change
    if (x === y || (x < 0 && x === -y) || (x > 0 && x === 1-y)) {
      dir += 1
    }

    x += dx()
    y += dy()
    steps++

    sum = getSum(x, y)
    setM(x, y, sum)
  }

  return sum
}

if (require.main === module) {
  console.log('Part 1 (total steps):', totalSteps(input))
  console.log('Part 2 (first larger value):', largerValue(input))
}

module.exports = {
  totalSteps,
  largerValue,
}