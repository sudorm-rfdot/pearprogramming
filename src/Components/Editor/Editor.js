import React, {Component} from 'react';
import MonacoEditor from 'react-monaco-editor';
import axios from 'axios'
import './Editor.scss'


class Editor extends Component {
  state = {
    code: '',
    theme: 'vs-dark',
    language: 'javascript',
    console: ''
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

  changeTheme = (val) => {
    this.setState({
      theme: val
    })
  }

  changeLang = (val) => {
    this.setState({
      language: val
    })
  }

  compile = () => {
    axios.post('/api/compiler', {code: this.state.code})
      .then(res => {
        this.setState({
          console: res.data
        })
    }).catch(err => {
      console.log(`this ain't it chief`, err)
    })
  }

  render() {
    const requireConfig = {
      url: 'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.1/require.min.js',
      paths: {
        'vs': 'https://www.mycdn.com/monaco-editor/0.6.1/min/vs'
      }
    };
    const { code, theme, language } = this.state;
    const options = {
      selectOnLineNumbers: true,
      colorDecorators: true,
      roundedSelection: true,
      cursorStyle: 'line',
      automaticLayout: true,
      
    };
    return (
      <div>
        <select onChange={e => this.changeTheme(e.target.value)}>
          <option value='vs-light'>Light</option>
          <option value='vs-dark' selected>Dark</option>
        </select>

        <select onChange={e => this.changeLang(e.target.value)}>
          <option value='html'>HTML</option>
          <option value='css'>CSS</option>
          <option value='javascript' selected>JavaScript</option>
        </select>
        {this.state.console}
        <MonacoEditor
          width="1000"
          height="800"
          language={language}
          value={code}
          options={options}
          theme={theme}
          onChange={this.onChange}
          requireConfig={requireConfig}
        />
        <button onClick={this.compile}>I'm hopefully finna run this ish</button>
      </div>
    );
  }
}

export default Editor