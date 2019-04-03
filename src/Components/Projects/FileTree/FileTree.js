import React, {Component} from 'react';
import {scrubbedInput} from './FileTreeLogic';
import './FileTree.scss';
import trashboi from './../../../resources/trash.png'
import Invite from './../../Boxes/Invite'


// import fileIcon from './../../../resources/file_icon.png'

class FileTree extends Component {
    constructor(props)
    {
      console.log('props in file tree', props);
        super(props);
        this.state = {
            newFile: false,
            fileName: '',
            errorList: [],
            edit: false,
            clicked: false
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
  toggleBool = () => {
    this.setState({
      edit: !this.state.edit
    })
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
        return <li key={index} className='listed'>
            {this.state.edit && <img className='icon' onClick={() => this.props.deleteFile(curVal)} src={trashboi} alt='trash' />}
            <img className='icon js' src='https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png'alt='file' />
            <div className='file' key={index} onClick={() => this.props.changeFile(curVal.id)}>{curVal.file_name}.js</div>
          </li>
      })
    return(
      <div className='fileTree'>
      <div>
        <button onClick={() => this.handleNewFile()}>{this.state.newFile ? 'Cancel' : 'Add File'}</button>
        <button onClick={this.toggleBool}>Edit</button>
        {this.state.newFile && 
        <form className='align' onSubmit={(event) => this.handleSubmit(event)}>
            <input type='text' value={this.state.fileName} name="fileName" onChange={(event) => this.handleChange(event)}/>
            <button>Create</button>
        </form>}
        <ol className='files'>
            {files}
        </ol>
        </div>
        <div>
        {this.state.edit && <button className='delete-project' onClick={() => this.props.deleteProject(this.props.projectid)}>Delete Project</button>}
        {!this.state.clicked ? <button className='invite-button' onClick={() => this.setState({clicked: true})}>Invite</button> : <Invite cancel={() => this.setState({clicked: false})}/>}
        </div>
      </div>
    )
  }
}

export default FileTree;