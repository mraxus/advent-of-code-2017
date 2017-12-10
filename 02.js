const input = '179 2358 5197 867 163 4418 3135 5049 187 166 4682 5080 5541 172 4294 1397\n2637 136 3222 591 2593 1982 4506 195 4396 3741 2373 157 4533 3864 4159 142\n1049 1163 1128 193 1008 142 169 168 165 310 1054 104 1100 761 406 173\n200 53 222 227 218 51 188 45 98 194 189 42 50 105 46 176\n299 2521 216 2080 2068 2681 2376 220 1339 244 605 1598 2161 822 387 268\n1043 1409 637 1560 970 69 832 87 78 1391 1558 75 1643 655 1398 1193\n90 649 858 2496 1555 2618 2302 119 2675 131 1816 2356 2480 603 65 128\n2461 5099 168 4468 5371 2076 223 1178 194 5639 890 5575 1258 5591 6125 226\n204 205 2797 2452 2568 2777 1542 1586 241 836 3202 2495 197 2960 240 2880\n560 96 336 627 546 241 191 94 368 528 298 78 76 123 240 563\n818 973 1422 244 1263 200 1220 208 1143 627 609 274 130 961 685 1318\n1680 1174 1803 169 450 134 3799 161 2101 3675 133 4117 3574 4328 3630 4186\n1870 3494 837 115 1864 3626 24 116 2548 1225 3545 676 128 1869 3161 109\n890 53 778 68 65 784 261 682 563 781 360 382 790 313 785 71\n125 454 110 103 615 141 562 199 340 80 500 473 221 573 108 536\n1311 64 77 1328 1344 1248 1522 51 978 1535 1142 390 81 409 68 352'

function checksum(input) {
  return input.split('\n')
    .map(line => {
      const numbers = line.split(' ')
        .map(i => +i)
        .sort((a, b) => a-b)

      return numbers[numbers.length-1] - numbers[0];
    })
    .reduce((total, score) => total + score, 0)
}

function evenly(input) {
  return input.split('\n')
    .map(line => {
      const numbers = line.split(' ')
        .map(i => +i)

      for (const nom of numbers)
        for (const denom of numbers)
          if (nom > denom && 0 === nom / denom % 1)
            return nom / denom
    } )
    .reduce((total, score) => total + score, 0)
}

if (require.main === module) {
  console.log('Part 1 (checksum):', checksum(input)) // 39126
  console.log('Part 2 (evenly divisible values):', evenly(input)) // 258
}

module.exports = {
  checksum,
  evenly,
}
