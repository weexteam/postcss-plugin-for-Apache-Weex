const hooks = {}

hooks.lines = function (value) {
  return {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitLineClamp: value
  }
}

module.exports = hooks
