const React = {
  createElement(tag,attrs,...children) {
    return{
      tag,
      attrs,
      children
    }
  }
};

let div = (<div className="header">hello world
  <span>sha</span>
</div>);
  console.log(div)