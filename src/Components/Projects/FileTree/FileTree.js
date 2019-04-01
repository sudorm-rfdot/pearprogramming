import React, {Component} from 'react';
import {scrubbedInput} from './FileTreeLogic';
import './FileTree.scss'

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
        return <div key={index} onClick={() => this.props.changeFile(curVal.id)}>{curVal.file_name}</div>
      })
    return(
      <div className='fileTree'>
        <h3 className='fileTree_header'>
            <button onClick={() => this.handleNewFile()}>+file</button>
            <button>+folder</button>
        </h3>
        {this.state.newFile && 
        <form onSubmit={(event) => this.handleSubmit(event)}>
            <input type='text' value={this.state.fileName} name="fileName" onChange={(event) => this.handleChange(event)}/>
            <button>Create</button>
        </form>}
        <div className='files'>
            {files}
        </div>
      </div>
    )
  }
}

export default FileTree;