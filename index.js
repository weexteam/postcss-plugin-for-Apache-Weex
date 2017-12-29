const postcss = require('postcss')
const hooks = require('./components')

const propArr = Object.keys(hooks)

const plugin = postcss.plugin('postcss-plugin-weex', function (opts) {
  return function (root, result) {
    root.walkRules(rule => {
      const appendDecls = []
      rule.walkDecls(decl => {
        const { prop, value } = decl
        if (propArr.indexOf(prop) > -1) {
          const styleObj = hooks[prop](value, { root, rule, decl })
          if (!styleObj) {
            return
          }
          for (const k in styleObj) {
            appendDecls.push(postcss.decl({
              prop: k,
              value: styleObj[k]
            }))
          }
        }
      })
      rule.append.apply(rule, appendDecls)
    })
  }
})

module.exports = plugin
