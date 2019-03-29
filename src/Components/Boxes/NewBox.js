import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom'

class NewBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projectName: '',
      projectId: ''
    }
  }

  changeName = (val) => {
    this.setState({
      projectName: val
    })
  }

  addProject = () => {
    axios.post('/api/project', {project_name: this.state.projectName}).then((res) => {
      console.log(res.data, 'userid', this.props.id, 'project_id', res.data[0].id)
      axios.post('/api/userproject', {user_id: this.props.id, project_id: res.data[0].id, accepted: true}).then(() => {
        this.props.history.push(`/Projects/${res.data[0].id}`)
      })
    })
  }

  render() {
    return(
      <div>
        <p>NewBox</p>
        <input value={this.state.projectName} onChange={e => this.changeName(e.target.value)}></input>
        {this.state.projectName}
        <button onClick={this.addProject}>add project</button>
      </div>
    )
  }
}

export default withRouter(NewBox)