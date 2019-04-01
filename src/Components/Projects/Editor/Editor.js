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
    this.projectID = '1a4kf903o4a'
    this.socket = io.connect('/');
    this.socket.emit('join room', this.projectID)
    this.socket.on('on connection', (data) =>
    {
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
    this.socket.emit('update text', {text:newValue, room: this.projectID})
    this.setState({code: newValue});
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
    this.setState({console: "compileing..."})
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
      <div className='editor_page'>
      <section className='editor_container'>
      <div className='editor_buttons'>
        {/* <div className='selectors'>
          <select value={this.state.theme} onChange={e => this.changeTheme(e.target.value)}>
            <option value='vs-dark' defaultValue>Dark</option>
            <option value='vs-light'>Light</option>
          </select>

          <select  value={this.state.language} onChange={e => this.changeLang(e.target.value)}>
            <option value='javascript'>JavaScript</option>
            <option value='html'>HTML</option>
            <option value='css'>CSS</option>
          </select>
        </div> */}
        <button className='run'>Invite</button>
        <button className='run' onClick={this.compile}>Run</button>
      </div>
        <MonacoEditor
          width="100%"
          height="100vh"
          language={language}
          value={code}
          options={options}
          theme={theme}
          onChange={this.onChange}
          requireConfig={requireConfig}
        />
      </section>
      <section className='console_container'>
        <h3 className='console_padding'>console: </h3>
        <p className='console_padding'>{this.state.console}</p>

      </section>
      </div>
    );
  }
}

export default Editor