const input = 335

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

function spinlockFirstPos(input, INSERTIONS) {
  let pos = 0
  let firstPos = -1

  for (let len = 1; len <= INSERTIONS; len += 1) {
    pos = (pos + input) % len
    if (pos === 0) firstPos = len
    pos += 1
  }

  return firstPos
}

if (require.main === module) {
  console.log('Part 1 (number after 2017):', spinlockPreAllocated(input, 2017))
  console.log('Part 2 (first num for 50 mils):', spinlockFirstPos(input, 50000000))
  // Note: Second part best tricky question so far:
  //    No need to compute all ring, just record the highest pos hitting 0
}

module.exports = {
  spinlockPreAllocated,
  spinlockFirstPos,
}
