import React, {Component} from 'react';
import MonacoEditor from 'react-monaco-editor';

class Editor extends Component {
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
    const requireConfig = {
      url: 'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.1/require.min.js',
      paths: {
        'vs': 'https://www.mycdn.com/monaco-editor/0.6.1/min/vs'
      }
    };
    return (
      <MonacoEditor
        width="800"
        height="600"
        language="html"
        value={this.state.code}
        onChange={this.onChange}
        requireConfig={requireConfig}
      />
    );
  }
}

export default Editor