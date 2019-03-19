import React, {Component} from 'react'
import { Link } from 'react-router-dom'

import { handleChange } from './../Logic/handleChangeLogic'
import { handleCheckUser } from '../Logic/UserLoggedInLogic'
import { handleRegisterButton } from './RegisterLogic'

import './Register.scss'

class Register extends Component {
    state = {
        errorsList: [],
        email: '',
        password: '',
        passwordVer: ''
    }

    componentDidMount() {
        const { id } = this.props
        if(handleCheckUser(id)) {
            return this.props.history.push(handleCheckUser(id))
        }
    }

    render() {
        const {errorsList, password, passwordVer, email} = this.state
        const errors = errorsList.map((error, index) => {
            return <li key={index}>{error}</li>
        })
        
        return (
            <div id='register-component-parent'>
                {
                    errorsList ?
                    <ul>
                        {errors}
                    </ul>
                    :
                    null
                }
                <h1>Register</h1>
                <input
                    placeholder='Email'
                    type='email'
                    maxLength='250'
                    value={email}
                    onChange={(e) => {let newObj = handleChange(this.state, e.target.value, 'email'); this.setState({...newObj});}}
                />
                <input
                    placeholder='Password'
                    type='password'
                    maxLength='40'
                    value={password}
                    onChange={(e) => {let newObj = handleChange(this.state, e.target.value, 'password'); this.setState({...newObj});}}
                />
                <input
                    placeholder='Verify Password'
                    type='password'
                    maxLength='40'
                    value={passwordVer}
                    onChange={(e) => {let newObj = handleChange(this.state, e.target.value, 'passwordVer'); this.setState({...newObj});}}
                />
                <button onClick={() => handleRegisterButton()}>Register</button>
                <p>Already have an account <span><Link to='/'>create one</Link></span></p>
            </div>
        )
    }
}

export default Register