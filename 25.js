const input = {
  initialState: 'A',
  steps: 12173597,
  states: {
    A: [ { value: 1, pos: +1, state: 'B' }, { value: 0, pos: -1, state: 'C' } ],
    B: [ { value: 1, pos: -1, state: 'A' }, { value: 1, pos: +1, state: 'D' } ],
    C: [ { value: 1, pos: +1, state: 'A' }, { value: 0, pos: -1, state: 'E' } ],
    D: [ { value: 1, pos: +1, state: 'A' }, { value: 0, pos: +1, state: 'B' } ],
    E: [ { value: 1, pos: -1, state: 'F' }, { value: 1, pos: -1, state: 'C' } ],
    F: [ { value: 1, pos: +1, state: 'D' }, { value: 1, pos: +1, state: 'A' } ],
  }
}

function computeChecksum(input) {
  const tape = {}
  const states = input.states
  let cursor = 0
  let state = states[input.initialState]
  let checksum = 0
  let value, nextValue

  for (let step = 0; step < input.steps; step += 1) {
    value = tape[cursor] || 0
    nextValue = state[value].value
    tape[cursor] = nextValue
    checksum += (nextValue - value)
    cursor += state[value].pos
    state = states[state[value].state]
  }

  return checksum
}

if (require.main === module) {
  console.log('Part 1 (checksum):', computeChecksum(input))
}

module.exports = {
  computeChecksum,
}
