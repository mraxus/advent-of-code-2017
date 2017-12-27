const { spawn } = require('child_process');

const assignments = [
  { filename: '01.js', title: 'Day 1: Inverse Captcha' },
  { filename: '02.js', title: 'Day 2: Corruption Checksum' },
  { filename: '03.js', title: 'Day 3: Spiral Memory' },
  { filename: '04.js', title: 'Day 4: High-Entropy Passphrases' },
  { filename: '05.js', title: 'Day 5: A Maze of Twisty Trampolines, All Alike' },
  { filename: '06.js', title: 'Day 6: Memory Reallocation' },
  { filename: '07.js', title: 'Day 7: Recursive Circus' },
  { filename: '08.js', title: 'Day 8: I Heard You Like Registers' },
  { filename: '09.js', title: 'Day 9: Stream Processing' },
  { filename: '10.js', title: 'Day 10: Knot Hash' },
  { filename: '11.js', title: 'Day 11: Hex Ed' },
  { filename: '12.js', title: 'Day 12: Digital Plumber' },
  { filename: '13.js', title: 'Day 13: Packet Scanners' },
  { filename: '14.js', title: 'Day 14: Disk Defragmentation' },
  { filename: '15.js', title: 'Day 15: Dueling Generators' },
  { filename: '16.js', title: 'Day 16: Permutation Promenade' },
  { filename: '17.js', title: 'Day 17: Spinlock' },
  { filename: '18.js', title: 'Day 18: Duet' },
  { filename: '19.js', title: 'Day 19: A Series of Tubes' },
  { filename: '20.js', title: 'Day 20: Particle Swarm' },
  { filename: '21.js', title: 'Day 21: Fractal Art' },
  { filename: '22.js', title: 'Day 22: Sporifica Virus' },
  { filename: '23.js', title: 'Day 23: Coprocessor Conflagration' },
  { filename: '24.js', title: 'Day 24: Electromagnetic Moat' },
  { filename: '25.js', title: 'Day 25: The Halting Problem, Part 1' },
]
const white = (text) => `\x1b[38;2;255;255;255m${text}\x1b[0m`
const gray = (text) => `\x1b[38;2;178;178;178m${text}\x1b[0m`
const yellow = (text) => `\x1b[38;2;255;255;106m${text}\x1b[0m`
const orange = (text) => `\x1b[38;2;255;153;0m${text}\x1b[0m`
const darkGreen = (text) => `\x1b[38;2;0;153;0m${text}\x1b[0m`
const brightGreen = (text) => `\x1b[38;2;0;204;0m${text}\x1b[0m`

const aoc = brightGreen('Advent of Code 2017')
const author = orange('mraxus')
const stars = yellow('50 stars')

function formatTime([sec, nanosec]) {
  const ms = Math.round((sec * 1e9 + nanosec) / 1e6)

  if (ms < 1000)     { return brightGreen(`${ms} ms`) }
  else if(ms < 1500) { return darkGreen(`${ms} ms`) }
  else               { return darkGreen(`${ms / 1e3} sec`) }
}

function executeAssignment({filename, title}) {
  return new Promise((res, rej) => {
    const child = spawn('node', [`./${filename}`])
    let output = ''
    let dots = ''

    const time = process.hrtime()
    process.stdout.write(`${title} ${dots}`)

    title = white(title)

    let tmrID = setInterval(() => {
      dots += '.'
      process.stdout.write(`\r${title} ${dots}`)
    }, 1000)

    child.stdout.on('data', data => output += data)
    child.on('error', err => rej(err))
    child.on('close', () => {
      clearInterval(tmrID)

      console.log(`\r${title}  [${formatTime(process.hrtime(time))}]`)
      console.log(output.split('\n')
        .filter(x => x)
        .map(line => {
          const [desc, answer] = line.split(':')
          return `  ${gray(desc)}:${yellow(answer)}`
        })
        .join('\n') + '\n'
      )
      res()
    })
  })
}

const startedAt = process.hrtime()

assignments.reduce(
  (p, assignment) => p.then(() => executeAssignment(assignment)),
  Promise.resolve()
).then(() => {
  const [sec, nanosec] = process.hrtime(startedAt)
  const totalTime = darkGreen(sec + '.' + Math.round(nanosec/1e6))

  console.log(`${author} completed ${stars} in ${aoc}.`)
  console.log(`All assignments computed in ${totalTime} seconds`)
})
