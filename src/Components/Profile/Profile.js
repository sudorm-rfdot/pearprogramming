import React, { Component, createRef } from 'react'
import axios from 'axios'

import { handleChange } from './../Logic/handleChangeLogic'
import { handleProfileErrors, handleInputColorUpdate } from './ProfileLogic'

import default_profile_picture from './../../resources/blank_profile_pic.png'

import './Profile.scss'

class Profile extends Component {
    constructor(props) {
        super(props)

        this.passwordInput = createRef()
        this.passwordVerInput = createRef()
        this.emailInput = createRef()
        this.usernameInput = createRef()
        this.deletePassword = createRef()

        this.state = {
            user: {},
            errorsList: [],
            emailUpdate: false,
            email: '',
            usernameUpdate: false,
            username: '',
            passwordUpdate: false,
            oldPassword: '',
            password: '',
            passwordVer: '',
            deleteClick: false,
            deleteClick2: false,
            deleteClick3: false,
            deleteClick4: false,
            deletePassword: ''
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
                })
                .catch(() => { this.props.history.push('/') })
        }
    }

    componentDidUpdate() {
        const { errorsList } = this.state
        handleInputColorUpdate(errorsList, { emailInput: this.emailInput, usernameInput: this.usernameInput })
    }

    handleUpdateEmail() {
        const { email } = this.state
        const { id } = this.state.user
        let newArr = handleProfileErrors('email', { email: email.toLowerCase() })
        if (newArr.length < 1) {
            axios.put('/auth/updateemail', { email, id })
                .then(res => {
                    this.state.user.email = res.data.email
                    this.setState({
                        email: '',
                        emailUpdate: false
                    })
                })
                .catch(error => { this.setState({ errorsList: [error.response.data] }) })
        } else {
            this.setState({ errorsList: newArr })
        }
    }

    handleUpdateUsername() {
        const { username } = this.state
        const { id } = this.state.user
        let newArr = handleProfileErrors('username', { username })
        if (newArr.length < 1) {
            axios.put('/auth/updateusername', { username, id })
                .then(res => {
                    this.state.user.username = res.data.username
                    this.setState({
                        username: '',
                        usernameUpdate: false
                    })
                })
                .catch(error => { this.setState({ errorsList: [error.response.data] }) })
        } else {
            this.setState({ errorsList: newArr })
        }
    }

    render() {
        const { emailUpdate, usernameUpdate, passwordUpdate, errorsList, email, oldPassword, password, passwordVer, username, deletePassword, deleteClick, deleteClick2, deleteClick3, deleteClick4 } = this.state
        const errors = errorsList.map((error, index) => {
            return <li key={index}>{error}</li>
        })

        return (
            <div id='profile-component-parent'>
                {
                    this.state.user.profile_picture ?
                        <img src={this.state.user.profile_picture} alt={'Profile_Picture'}></img> :
                        <img src={default_profile_picture} alt={'Profile_Picture'}></img>
                }
                <div className='profile-user-info'>
                    {
                        errorsList ?
                            <ul>
                                {errors}
                            </ul>
                            :
                            null
                    }

                    {
                        !emailUpdate ?
                            <div>
                                <h1>Email</h1>
                                <h2>{this.state.user.email}</h2>
                                <button onClick={() => this.setState({ emailUpdate: true, usernameUpdate: false, passwordUpdate: false, deleteClick4: false })}>Edit</button>
                            </div>
                            :
                            <div>
                                <h1>Email</h1>
                                <h2>{this.state.user.email}</h2>
                                <input
                                    ref={this.emailInput}
                                    placeholder='Email'
                                    type='email'
                                    maxLength='250'
                                    value={email}
                                    onChange={(e) => { let newObj = handleChange(this.state, e.target.value, 'email'); this.setState({ ...newObj, errorsList: [...errorsList.filter(element => !element.toLowerCase().includes('email'))] }); }}
                                />
                                <span>
                                    <button onClick={() => this.setState({ emailUpdate: false, email: '', errorsList: [] })}>Cancel</button>
                                    <button onClick={() => this.handleUpdateEmail()}>Save</button>
                                </span>
                            </div>
                    }

                    {
                        !usernameUpdate ?
                            <div>
                                <h1>Username</h1>
                                <h2>{this.state.user.username}</h2>
                                <button onClick={() => this.setState({ emailUpdate: false, usernameUpdate: true, passwordUpdate: false, deleteClick4: false })}>Edit</button>
                            </div>
                            :
                            <div>
                                <h1>Username</h1>
                                <h2>{this.state.user.username}</h2>
                                <input
                                    ref={this.usernameInput}
                                    placeholder='Username'
                                    type='text'
                                    maxLength='250'
                                    value={username}
                                    onChange={(e) => { let newObj = handleChange(this.state, e.target.value, 'username'); this.setState({ ...newObj, errorsList: [...errorsList.filter(element => element.toLowerCase().includes('username'))] }); }}
                                />
                                <span>
                                    <button onClick={() => this.setState({ usernameUpdate: false, username: '', errorsList: [] })}>Cancel</button>
                                    <button onClick={() => this.handleUpdateUsername()}>Save</button>
                                </span>
                            </div>
                    }

                    {
                        !passwordUpdate ?
                            <div>
                                <h1>Password</h1>
                                <h2>Password not shown</h2>
                                <button onClick={() => this.setState({ emailUpdate: false, usernameUpdate: false, passwordUpdate: true })}>Edit</button>
                            </div>
                            :
                            <div>
                                <h1>Password</h1>
                                <h2>Password not shown</h2>
                                <input
                                    ref={this.oldPasswordInput}
                                    placeholder='Old Password'
                                    type='password'
                                    maxLength='40'
                                    value={oldPassword}
                                    onChange={(e) => { let newObj = handleChange(this.state, e.target.value, 'oldPassword'); this.setState({ ...newObj, errorsList: [...errorsList.filter(element => !element.toLowerCase().includes('incorrect'))] }); }}
                                />
                                <input
                                    ref={this.passwordInput}
                                    placeholder='New Password'
                                    type='password'
                                    maxLength='40'
                                    value={password}
                                    onChange={(e) => { let newObj = handleChange(this.state, e.target.value, 'password'); this.setState({ ...newObj, errorsList: [...errorsList.filter(element => element.toLowerCase().includes('retype') ? true : !element.toLowerCase().includes('password'))] }); }}
                                />
                                <input
                                    ref={this.passwordVerInput}
                                    placeholder='Verify New Password'
                                    type='password'
                                    maxLength='40'
                                    value={passwordVer}
                                    onChange={(e) => { let newObj = handleChange(this.state, e.target.value, 'passwordVer'); this.setState({ ...newObj, errorsList: [...errorsList.filter(element => !element.toLowerCase().includes('retype'))] }); }}
                                />
                                <span>
                                    <button onClick={() => this.setState({ passwordUpdate: false, oldPassword: '', passwordVer: '', password: '' })}>Cancel</button>
                                    <button>Save</button>
                                </span>
                            </div>
                    }

                    <button className='delete-button' onClick={() => { if (!deleteClick && !deleteClick2 && !deleteClick3 && !deleteClick4) { this.setState({ deleteClick: true }) } }}>Delete Account</button>
                    {
                        this.state.deleteClick ?
                            <div>
                                <h2>Are you sure?</h2>
                                <span>
                                    <button onClick={() => this.setState({ deleteClick: false })}>No</button>
                                    <button className='delete-button' onClick={() => this.setState({ deleteClick: false, deleteClick2: true })}>Yes</button>
                                </span>
                            </div>
                            :
                            null
                    }
                    {
                        this.state.deleteClick2 ?
                            <div>
                                <h2>Are you really sure?</h2>
                                <span>
                                    <button onClick={() => this.setState({ deleteClick2: false })}>No</button>
                                    <button className='delete-button' onClick={() => this.setState({ deleteClick2: false, deleteClick3: true })}>Yes</button>
                                </span>
                            </div>
                            :
                            null
                    }
                    {
                        this.state.deleteClick3 ?
                            <div>
                                <h2>Ok then, click no to continue.</h2>
                                <span>
                                    <button className='delete-button' onClick={() => this.setState({ deleteClick3: false, deleteClick4: true })}>No</button>
                                    <button onClick={() => this.setState({ deleteClick3: false })}>Yes</button>
                                </span>
                            </div>
                            :
                            null
                    }
                    {
                        this.state.deleteClick4 ?
                            <div>
                                <h2>RIP {this.state.user.username}</h2>
                                <input
                                    ref={this.deletePassword}
                                    placeholder='Password'
                                    type='password'
                                    maxLength='40'
                                    value={deletePassword}
                                    onChange={(e) => { let newObj = handleChange(this.state, e.target.value, 'deletePassword'); this.setState({ ...newObj, errorsList: [...errorsList.filter(element => !element.toLowerCase().includes('incorrect'))] }); }}
                                />
                                <span>
                                    <button onClick={() => this.setState({ deleteClick4: false, deletePassword: '' })}>Cancel</button>
                                    <button className='delete-button'>Delete</button>
                                </span>
                            </div>
                            :
                            null
                    }
                </div>
            </div>
        )
    }
}

export default Profile