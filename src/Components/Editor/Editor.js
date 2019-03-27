import React, {Component} from 'react';
import MonacoEditor from 'react-monaco-editor';
import io from 'socket.io-client';
import axios from 'axios'
import './Editor.scss'


class Editor extends Component {
  state = {
    code: '',
    theme: 'vs-dark',
    language: 'javascript',
    console: ''
  }
  componentDidMount()
  {
    this.socket = io.connect('/');
    this.socket.on('on connection', (data) =>
    {
      console.log(data);
      this.setState({code: data});

    })
    this.socket.on('new text', (data) =>
    {
      this.setState({code: data});
    })
  }

  editorDidMount = (editor, monaco) => {
    editor.focus()
    console.log('editor did mount', monaco)
  }


  onChange = (newValue, e) => {
    this.socket.emit('update text', newValue)
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
      <select value={this.state.theme} onChange={e => this.changeTheme(e.target.value)}>
          <option value='vs-dark' defaultValue>Dark</option>
          <option value='vs-light'>Light</option>
        </select>

        <select  value={this.state.language} onChange={e => this.changeLang(e.target.value)}>
          <option value='javascript'>JavaScript</option>
          <option value='html'>HTML</option>
          <option value='css'>CSS</option>
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