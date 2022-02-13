import React from "./lib/react";
import ReactDom from "./lib/react-dom";

class Menu extends React.component {
  render() {
    return (
      <h2>你好 {this.props.title}</h2>
    )
  }
}

class App extends React.component {
  constructor(props) {
    super(props);
    this.state = {
      title: "BlueMiao"
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
        <h1>{this.state.title}</h1>
        <Menu title={this.state.title}/>
        <p>{this.props.id}</p>
        <span onClick={this.handleClick.bind(this)}>hello world</span>
      </div>
    )
  }
}

ReactDom.render((
  <App id="app"/>
), document.body);