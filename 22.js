const input = '.###.#.#####.##.#...#....|..####.##.##.#..#.....#..|.#####.........#####..###|#.#..##..#.###.###.#.####|.##.##..#.###.###...#...#|#.####..#.#.##.##...##.##|..#......#...#...#.#....#|###.#.#.##.#.##.######..#|###..##....#...##....#...|###......#..#..###.#...#.|#.##..####.##..####...##.|###.#.#....######.#.###..|.#.##.##...##.#.#..#...##|######....##..##.######..|##..##.#.####.##.###.#.##|#.###.#.##....#.##..####.|#.#......##..####.###.#..|#..###.###...#..#.#.##...|#######..#.....#######..#|##..##..#..#.####..###.#.|..#......##...#..##.###.#|....##..#.#.##....#..#.#.|..#...#.##....###...###.#|#.#.#.#..##..##..#..#.##.|#.####.#......#####.####.'

/**
 * Grid coordinates:
 *
 * (-1, 1) ( 0, 1) ( 1, 1)
 * (-1, 0) ( 0, 0) ( 1, 0)
 * (-1,-1) ( 0,-1) ( 1,-1)
 **/

function s(pos) { return `${pos.x},${pos.y}` }

function setupBoard(input) {
  const grid = {}
  const rows = input.split('|')
  const offset = Math.floor(rows.length / 2)
  const board = {
    grid,
    pos: { x: 0, y: 0 },
    dir: { x: 0, y: 1 },
    cleaned: 0,
    flagged: 0,
    infected: 0,
    weakened: 0,
  }

  rows.forEach((line, y) => {
    line.split('').forEach((char, x) => {
      if (char !== '#') return
      grid[s({ x: x - offset, y: offset - y })] = '#'
    })
  })

  return board
}

function infectionsAfterBursts(input, bursts) {
  const board = setupBoard(input)

  function burst(board) {
    const isInfected = (board.grid[s(board.pos)] === '#')

    // 1: Turn
    if (isInfected) { // Right
      board.dir = { x: board.dir.y, y: -board.dir.x }
    } else {  // Left
      board.dir = { x: -board.dir.y, y: board.dir.x }
    }

    // 2: Infect/clean
    if (isInfected) {
      delete board.grid[s(board.pos)]
      board.cleaned += 1
    } else {
      board.grid[s(board.pos)] = '#'
      board.infected += 1
    }

    // 3: move
    board.pos.x += board.dir.x
    board.pos.y += board.dir.y
  }

  for (let i = 0; i < bursts; i += 1) {
    burst(board)
  }

  return board.infected
}

function infectionsAfterBurstsAdvanced(input, bursts) {
  const board = setupBoard(input)

  function burst(board) {
    const pos = s(board.pos)
    const state = board.grid[pos] || '.'

    // 1: Turn
    if (state === '#') { // Right
      board.dir = { x: board.dir.y, y: -board.dir.x }
    } else if (state === '.') {  // Left
      board.dir = { x: -board.dir.y, y: board.dir.x }
    } else if (state === 'F') {  // Turnaround
      board.dir = { x: -board.dir.x, y: -board.dir.y }
    } // else 'W' continue ahead

    // 2: Infect/clean
    if (state === '.') {
      board.grid[pos] = 'W'
      board.weakened += 1
    } else if (state === 'W') {
      board.grid[pos] = '#'
      board.infected += 1
    } else if (state === '#') {
      board.grid[pos] = 'F'
      board.flagged += 1
    } else {
      delete board.grid[pos]
      board.cleaned += 1
    }

    // 3: move
    board.pos.x += board.dir.x
    board.pos.y += board.dir.y
  }

  for (let i = 0; i < bursts; i += 1) {
    burst(board)
  }

  return board.infected
}

if (require.main === module) {
  console.log('Part 1 (infections after 10k bursts):', infectionsAfterBursts(input, 10000))
  console.log('Part 2 (infections after 10mil bursts):', infectionsAfterBurstsAdvanced(input, 10000000))
}

module.exports = {
  infectionsAfterBursts,
  infectionsAfterBurstsAdvanced,
}
