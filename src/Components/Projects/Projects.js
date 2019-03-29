import React, {Component} from 'react';
import axios from 'axios';
// import { Link} from 'react-router-dom';
// import Boxes from './../Boxes/Boxes';
import Editor from './Editor/Editor';
import FileTree from './FileTree/FileTree';

class Projects extends Component {
  state = {
    files: []
  }
  componentDidMount(){
    axios.get(`/api/files/${this.props.match.params.projectid}`)
    .then(res => {
      this.setState({files: res.data})
    })
  }

  render() {
    
    return(
      <div className='editor_page'>
        <FileTree files={this.state.files} projectid={this.props.match.params.projectid}/>
        <Editor/>
      </div>
    )
  }
}

export default Projects;