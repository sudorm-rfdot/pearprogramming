import React, {Component} from 'react';
import MonacoEditor from 'react-monaco-editor';

import './Editor.scss'


class Editor extends Component {
  state = {
    code: '',
    theme: 'vs-dark',
    language: 'javascript'

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

  render() {
    const { code, theme, language } = this.state;
    const options = {
      selectOnLineNumbers: true,
      roundedSelection: false,
      readOnly: false,
      cursorStyle: 'line',
      automaticLayout: false,
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
        <MonacoEditor
          width="1000"
          height="800"
          language={language}
          value={code}
          options={options}
          theme={theme}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default Editor