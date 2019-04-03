import React, { Component } from 'react';
import Boxes from './../Boxes/Boxes';
import NewBox from './../Boxes/NewBox';
import PendingBox from './../Boxes/PendingBox';
import axios from 'axios'
// import trashboi from './../../resources/trash.png'
import { toggleBool } from './HomeLogic'

import './Home.scss'

class Home extends Component {
  state = {
    createNew: false,
    user_id: '',
    projects: [],
    pendingProjects: []
  }

  componentDidMount() {
    const { id } = this.props
    if (id > 0) {

    } else {
      axios.get('/auth/getsessionuser')
        .then(res => {
          this.setState({
            user: res.data
          })
        })
        .catch(() => { this.props.history.push('/') })
    }

    this.setState({
      createNew: ''
    })
    this.getProjects();
  }

  createProject = () => {
    this.setState({
      createNew: toggleBool(this.state.createNew)
    })
  }

  deleteProject = (id) => {
    console.log(id)
    axios.delete(`/api/delete-project/${id}`).then(
      this.getProjects()
    )
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
      return (
        // <div>
          <Boxes key={i} id={projectObj.project_id} name={projectObj.project_name} projectObj={projectObj}/>
        // </div>
      )
    })
    const mappedPending = this.state.pendingProjects.map((pendingObj, i) => {
      return <PendingBox className='box' key={i} projectid={pendingObj.project_id} getProjects={this.getProjects} userid={this.state.user_id} name={pendingObj.project_name} />
    })

    return (
      <main id='home-parent-comp'>
        <div className='box-rows'>
          {
            !this.state.createNew ?
            <button className='box' onClick={this.createProject}>Create New</button>: 
            <NewBox id={this.state.user_id} cancel={() => this.setState({createNew: false})}/>
          }
          {mappedProjects}
        </div>
        <br />
        <h1 className='pending'>Pending_Requests:</h1>
        <div className='box-rows'>
          {mappedPending}
        </div>
      </main>
    )

  }
}

export default Home