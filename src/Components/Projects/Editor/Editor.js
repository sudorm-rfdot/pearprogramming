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
    this.socket.on('on join room', (data) =>
      {
        this.setState({code: data});
      })
      this.socket.on('new text', (data) =>
      {
        this.setState({code: data});
      })
      this.socket.emit('join room', this.props.currentFile.id)

  }
  componentDidUpdate(prevProps)
  {
    if(prevProps.currentFile !== this.props.currentFile)
    {
      const {id} = prevProps.currentFile;
      console.log('switched files')
      axios.put('/api/updatefile', {file_link: this.state.code, id});
      this.socket.emit('leave room', prevProps.currentFile.id) //leaves previous room
      this.socket.emit('join room', this.props.currentFile.id)
    }
  }
  componentWillUnmount()
  {
    const {id} = this.props.currentFile;
    console.log(this.state.code);
    this.socket.disconnect();
    axios.put('/api/updatefile', {file_link: this.state.code, id});
  }
  editorDidMount = (editor, monaco) => {
    editor.focus()
    console.log('editor did mount', monaco)
  }

  onChange = (newValue, e) => {
    this.socket.emit('update text', {text:newValue, room: this.props.currentFile.id})
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
    const {id} = this.props.currentFile;
    axios.put('/api/updatefile', {file_link: this.state.code, id});
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
    // console.log('console rerender');
    return (
      <div className='editor_page'>
      <section className='editor_container'>
      <div className='editor_buttons'>
      
        {/* <div className='selectors'>
          <select value={this.state.theme} onChange={e => this.changeTheme(e.target.value)}>
            <option value='vs-dark' defaultValue>Dark</option>
            <option value='vs-light'>Light</option>
          </select>

        </div> */}
        
        
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