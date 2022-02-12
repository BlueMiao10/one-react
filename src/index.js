const React = {
  createElement(tag,attrs,...children) {
    return {
      tag,
      attrs,
      children
    }
  }
};

function render(vDom,container){
  let node
  if(typeof vDom === 'string'){
    node = document.createTextNode(vDom)
  }
  if (typeof vDom === 'object'){
    node = document.createElement(vDom.tag)
    vDom.children.forEach(childVDom => render(childVDom,node))
  }
  container.appendChild(node)
}

const ReactDom = {
  render(vDom, container) {
    container.innerHTML = '';
    render(vDom, container);
  }
}

let div = (<div className="header">
  <span>hello world</span>
  <br/>
  <span>一起向未来</span>
</div>);
  console.log(div)

ReactDom.render(div,document.body)