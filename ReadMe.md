# 如何设置React环境，Webpack和Babel

- 如何安装和配置Webpack
- 如何安装和配置Babel
- 如何搭建React环境
- 如何将结果包包含到HTML页面中
- 如何安装和配置Webpack开发服务器

## 设置项目

首先，为项目创建目录：

```
mkdir one-react && cd one-react
```

创建用于保存代码的最小目录结构：

```
mkdir -p src
```

通过运行以下内容来初始化项目：

```
npm init -y
```

## 设置Webpack

让我们通过运行以下命令安装webpack和webpack-cli：

```
npm i webpack webpack-cli --save-dev
```

现在在里面添加webpack命令package.json：

```
"scripts": {
  "build": "webpack --mode production"
}
```

## 设置 Babel 解释 JSX

React组件主要是用最新的JS语法编写的。有的旧版本浏览器并不支持最新的JS语法，另外代码里可能里有JSX，因此我们需要某种转换。

Webpack本身不知道如何转换JavaScript。相反，它依赖于loader作为转换工具。一个webpack loader 将某些东西作为输入并产生一个输出，称为bundle。

Babel 是一个工具链，主要用于将采用 ECMAScript 2015+ 语法编写的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中

`babel-loader`是负责与Babel对话的 webpack loader。同时 Babel必须配置预设（preset，可以被看作是一组 Babel 插件）：

- `@babel/preset-env` 用于将现代JavaScript编译为ES5
- `@babel/preset-react` 可将JSX和其他内容编译为JavaScript

安装依赖项：

```
npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
```

以上工具的作用是：webpack项目里当 import 一个`.jsx`文件时，使用 `babel-loader` 来处理这个文件， `babel-loader` 使用 `@babel/core` 来执行转换，
在转换的过程中使用了babel的 `@babel/preset-env`插件用于把最新的ES转换为ES5，使用 `@babel/preset-react`把 JSX转换为正常的JavaScript。

在项目根目录创建 .babelrc 文件，该文件的作用是 告诉 babel-core 在执行转换的时候使用如下插件： 使用插件来实现某些操作，比如新版本JS语法的转换、JSX的转换。
但是有时候我们需要的插件过多，文件就会过大，为了方便，可以使用预设presets（取代单独的插件，使用一组 Babel 插件）

```
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

或者

```
{
  "presets": [
    "@babel/preset-env"
  ],
  "plugins": [
    ["transform-react-jsx", {
        "pragma": "React.createElement"
    }]
  ]
}
```

创建一个名为的文件webpack.config.js，内容如下：

```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  output: {
    filename: '[name].[hash:5].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  }
}

```

该配置非常少。对于每个带有js或jsx扩展名的文件，Webpack都会通过babel-loader处理代码。

为了使环境能正常启动，需要安装 `html-webpack-plugin` 和 `wepack-dev-server`

```
npm i --save-dev html-webpack-plugin webpack-dev-server
```

修改 package.json

```
{
  ...
  "scripts": {
    "start": "webpack-dev-server",
    "build": "webpack"
  },
  ...
}
```

## 测试JSX

创建 `src/index.js` 文件

```
const React = {
  createElement(...args) {
    console.log(args)
  }
};

let div = <div className = "header">hello</div>;
console.log(div);

```

执行，启动测试

```
npm start 
```

# 实现简易React

- 什么是虚拟DOM
- 如何在页面上渲染标签
- 如何在页面上渲染属性
- 文件分模块
- 如何安装和配置Webpack开发服务器

## 什么是虚拟DOM

用普通的JS对象来描述DOM结构

```
const React = {
  createElement(tag,attrs,...children){
    return{
      tag,
      attrs,
      children
    }
  }
}
```

## 如何在页面上渲染标签

我们得到了虚拟DOM，那我们如何把它变为真实的DOM，并渲染在页面上

在index.js里添加如下代码

```
function render(vDom, container) {
  let node
  //我们认为得到的虚拟DOM的类型有两种，一种是不再有孩子了，类型为string；另一种还有孩子，类型为object
  //对于第一种，我们创建一个文本节点；对于第二种，我们根据tag创建标签，并对他的孩子继续执行render
  if (typeof vDom === 'string') {
    node = document.createTextNode(vDom)
  }
  if (typeof vDom === 'object') {
    node = document.createElement(vDom.tag)
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
```

## 如何在页面上渲染属性

上一步的操作只是把标签渲染到了页面上，但对于例如class、id等属性都没有渲染

在index.js里添加如下代码

```
//在这里我们也是简单实现了几种属性，比如类似onclick的点击事件、行内样式、class、id等
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
```

同时我们在标签渲染时调用这个函数，实现属性的展现

```
function render(vDom, container) {
    ...
    if (typeof vDom === 'object') {
    ...
    setAttribute(node, vDom.attrs)
    ...
  }
  ...
}
```

## 进行简单的测试

```
let styleObj = {
  color:'blue',
  fontSize: '30px'
};

ReactDom.render((
  <div className="wrap">
    <button className="btn" onClick={()=> console.log('click me')}> Click me!</button>
    <p style={styleObj}>I have style</p>
  </div>
), document.body);
```

执行，启动测试

```
npm start 
```

## 文件分模块

为了使用清晰，对我们刚刚写的代码进行解耦
创建 `src/lib` 目录，在此目录下创建`src/lib/react.js` 和 `src/lib/react-dom.js` 文件
将相应的代码进行迁移
并在index.js中引入相应的文件