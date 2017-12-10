const input = '14 0 15 12 11 11 3 5 1 6 8 4 9 1 8 4'

function Memory(input) {
  this._banks = input.split(' ').map(x => +x)
  this.length = this._banks.length
}
Memory.prototype.inc = function(bank) { this._banks[bank]++ }
Memory.prototype.toString = function() { return this._banks.join('|') }
Memory.prototype.empty = function(bank) {
  const blocks = this._banks[bank]
  this._banks[bank] = 0
  return blocks
}
Memory.prototype.getBankWithMostBlocks = function () {
  let blocks = -1
  let bank = -1

  for (let i = 0; i < this.length; i++) {
    if (this._banks[i] > blocks) {
      bank = i
      blocks = this._banks[i]
    }
  }

  return bank
}
Memory.prototype.redistribute = function() {
  let bank = this.getBankWithMostBlocks()
  let blocks = this.empty(bank)

  while (blocks--) {
    bank = (bank + 1) % this.length
    this.inc(bank)
  }
}

function reallocate(input) {
  const memory = new Memory(input)
  const archive = {}
  let cycle = 0

  while (true) {
    if (archive[memory] !== undefined)
      break
    archive[memory] = cycle++
    memory.redistribute()
  }

  return {
    cycles: cycle,
    loopLength: cycle - archive[memory],
  }
}

if (require.main === module) {
  const { cycles, loopLength } = reallocate(input)
  console.log('Part 1 (cycles):', cycles) // 11137
  console.log('Part 2 (length of loop):', loopLength) // 1037
}

module.exports = {
  reallocate,
}
