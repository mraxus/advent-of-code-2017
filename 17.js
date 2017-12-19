const LOG = false
const TIME = true
const input = 335
const log = (LOG ? console.log : () => (0))
const time = (TIME ? console.time : () => (0))
const timeEnd = (TIME ? console.timeEnd : () => (0))

function P(ring, pos) {
  return ring.map((x, i) => {
    if (i === pos) { return `(${x})` }
                     return ` ${x} `
  }).join('')
}

function spinlockNaive(input, INSERTIONS) {
  let pos = 0
  let ring = [0]
  let posis = { 0: 0}

  for (let i = 0; i < INSERTIONS; i += 1) {
    log(`\nRound ${i + 1}`)
    log(`  [${P(ring, pos)}] -> ${input}`)

    pos = (pos + input) % ring.length

    log(`  [${P(ring, pos)}]`)

    posis[ring.length] = pos + 1
    ring = ring.slice(0, pos + 1).concat([ring.length], ring.slice(pos + 1))
    pos += 1

    log(`  [${P(ring, pos)}]`)
  }

  log('\nResults:')
  log(`  [${P(ring, pos)}]`)
  log(`  [${P(
    ring.map((key) => posis[key])
  )}]`)

  return ring[(pos + 1) % ring.length]
}

function spinlockLinkedList(input, INSERTIONS) {
  const log = /*() => (0)*/ console.log
  let pos = 0
  let ring = { 0: 0 }

  const move = () => { pos = ring[pos] }
  const add = (val) => {
    // const nextPos = ring[pos]
    ring[val] = ring[pos]
    ring[pos] = val
    pos = val
  }

  for (let i = 1; i <= INSERTIONS; i += 1) {
    for (let x = 0; x < input; x += 1) move()
    if ((i % 100000) === 0) {
      console.log(100 * i / INSERTIONS)
    }
    add(i)
  }

  const finalPos = pos

  // const knas = (new Array(INSERTIONS)).fill(0)
  // pos = 0
  // for (let x = 0; x <= INSERTIONS; x += 1) {
  //   knas[x] = pos
  //   move()
  // }
  //
  // console.log('\nResults:')
  // console.log(`  [${P(knas, pos)}]`)

  return { first: ring[0], next: ring[finalPos] }
}

function spinlockPreAllocated(input, INSERTIONS) {
  let pos = 0
  let ring = (new Array(INSERTIONS + 1)).fill(0)

  for (let len = 1; len <= INSERTIONS; len += 1) {
    pos = (pos + input) % len
    for (let i = len ; i > pos + 1; i -= 1) {
      ring[i] = ring[i - 1]
    }
    pos += 1
    ring[pos] = len
  }

  return ring[pos + 1]
}

function spinlock5mil0(input, INSERTIONS) {
  let pos = 0
  let ring = (new Array(INSERTIONS + 1)).fill(0)

  for (let len = 1; len <= INSERTIONS; len += 1) {
    pos = (pos + input) % len
    pos += 1
    if ((len % (1000 * 1000)) === 0) {
      console.log(len / INSERTIONS * 100)
    }
  }

  return ring[1]
}

function spinlockBackwards(input, INSERTIONS) {
  let endPos = 0
  let ring = (new Array(INSERTIONS + 1)).fill(-1)
  ring[0] = 0

  for (let len = 1; len <= INSERTIONS; len += 1) {
    endPos = (endPos + input) % len + 1
  }

  let pos = endPos
  for (let len = INSERTIONS; len > 0; len -= 1) {
    console.log(`\nRound ${len}`)
    console.log(`  [${P(ring, pos)}]`)

    let p = pos
    while (ring[p] !== -1) { p += 1 }

    if (p !== pos) console.log(`  [${P(ring, p)}]`)

    ring[p] = len

    pos -= 1

    console.log(`  [${P(ring, pos)}]`)

    pos = pos - input
    if (pos < 0) {
      console.log(`pos ${pos} -> + len ${len}`)
      pos += (len)
    }

    console.log(`  [${P(ring, pos)}] -> pos: ${pos}`)
  }

  // console.log(ring.join(' '))

  return ring[(endPos + 1) % ring.length]
}

if (require.main === module) {
  const I = 2017
  time('naive')
  console.log('Part 1 (naive):', spinlockNaive(input, I))
  timeEnd('naive')

  time('preallocated')
  console.log('Part 1 (preallocated):', spinlockPreAllocated(input, I))
  timeEnd('preallocated')

  time('linked')
  console.log('Part 1 (linked list):', spinlockLinkedList(input, I))
  timeEnd('linked')

  // console.time('3')
  // console.log('Part 1 (linked list):', spinlockLinkedList(input, 50000000))
  // console.timeEnd('3')
  // Note: Second part best tricky question so far:
  //    No need to compute all ring, just record the highest pos hitting 0
  // See spinlockLinkedList(input, 50000000) for computing all in a 'decent time' of 350s
}

module.exports = {
  spinlockNaive,
  spinlock5mil0,
}
