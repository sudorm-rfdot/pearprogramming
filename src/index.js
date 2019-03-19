import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import * as monaco from 'monaco-editor'
// // or import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
// // if shipping only a subset of the features & languages is desired

// monaco.editor.create(document.getElementById('container'), {
//   value: 'console.log("Hello, world")',
//   language: 'javascript'
// });

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
