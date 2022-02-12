import React from "./lib/react";
import ReactDom from "./lib/react-dom";

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