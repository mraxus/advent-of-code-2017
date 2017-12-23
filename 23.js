const input = 'set b 65|set c b|jnz a 2|jnz 1 5|mul b 100|sub b -100000|set c b|sub c -17000|set f 1|set d 2|set e 2|set g d|mul g e|sub g b|jnz g 2|set f 0|sub e -1|set g e|sub g b|jnz g -8|sub d -1|set g d|sub g b|jnz g -13|jnz f 2|sub h -1|set g b|sub g c|jnz g 2|jnz 1 3|sub b -17|jnz 1 -23'

/**
 00    b  = 65                                              set b 65
 01    c  = b                                               set c b
 02    if (a) jmp   ---+                                    jnz a 2
 03    jmp          ---|--+                                 jnz 1 5
 04    b *= 100    <---+  |                                 mul b 100
 05    b += 100,000       |                                 sub b -100000
 06    c  = b             |                                 set c b
 07    c += 17,000        |                                 sub c -17000
 08    f  = 1      <------+  <-----+                        set f 1
 09    d  = 2                      |                        set d 2
 10    e  = 2      <-----------+   |                        set e 2
 11    g  = d      <-------+   |   |                        set g d
 12    g *= e              |   |   |                        mul g e
 13    g -= b              |   |   |                        sub g b
 14    if (g) jmp   ----+  |   |   |                        jnz g 2
 15    f  = 0           |  |   |   |                        set f 0
 16    e += 1      <----+  |   |   |                        sub e -1
 17    g  = e              |   |   |                        set g e
 18    g -= b              |   |   |                        sub g b
 19    if (g) jmp   -------+   |   |                        jnz g -8
 20    d += 1                  |   |                        sub d -1
 21    g  = d                  |   |                        set g d
 22    g -= b                  |   |                        sub g b
 23    if (g) jmp   -----------+   |                        jnz g -13
 24    if (f) jmp   --+            |                        jnz f 2
 25    h += 1         |            |                        sub h -1
 26    g  = b      <--+            |                        set g b
 27    g -= c                      |                        sub g c
 28    if (g) jmp   --+            |       \                jnz g 2
 29    exit ----------|--------------------->               jnz 1 3
 30    b += 17     <--+            |       /                sub b -17
 31    jmp -23      ---------------+                        jnz 1 -23
 */

function parseInstructions(input) {
  return input.split('|')
    .map(line => {
      const [instr, X, Y] = line.split(' ')
      return { instr, X, Y }
      }
    )
}

function setupProcessor(input, valueOfA = 0) {
  return {
    counts: { set: 0, sub: 0, mul: 0, jnz: 0 },
    instructions: parseInstructions(input),
    registry: { a: valueOfA, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0 },
    pos: 0,
  }
}

function execute(processor) {
  const { instructions, registry, pos } = processor

  if (pos < 0 || pos >= instructions.length) {
    return false
  }

  const { instr, X, Y } = instructions[pos]

  const get = function (regOrVal) {
    if (Number.isInteger(parseInt(regOrVal))) {
      return +regOrVal
    } else {
      return processor.registry[regOrVal] || 0
    }
  }

  switch (instr) {
    case 'set':
      registry[X] = get(Y)
      processor.pos += 1
      break
    case 'sub':
      registry[X] -= get(Y)
      processor.pos += 1
      break
    case 'mul':
      registry[X] *= get(Y)
      processor.pos += 1
      break
    case 'jnz':
      if (get(X) !== 0) {
        processor.pos += get(Y)
      } else {
        processor.pos += 1
      }
      break
  }

  processor.counts[instr] += 1

  return true
}

function timesMultiplied(input) {
  const processor = setupProcessor(input)

  while(execute(processor));

  return processor.counts.mul
}

function getCompositeNumbers() {
  const len = 123600
  let a = (new Array(len)).fill(false)

  for (let i = 2; i < len; i += 1) {
    if (!a[i]) {
      for (let x = i * i; x < len; x += i)
        a[x] = true
    }
  }

  return a
}

function simpleAlg(compositeNumbers) {
  let h = 0
  let b = 65 * 100 + 100000
  let c = b + 17000

  while (true) {
    if (compositeNumbers[b]) {
      h = h + 1
    }
    if (b === c) break
    b += 17
  }

  // console.log('\nh:', h)
  // console.log(`a: ${a}, b: ${b}, c: ${c}, d: ${d}, e: ${e}, f: ${f}, g: ${g}, h: ${h}\n\n`)

  return h
}

function crazyAlg() {
  let d, e, f, g
  let a=1
  let b=65, c=65, h=0

  if (a !== 0) {
    b = 106500
    c = 123500
  }

  do {
    f = false	// line 08
    d = 2

    // console.log(`a: ${a}, b: ${b}, c: ${c}, d: ${d}, e: ${e}, f: ${f}, g: ${g}, h: ${h}`)
    for (d = 2; d < b && !f; d += 1) {

      e = b / d
      if (Number.isInteger(e) && e > 1) {
        f = true
        break
      }

      // for (e = 2; e < b && !f; e += 1) {
      //   if (d * e === b) {
      //     f = true
      //   } else if (d * e > b) break
      // }
    }

    // do {
    //   e = 2
    //   do {
    //     if (d * e === b) {
    //       f = true
    //       break
    //     }
    //     if (d * e > b) break
    //     e = e + 1 // line 16
    //   } while (e !== b) // line 19
    //   if (f) { break }
    //
    //   d = d + 1
    //  } while (d !== b) // line 23

    if (f === true) {
      h = h + 1
    }
    b += 17
  } while (b <= c)

  // console.log('\nh:', h)
  // console.log(`a: ${a}, b: ${b}, c: ${c}, d: ${d}, e: ${e}, f: ${f}, g: ${g}, h: ${h}\n\n`)

  return h
}

function valueOfH(input) {
  const processor = setupProcessor(input, 1)
  let ticks = 1e7

  console.log('\n')
  console.log(processor.registry)
  console.log('\n')

  while(execute(processor) && --ticks) {

    if (processor.pos === 9) break
    if (processor.pos === 19)
    console.log('pos: ', processor.pos,
      Object.keys(processor.registry)
        .map(k => `${k}: ${processor.registry[k]}`)
        .join(', ')
    )
  }

  console.log(processor.registry)

  return processor.registry.h
}

if (require.main === module) {
  let h
  console.time('simple')
  h = simpleAlg(getCompositeNumbers())
  console.timeEnd('simple')
  console.log(`Result: ${h}`)

  console.time('crazy')
  h = crazyAlg()
  console.timeEnd('crazy')
  console.log(`Result: ${h}`)

  console.log('Part 1 (times multiplied):', timesMultiplied(input))
  console.log('Part 2 (value of h):', h)
}

module.exports = {
  timesMultiplied,
}
