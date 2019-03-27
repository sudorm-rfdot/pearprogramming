import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Boxes from './../Boxes/Boxes';

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
    const mappedFiles = this.state.files.map((filesObj, i) => {
      return <Link to = {`/Editor/${filesObj.id}`}><Boxes key = {i} id = {filesObj.id} name = {filesObj.file_name} /></Link>
    })
    return(
      <div>
        {mappedFiles}
      </div>
    )
  }
}

export default Projects;