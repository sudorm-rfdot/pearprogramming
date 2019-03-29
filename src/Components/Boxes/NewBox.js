import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom'
import {changeName} from './BoxesLogic';

class NewBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projectName: '',
      projectId: ''
    }
  }

  addProject = () => {
    axios.post('/api/project', {project_name: this.state.projectName}).then((res) => {
      console.log(res.data, 'userid', this.props.id, 'project_id', res.data[0].id)
      axios.post('/api/userproject', {user_id: this.props.id, project_id: res.data[0].id, accepted: true}).then(() => {
        this.props.history.push('/Projects')
      })
    })
  }

  render() {
    console.log(this.state.projectName)
    return(
      <div>
        <p>NewBox</p>
        <input value={this.state.projectName} onChange={e => {let newObj = changeName(this.state, e.target.value, 'projectName'); this.setState({...newObj})}}></input>
        {this.state.projectName}
        <button onClick={this.addProject}>add project</button>
      </div>
    )
  }
}

export default withRouter(NewBox)