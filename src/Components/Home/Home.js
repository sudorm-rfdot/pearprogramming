import React, { Component } from 'react';
import Boxes from './../Boxes/Boxes';
import NewBox from './../Boxes/NewBox';
import PendingBox from './../Boxes/PendingBox';
import axios from 'axios'
import trashboi from './../../resources/trash.png'
import { Link } from 'react-router-dom'
import {toggleBool} from './HomeLogic'

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
        <div key={i} className='boxlink box'>
        <Link to= {`/Projects/${projectObj.project_id}`}>
        <Boxes id={projectObj.project_id} name={projectObj.project_name} /></Link>
        <img onClick={id => this.deleteProject(projectObj.project_id)} src={trashboi} alt='trash' />
        </div>
      )
    })
    const mappedPending = this.state.pendingProjects.map((pendingObj, i) => {
      return <PendingBox className='box' key={i} id={pendingObj.project_id} name={pendingObj.project_name} />
    })
    return (
      <main id='homeparent'>
        <div className='boxrows'>
          <button className='box' onClick={this.createProject}>{this.state.createNew ? 'cancel' : 'create new'}</button>
          {(this.state.createNew) && <NewBox id={this.state.user_id} />}
          {mappedProjects}
          {mappedPending}
        </div>
      </main>
    )

  }
}

export default Home