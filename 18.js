const input = 'set i 31,set a 1,mul p 17,jgz p p,mul a 2,add i -1,jgz i -2,add a -1,set i 127,set p 622,mul p 8505,mod p a,mul p 129749,add p 12345,mod p a,set b p,mod b 10000,snd b,add i -1,jgz i -9,jgz a 3,rcv b,jgz b -1,set f 0,set i 126,rcv a,rcv b,set p a,mul p -1,add p b,jgz p 4,snd a,set a b,jgz 1 3,snd b,set f 1,add i -1,jgz i -11,snd a,jgz f -16,jgz a -19'


function recoveredValue(input) {
  const registry = {}
  let lastPlayed = 0

  const execute = (line) => {
    const [instr, X, Y] = line.split(' ')
    if (registry[X] === undefined) registry[X] = 0

    const get = (key) => {
      if (Number.isInteger(parseInt(key))) {
        return +key
      } else {
        return registry[key] || 0
      }
    }

    switch (instr) {
      case 'snd':
        lastPlayed = registry[X]
        break
      case 'set':
        registry[X] = get(Y)
        break
      case 'add':
        registry[X] = registry[X] + get(Y)
        break
      case 'mul':
        registry[X] = registry[X] * get(Y)
        break
      case 'mod':
        registry[X] = registry[X] % get(Y)
        break
      case 'rcv':
        if (registry[X]) {
          return false // Done, no more to do
        }
        break
      case 'jgz':
        if (registry[X] > 0) {
          return get(Y) // Returns the instruction offset
        }
        break
    }

    return 1 // Returns the instruction offset
  }

  const instructions = input.split(',')
  let position = 0

  while (true) {
    const offset = execute(instructions[position])

    if (offset === false) {
      return lastPlayed
    }

    position += offset
  }
}

const Process = function(initialRegistry, instructionSet) {
  this.instructionSet = instructionSet
  this.instructions = instructionSet.length
  this.position = 0
  this.receiveQueue = []
  this.registry = initialRegistry
  this.sentCount = 0
  this.sendQueue = []
  this.waitingForInput = false
}

Process.prototype.execute = function() {
  while (this.processInstruction()) { }
}

Process.prototype.isWaitingForInput = function() {
  return this.waitingForInput && this.receiveQueue.length === 0
}

Process.prototype.processInstruction = function() {
  const { command, X, Y } = this.instructionSet[this.position]
  let posDelta = 1

  const get = (valOrReg) => {
    if (typeof valOrReg === 'number') {
      return valOrReg
    }
    return this.registry[valOrReg] || 0
  }

  switch (command) {
    case 'set': this.registry[X]  = get(Y); break
    case 'add': this.registry[X] += get(Y); break
    case 'mul': this.registry[X] *= get(Y); break
    case 'mod': this.registry[X] %= get(Y); break

    case 'jgz':
      if (get(X) > 0) {
        posDelta = get(Y)
      }
      break

    case 'rcv':
      if (this.receiveQueue.length === 0) {
        this.waitingForInput = true
        return false
      }
      this.registry[X] = this.receiveQueue.shift()
      break

    case 'snd':
      this.sentCount += 1
      this.sendQueue.push(get(X))
      break
  }
  this.waitingForInput = false
  this.position += posDelta

  return true
}

function duet(input) {
  const instructionSet = input.split(',')
    .map(line => line.split(' '))
    .map(([command, X, Y ], index) => ({
      command,
      index,
      X: (+X == X ? +X : X),
      Y: (+Y == Y ? +Y : Y),
    }))

  const p0 = new Process({ p: 0 }, instructionSet)
  const p1 = new Process({ p: 1 }, instructionSet)

  p0.receiveQueue = p1.sendQueue
  p1.receiveQueue = p0.sendQueue

  while (true) {
    p0.execute()
    p1.execute()

    if (p0.isWaitingForInput() && p1.isWaitingForInput()) {
      break
    }
  }

  return p1.sentCount
}

if (require.main === module) {
  console.log('Part 1 (recovered value):', recoveredValue(input))
  console.log('Part 2 (multi task communication):', duet(input))
}

module.exports = {
  recoveredValue,
  duet,
}
