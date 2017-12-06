const components = {
  text: require('./components/text')
}

const hooks = Object.keys(components).reduce(function (pre, key) {
  return Object.assign(pre, components[key])
}, {})

module.exports = hooks
