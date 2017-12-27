# Advent of Code 2017

A complete javascript solution to the epic adventure of http://adventofcode.com/2017


### Solutions

Each day from dec 1 to and including dec 25 there are 2 problems to solve.
Each day's solutions are presented in a file named `[day].js` (like `01.js`, `09.js` or `23.js`). 
Solutions are computed by (for example) running: `node 03.js`

For each day, the problem comes with an input "unique" to each player. This input is, for simplicity, hardcoded into the solution file.

When running the solution file, the output / answer is presented like:

```
Part 1 (total steps): 438
Part 2 (first larger value): 266330
```


### Prerequisites

To run each file, no 3rd party libs are needed, but nodeJS `>= 9.3` is recommended as es6 syntax is used.
To run test, `jest` is needed (run `npm i`)


### Testing

In most problem descriptions, test inputs / output are given.
This test data is being used in `jest` tests.

To run the test simply type: `npm test` or `npm watch`.


### Computing all solutions

Finally, there is the `index.js` that runs all solution files in series (01-25) with timings and an awesome AoC color scheme.


### Finally

Hope you find these solutions interesting. Some are prettier than others, for sure ;-) I would be more than happy to get some feedback/improvement suggestions, should you come up with any.

Big thanks to [Eric Wastl](https://twitter.com/ericwastl) for creating this adventure!