import ReactDom from "./react-dom";

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
    this.state = {}
  }

  setState(newState) {
    Object.assign(this.state, newState)
    ReactDom.renderComponent(this)
  }
}

const React = {
  createElement,
  component
}

export default React