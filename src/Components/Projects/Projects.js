import React, {Component} from 'react';
import axios from 'axios';
// import { Link} from 'react-router-dom';
// import Boxes from './../Boxes/Boxes';
import Editor from './Editor/Editor';
import FileTree from './FileTree/FileTree';

class Projects extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      files: [],
      fileContents: []
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

  render() {
    console.log(this.state.files);
    return(
      <div className='editor_page'>
        <FileTree files={this.state.files} projectID={this.props.match.params.projectid}/>
        <Editor fileContents={this.state.fileContents}/>
      </div>
    )
  }
}

export default Projects;