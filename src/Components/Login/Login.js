import React, { Component, createRef } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";

import { handleChange } from './../Logic/handleChangeLogic'
import { handleLoginErrors, handleInputColorUpdate } from './LoginLogic'

import './Login.scss'

class Login extends Component {
    constructor(props) {
        super(props)

        this.passwordInput = createRef();
        this.emailInput = createRef();
        
        this.state = {
            errorsList: [],
            password: '',
            email: ''
        }
    }

    componentDidMount() {
        const { id } = this.props
        if (id > 0) {
            this.props.history.push('/profile')
        } else {
            axios.get('/auth/getsessionuser')
            .then(res => {
                    this.props.history.push('/profile')
                })
                .catch(error => {})
        }
    }

    handleLoginButton(email, password) {
        let newArr = handleLoginErrors(email, password)
        if(newArr.length < 1) {
            axios.post('/auth/login', { email, password })
                .then(res => {
                    this.props.history.push('/profile')
                })
                .catch((error) => {this.setState({errorsList: [error.response.data]})})
        } else {
            this.setState({errorsList: newArr})
        }
    }

    componentDidUpdate() {
        const {errorsList} = this.state
        handleInputColorUpdate(errorsList, this.emailInput, this.passwordInput)
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
                    ref={this.emailInput}
                    placeholder='Email'
                    type='email'
                    maxLength='250'
                    value={email}
                    onChange={(e) => {let newObj = handleChange(this.state, e.target.value, 'email'); this.setState({...newObj, errorsList: [...errorsList.filter(element => !element.toLowerCase().includes('email'))]})}}
                />
                <input
                    ref={this.passwordInput}
                    placeholder='Password'
                    type='password'
                    maxLength='40'
                    value={password}
                    onChange={(e) => {let newObj = handleChange(this.state, e.target.value, 'password'); this.setState({...newObj, errorsList: [...errorsList.filter(element => !element.toLowerCase().includes('password'))]});}}
                />
                <button onClick={() => this.handleLoginButton(email, password)}>Login</button>
                <p>Don't have an account <span><Link to='/register'>create one</Link></span></p>
            </div>
        )
    }
}

export default Login