const input = '0: 4|1: 2|2: 3|4: 4|6: 6|8: 5|10: 6|12: 6|14: 6|16: 8|18: 8|20: 9|22: 12|24: 8|26: 8|28: 8|30: 12|32: 12|34: 8|36: 12|38: 10|40: 12|42: 12|44: 10|46: 12|48: 14|50: 12|52: 14|54: 14|56: 12|58: 14|60: 12|62: 14|64: 18|66: 14|68: 14|72: 14|76: 14|82: 14|86: 14|88: 18|90: 14|92: 17'
const c = console.log

function tick(layers) {
  layers.filter(x => x).forEach(layer => {
    if (layer.dir === '+') {
      layer.pos += 1
      if (layer.pos + 1 === layer.range) layer.dir = '-'
    } else {
      layer.pos -= 1
      if (layer.pos === 0) layer.dir = '+'
    }
  })
}

function cycle(ranges, steps = 1) {
  ranges.forEach(layer => {
    layer.pos = (layer.pos + steps) % layer.cycle
  })
}

function func1(input) {
  const depths = input.split('|')
  const maxDepth = parseInt(depths[depths.length - 1])
  const layers = new Array(maxDepth).fill(false)

  depths.forEach(x => {
    let [ layer, range ] = x.split(': ')
    layer = +layer

    layers[layer] = {
      pos: 0,
      range: +range,
      dir: '+', // or '-'
    }
  })

  let severity = 0
  for (let depth = 0; depth <= maxDepth; depth += 1) {
    if (layers[depth].pos === 0) {
      severity += depth * layers[depth].range
    }
    tick(layers)
  }

  return severity
}

function func2(input) {
  const depths = input.split('|')
  const maxDepth = parseInt(depths[depths.length - 1])
  const layers = new Array(maxDepth).fill(false)
  let ranges = {}

  depths.forEach(x => {
    let [ layer, range ] = x.split(': ')
    layer = +layer
    range = +range

    if (!ranges[range]) {
      ranges[range] = {
        pos: 0,
        cycle: 2 * (+range - 1),
      }
    }

    layers[layer] = ranges[range]
  })

  // c('max depth', maxDepth)

  // Mutate 'ranges' obj into array
  ranges = Object.keys(ranges).map(k => ranges[k])

  let waits = 0
  for (let x = 0; x < 15000000; x += 1) {
    let caught = false

    // if (!((x+1) % 1000)) console.log(x)

    // Reset
    ranges.forEach(r => { r.pos = 0 })

    cycle(ranges, waits)

    for (let depth = 0; depth <= maxDepth; depth += 1) {
      if (layers[depth].pos === 0) {
        // c('CAUGHT', await, depth)
        caught = true
        break
      }
      cycle(ranges)
    }

    if (!caught) {
      break
    }
    waits += 1
  }

  return waits
}

if (require.main === module) {
  console.log('Part 1 (trip severity):', func1(input))
  console.log('Part 2 (# of ps delayed):', func2(input))
}

module.exports = {
  func1, func2
}
