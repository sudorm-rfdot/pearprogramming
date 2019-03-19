import React, { Component } from 'react';
import MonacoEditor from 'react-monaco-editor';
import {BrowserRouter as Router} from 'react-router-dom'
import Header from './Components/Header/Header'
import routes from './routes'
import './reset.scss'
import './App.scss';

class App extends Component {
  state = {
    code: '',
  }

  editorDidMount = (editor, monaco) => {
    editor.focus()
    console.log('editor did mount', monaco)
  }

  onChange = (newValue, e) => {
    console.log('e', e)
    console.log('newValue', newValue);
    this.setState({
      code: newValue
    })
  }

  checkState = () => {
    console.log(this.state.code)
  }
  render() {
    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true
    };
    return (
      <Router>
        <div id='app-parent-container'>
            {/*
            <MonacoEditor
            width="60%"
            height='100vh'
            language="javascript"
            theme="vs-dark"
            value={code}
            options={options}
            onChange={this.onChange}
            editorDidMount={this.editorDidMount}
            />
            {this.state.code}
            */}
            <Header />
            <div id='content-container'>
              {routes}
            </div>
        </div>
      </Router>
    );
  }
}

export default App;
