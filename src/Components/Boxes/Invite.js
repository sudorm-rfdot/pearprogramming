import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom'

class Invite extends Component {

  state = {
    emailTxt: ''
  }

  handleChange = (val) => {
    this.setState({
      emailTxt: val
    })
  }

  inviteToProject = () => {
    console.log(this.state.emailTxt)
    axios.get(`/api/profile?email=${this.state.emailTxt}`)
    .then(res => {
      axios.post('/api/projectrequest', {user_id: res.data.id, project_id: this.props.match.params.projectid})
    })
  }

  render() {
    return (
      <div>
        <input onChange={e => this.handleChange(e.target.value)} value={this.state.emailTxt} />
        <button onClick={this.inviteToProject}>Add user</button>
      </div>
    )
  }
}

export default withRouter(Invite)