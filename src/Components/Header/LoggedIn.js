import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import default_profile_picture from './../../resources/blank_profile_pic.png'

class LoggedIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {}
        }
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
                    console.log(res.data)
                })
                .catch(() => { this.props.history.push('/') })
        }
    }

    logout = () => {
        axios.post('/auth/logout').then(() => {
            this.props.history.push('/')
        })
    }

    render() {
        const {profile_picture} = this.state.user
        const {logo} = this.props
        return (
            <div>
                <Link className='auto-right' to='/Home'><img className='logoImg' src={logo} alt="PearProgrammingLogo" /></Link>
                {
                    profile_picture ?
                    <Link to='/Profile'><img src={profile_picture} alt="profile_picture" /></Link> :
                    <Link to='/Profile'><img src={default_profile_picture} alt="profile_picture" /></Link>                    
                }
                <Link to='/Home'><button>Home</button></Link>
                <button onClick={this.logout}>Logout</button>
            </div>
        )
    }
}

export default withRouter(LoggedIn)