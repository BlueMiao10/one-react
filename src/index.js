import React from "./lib/react";
import ReactDom from "./lib/react-dom";


class App extends React.component {
  constructor(props) {
    super(props);
    this.states = {
      title:"BlueMiao"
    }
  }
  handleClick() {
    this.setState({
      title: 'Blue'
    })
  }

  render() {
    //我们在渲染时，会创建真实的DOM节点，会把虚拟DOM中的属性与真实的DOM节点做一个绑定，当我们触发这个事件时，这个this是DOM节点，而不是这个组件
    return (
      <div>
        <h1>{this.states.title}</h1>
        <span onClick={this.handleClick.bind(this)}>hello world</span>
      </div>
    )
  }
}

let styleObj = {
  color: 'blue',
  fontSize: '30px'
};

ReactDom.render((
  <App id='app' style={styleObj}>hello</App>
), document.body);