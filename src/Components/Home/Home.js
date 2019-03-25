import React, { Component } from 'react';
import Boxes from './../Boxes/Boxes';
import NewBox from './../Boxes/NewBox';
import axios from 'axios'
class Home extends Component {
  state = {
    createNew: '',
    user_id: '',
    projects: [],
    pendingProjects: []
  }

  componentDidMount() {
    this.setState({
      createNew: ''
    })
    this.getProjects();
  }

  createProject = () => {
    this.setState({
      createNew: !this.state.createNew
    })
  }

  getProjects = () => {
    const { id } = this.props
    if (!id) {
      axios.get('/auth/getsessionuser')
        .then(res => {
          this.setState({
            user_id: res.data.id
          })
          axios.get(`/api/projects/${this.state.user_id}`).then(res => {
            this.setState({
              projects: res.data
            })
          })
          axios.get(`/api/pendingprojects/${this.state.user_id}`).then(res => {
            this.setState({
              pendingProjects: res.data
            })
          })
        })
        .catch(error => {
          this.props.history.push('/')
        })
    }
  }

  render() {
    const mappedProjects = this.state.projects.map((projectObj, i) => {
      return <Boxes key={i} id={projectObj.project_id} name={projectObj.project_name} />
    })
    return (
      <main>
        <button onClick={this.createProject}>{this.state.createNew ? 'cancel' : 'create new'}</button>
        {(this.state.createNew) && <NewBox id={this.state.user_id} />}
        {mappedProjects}
      </main>
    )

  }
}

export default Home