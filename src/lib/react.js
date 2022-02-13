const createElement = function (tag, attrs, ...children) {
  return {
    tag,
    attrs,
    children
  }
}

class component {
  constructor(props) {
    this.props = props
    this.states = {}
  }

  setState(newState) {
    Object.assign(this.states, newState)
  }
}

const React = {
  createElement,
  component
}

export default React