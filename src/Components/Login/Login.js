import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { handleChange } from './../Logic/handleChangeLogic'
import { handleCheckUser } from '../Logic/UserLoggedInLogic'

import './Login.scss'

class Login extends Component {
    state = {
        errorsList: [],
        password: '',
        email: ''
    }

    componentDidMount() {
        const { id } = this.props
        if(handleCheckUser(id)) {
            return this.props.history.push(handleCheckUser(id))
        }
    }

    render() {
        const {errorsList, password, email} = this.state
        const errors = errorsList.map((error, index) => {
            return <li key={index}>{error}</li>
        })

        return (
            <div id='login-component-parent'>
                {
                    errorsList ?
                    <ul>
                        {errors}
                    </ul>
                    :
                    null
                }
                <h1>Login</h1>
                <input
                    placeholder='Email'
                    type='email'
                    maxLength='250'
                    value={email}
                    onChange={(e) => {let newObj = handleChange(this.state, e.target.value, 'email'); this.setState({...newObj})}}
                />
                <input
                    placeholder='Password'
                    type='password'
                    maxLength='40'
                    value={password}
                    onChange={(e) => {let newObj = handleChange(this.state, e.target.value, 'password'); this.setState({...newObj});}}
                />
                <button>Login</button>
                <p>Don't have an account <span><Link to='/register'>create one</Link></span></p>
            </div>
        )
    }
}

export default Login