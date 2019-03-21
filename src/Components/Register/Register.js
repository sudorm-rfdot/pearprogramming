import React, {Component, createRef} from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";

import { handleChange } from './../Logic/handleChangeLogic'

import './Register.scss'
import { handleRegisterErrors, handleInputColorUpdate } from './RegisterLogic';

class Register extends Component {
    constructor(props) {
        super(props)

        this.emailInput = createRef()
        this.passwordInput = createRef()
        this.passwordVerInput = createRef()

        this.state = {
            errorsList: [],
            email: '',
            password: '',
            passwordVer: ''
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

    handleRegisterButton(email, password, passwordVer) {
        let newArr = handleRegisterErrors(email, password, passwordVer)
        if(newArr.length < 1) {
            axios.post('/auth/register', {email, password})
                .then(res => {
                    this.props.history.push('/profile')
                })
                .catch(error => {this.setState({errorsList: [error.response.data]})})
        } else {
            this.setState({errorsList: newArr})
        }
    }

    componentDidUpdate() {
        const {errorsList} = this.state
        handleInputColorUpdate(errorsList, this.emailInput, this.passwordInput, this.passwordVerInput)
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
                    ref={this.emailInput}
                    placeholder='Email'
                    type='email'
                    maxLength='250'
                    value={email}
                    onChange={(e) => {let newObj = handleChange(this.state, e.target.value, 'email'); this.setState({...newObj, errorsList: [...errorsList.filter(element => !element.toLowerCase().includes('email'))]});}}
                />
                <input
                    ref={this.passwordInput}
                    placeholder='Password'
                    type='password'
                    maxLength='40'
                    value={password}
                    onChange={(e) => {let newObj = handleChange(this.state, e.target.value, 'password'); this.setState({...newObj, errorsList: [...errorsList.filter(element => element.toLowerCase().includes('retype') ? true : !element.toLowerCase().includes('password'))]});}}
                />
                <input
                    ref={this.passwordVerInput}
                    placeholder='Verify Password'
                    type='password'
                    maxLength='40'
                    value={passwordVer}
                    onChange={(e) => {let newObj = handleChange(this.state, e.target.value, 'passwordVer'); this.setState({...newObj, errorsList: [...errorsList.filter(element => !element.toLowerCase().includes('retype'))]});}}
                />
                <button onClick={() => this.handleRegisterButton(email, password, passwordVer)}>Register</button>
                <p>Already have an account <span><Link to='/'>create one</Link></span></p>
            </div>
        )
    }
}

export default Register