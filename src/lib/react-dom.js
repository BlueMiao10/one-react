function setAttribute(node, attrs) {
  if (!attrs) return;

  for (let key in attrs) {
    if (key.startsWith('on')) {
      node[key.toLocaleLowerCase()] = attrs[key];
    } else if (key === 'style') {
      Object.assign(node.style, attrs[key]);
    } else {
      node[key] = attrs[key];
    }
  }
}


function render(vDom, container) {
  let node
  if (typeof vDom === 'string') {
    node = document.createTextNode(vDom)
  }
  if (typeof vDom === 'object') {
    node = document.createElement(vDom.tag)
    setAttribute(node, vDom.attrs)
    vDom.children.forEach(childVDom => render(childVDom, node))
  }
  container.appendChild(node)
}

const ReactDom = {
  render(vDom, container) {
    container.innerHTML = '';
    render(vDom, container);
  }
}

export default ReactDom