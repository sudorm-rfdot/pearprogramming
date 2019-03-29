import React, {Component} from 'react';
import axios from 'axios';
import {scrubbedInput, correctFileData} from './FileTreeLogic';
import './FileTree.scss'

class FileTree extends Component {
    constructor(props)
    {
      console.log('props in file tree', props);
        super(props);
        this.state = {
            files: props.files,
            newFile: false,
            fileName: '',
            errorList: []
          }
    }
  componentDidUpdate(prevProps)
  {
    if(prevProps.files !== this.props.files)
    {
      this.setState({files: this.props.files});
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
      axios.post('/api/files', {project_id: this.props.projectID, file_name: this.state.fileName})
      .then((response) =>
      {
        const fileErrorList = correctFileData(response.data)
        console.log(fileErrorList);
        console.log(response.data);
        if(fileErrorList.length === 0)
        {
          const copyOfFiles = [...this.state.files];
          copyOfFiles.push(response.data);
          this.setState({files: copyOfFiles});
        }
        else
        {
          this.setState({errorList: [...this.state.errorList, ...fileErrorList]})
        }
      })

    }
    else
    {
      this.setState({errorList: [...this.state.errorList, ...fileNameErrorList]})
    }
  }
  render() {
      const files = this.state.files.map((curVal, index) =>
      {
        return <div key={index}>{curVal.file_name}</div>
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