import React, { Component } from 'react';
import Boxes from './../Boxes/Boxes';
import NewBox from './../Boxes/NewBox';
import axios from 'axios'
class Home extends Component {
  state = {
    createNew: '',
    user_id: '',
    projects: []
  }

  componentDidMount() {
    this.setState({
      createNew: ''
    })
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
            console.log(this.state.projects)
          })
        })
        .catch(error => {
          this.props.history.push('/')
        })
    }
  }

  createProject = () => {
    this.setState({
      createNew: !this.state.createNew
    })
  }

  render() {
    const mappedProjects = this.state.projects.map((projectObj, i) => {
      console.log(projectObj)
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