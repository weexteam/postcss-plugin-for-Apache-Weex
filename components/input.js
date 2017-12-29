const postcss = require('postcss')

function getPlaceholderColorCSS (selector, placeholderColor) {
  const vendors = [
    '::-webkit-input-placeholder',
    ':-moz-placeholder',
    '::-moz-placeholder',
    ':-ms-input-placeholder',
    ':placeholder-shown'
  ]
  const css = vendors.reverse().map(function (vendor) {
    return `
${selector}${vendor} {
  color:${placeholderColor};
}`
  }).join('\n')
  return css
}

const hooks = {}

hooks['placeholder-color'] = function (value, opts) {
  const { root, rule } = opts
  const selector = rule.selector
  const css = getPlaceholderColorCSS(selector, value)
  const cssRoot = postcss.parse(css)
  const cssRules = cssRoot.nodes
  const parent = rule.parent
  for (let i = 0, l = cssRules.length; i < l; i++) {
    parent.insertAfter(rule, cssRules[i])
  }
}

module.exports = hooks
