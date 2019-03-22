import React, { Component } from 'react';
import Boxes from './../Boxes/Boxes';
import NewBox from './../Boxes/NewBox';
import axios from 'axios'
class Home extends Component {
  state = {
    createNew: ''
  }

  componentDidMount() {
    this.setState({
      createNew: ''
    })
    const { id } = this.props
    if (!id) {
      axios.get('/auth/getsessionuser')
        .catch(error => {
          this.props.history.push('/')
        })
    }
  }

  createProject = () => {
    this.setState({
      createNew:true
    })
  }
 
  render() {
    if (this.state.createNew) {
      return(
        <NewBox />
      )
    } else {
      return (
        <main>
          <button onClick={this.createProject}>create New</button>
          <Boxes />
        </main>
      )
    }
  }
}

export default Home