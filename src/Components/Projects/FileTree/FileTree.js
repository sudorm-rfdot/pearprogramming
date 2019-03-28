import React, {Component} from 'react';
import axios from 'axios';
import './FileTree.scss'

class FileTree extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            files: props.files,
            newFile: false,
            fileName: ''
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
    this.setState({fileName: "", newFile: false});
    axios.post('/api/files', {project_id: this.props.projectID, file_name: this.state.fileName})
    .then((response) =>
    {
        console.log(response.data);
        const copy = [...this.state.files];
        copy.push(response.data);
        this.setState({files: copy});
        
    })
  }
  render() {
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
      </div>
    )
  }
}

export default FileTree;