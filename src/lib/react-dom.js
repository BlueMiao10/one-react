function setAttribute(node, attrs) {
  if (!attrs) return;

  for (let key in attrs) {
    if (attrs.hasOwnProperty(key)) {
      if (key.startsWith('on')) {
        node[key.toLocaleLowerCase()] = attrs[key];
      } else if (key === 'style') {
        Object.assign(node.style, attrs[key]);
      } else {
        node[key] = attrs[key];
      }
    }

  }
}

function render(vDom, container) {
  let node = createDomFromVDom(vDom)
  container.appendChild(node)
}

function createDomFromVDom(vDom) {
  let node
  if (typeof vDom === 'string') {
    node = document.createTextNode(vDom)
    return node
  }
  if (typeof vDom === 'object') {
    if (typeof vDom.tag === 'function') {
      let component = new vDom.tag(vDom.attrs)
      let vNode = component.render()
      node = createDomFromVDom(vNode)
    } else {
      node = document.createElement(vDom.tag)
      setAttribute(node, vDom.attrs)
      vDom.children.forEach(childVDom => render(childVDom, node))
    }
  }
  return node
}

const ReactDom = {
  render(vDom, container) {
    container.innerHTML = '';
    render(vDom, container);
  }
}

export default ReactDom