import React, {Component} from 'react';
import axios from 'axios';
// import { Link} from 'react-router-dom';
// import Boxes from './../Boxes/Boxes';
import Editor from './Editor/Editor';
import FileTree from './FileTree/FileTree';
import {correctFileData} from './FileTree/FileTreeLogic';
import './Projects.scss';

class Projects extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      files: [],
      currentFile: {},
      errorList: []
    }
  }
  componentDidMount(){
    axios.get(`/api/files/${this.props.match.params.projectid}`)
    .then(res => {
      this.setState({files: res.data})
      console.log('after set state')
    })
  }
  updateFileContents()
  {

  }
  changeFile = async(fileId) => {
    const foundFile = this.state.files.find(file => file.id === fileId)
    await this.setState({currentFile: foundFile})
    console.log(this.state.currentFile)
  }
  saveFile(fileId){

  }
  createFile = (fileName) => {
    axios.post('/api/files', {project_id: this.props.match.params.projectid, file_name: fileName})
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

  render() {
    // console.log(this.state.files);
    return(
      <div className='project_page'>
        <FileTree files={this.state.files} createFile={this.createFile} changeFile={this.changeFile}/>
        <Editor currentFile={this.state.currentFile}/>
      </div>
    )
  }
}

export default Projects;