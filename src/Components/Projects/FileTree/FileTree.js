import React, {Component} from 'react';
import {scrubbedInput} from './FileTreeLogic';
import './FileTree.scss';
import fileIcon from './../../../resources/file_icon.png'

class FileTree extends Component {
    constructor(props)
    {
      console.log('props in file tree', props);
        super(props);
        this.state = {
            newFile: false,
            fileName: '',
            errorList: []
          }
    }
  handleNewFile()
  {
     this.setState({newFile: !this.state.newFile});
  }
  handleChange(event)
  {
    this.setState({[event.target.name]: event.target.value})
  }
  handleSubmit(event)
  {
    event.preventDefault();
    const fileNameErrorList = scrubbedInput(this.state.fileName);
    console.log(fileNameErrorList);
    if(fileNameErrorList.length === 0)
    {
      this.setState({fileName: "", newFile: false});
      this.props.createFile(this.state.fileName);
    }
    else
    {
      this.setState({errorList: [...this.state.errorList, ...fileNameErrorList]})
    }
  }
  render() {
      const files = this.props.files.map((curVal, index) =>
      {
        return <li style={{display: 'flex', alignItems: 'center', marginBottom: '3px'}}>
            <img src='https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png'alt='file' style={{maxWidth: '15px', maxHeight: '15px', marginRight: '5px'}}/>
            <div className='file' key={index} onClick={() => this.props.changeFile(curVal.id)}>{curVal.file_name}.js</div>
          </li>
      })
    return(
      <div className='fileTree'>
        <button onClick={() => this.handleNewFile()}>{this.state.newFile ? 'Cancel' : 'Add File'}</button>
        {this.state.newFile && 
        <form onSubmit={(event) => this.handleSubmit(event)}>
            <input type='text' value={this.state.fileName} name="fileName" onChange={(event) => this.handleChange(event)}/>
            <button>Create</button>
        </form>}
        <ol className='files'>
            {files}
        </ol>
      </div>
    )
  }
}

export default FileTree;