const input = '14/42|2/3|6/44|4/10|23/49|35/39|46/46|5/29|13/20|33/9|24/50|0/30|9/10|41/44|35/50|44/50|5/11|21/24|7/39|46/31|38/38|22/26|8/9|16/4|23/39|26/5|40/40|29/29|5/20|3/32|42/11|16/14|27/49|36/20|18/39|49/41|16/6|24/46|44/48|36/4|6/6|13/6|42/12|29/41|39/39|9/3|30/2|25/20|15/6|15/23|28/40|8/7|26/23|48/10|28/28|2/13|48/14'

function Component(input, index) {
  this._ports = input.split('/').map(i => +i)
  this.a = this._ports[0]
  this.b = this._ports[1]
  this.index = index
  this.opposite = (port) => {
    if (port === this.a) return this.b
    if (port === this.b) return this.a
    throw new Error('No matching ports')
  }
  this.str = input
  this.strength = this.a + this.b
}

function setupBridges(input) {
  const components = input.split('|').map((x, i) => new Component(x, i))
  const ports = components.reduce((res, comp, index) => {
    if (!res[comp.a]) { res[comp.a] = [] }
    if (!res[comp.b]) { res[comp.b] = [] }

    res[comp.a].push(comp)
    res[comp.b].push(comp)

    // console.log(res)

    return res
  }, {})

  return {
    bridgeStrengths: {}, // ( '0/1--10/1--9/10' => 31 )
    components,
    longest: 0,
    strongest: 0,
    strongestOfLongest: 0,
    used: {}, // ( index => true )
    ports,
  }
}
function addLevel(depth, port, setup, strength, path) {
  const { bridgeStrengths, ports, used } = setup
  if (!ports[port]) return

  ports[port]
    .filter(c => !used[c.index])
    .forEach(component => {
      const index = component.index
      const p = path + '-' + component.str
      const s = strength + component.strength

      bridgeStrengths[p] = s

      if (s > setup.strongest) { setup.strongest = s }
      if (depth > setup.longest) {
        setup.longest = depth
        setup.strongestOfLongest = s
      } else if (depth === setup.longest && s > setup.strongestOfLongest) {
        setup.strongestOfLongest = s
      }

      used[index] = true
      addLevel(depth + 1, component.opposite(port), setup, s, p)
      delete used[index]
    })
}

function getBridgeCompositions(input) {
  const setup = setupBridges(input)

  addLevel(1, 0, setup, 0, '')

  return {
    strongest: setup.strongest,
    strongestOfLongest: setup.strongestOfLongest,
  }
}

if (require.main === module) {
  const { strongest, strongestOfLongest } = getBridgeCompositions(input)
  console.log('Part 1 (strongest bridge):', strongest)
  console.log('Part 2 (strongest of the longest bridge):', strongestOfLongest)
}

module.exports = {
  getBridgeCompositions,
}
