import React, { Component, createRef } from 'react'
import axios from 'axios'

import { handleChange } from './../Logic/handleChangeLogic'

import default_profile_picture from './../../resources/blank_profile_pic.png'

import './Profile.scss'

class Profile extends Component {
    constructor(props) {
        super(props)

        this.passwordInput = createRef()
        this.passwordVerInput = createRef()
        this.emailInput = createRef()
        this.usernameInput = createRef()

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
            passwordVer: ''
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

    render() {
        const { emailUpdate, usernameUpdate, passwordUpdate, errorsList, email, oldPassword, password, passwordVer, username } = this.state
        return (
            <div id='profile-component-parent'>
                {
                    this.state.user.profile_picture ?
                        <img src={this.state.user.profile_picture} alt={'Profile_Picture'}></img> :
                        <img src={default_profile_picture} alt={'Profile_Picture'}></img>
                }
                <div className='profile-user-info'>
                    {
                        !emailUpdate ?
                            <div>
                                <h1>Email</h1>
                                <h2>{this.state.user.email}</h2>
                                <button onClick={() => this.setState({ emailUpdate: true })}>Edit</button>
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
                                    <button onClick={() => this.setState({ emailUpdate: false, email: '' })}>Cancel</button>
                                    <button>Save</button>
                                </span>
                            </div>
                    }

                    {
                        !usernameUpdate ?
                            <div>
                                <h1>Username</h1>
                                <h2>{this.state.user.username}</h2>
                                <button onClick={() => this.setState({ usernameUpdate: true })}>Edit</button>
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
                                    <button onClick={() => this.setState({ usernameUpdate: false, username: '' })}>Cancel</button>
                                    <button>Save</button>
                                </span>
                            </div>
                    }

                    {
                        !passwordUpdate ?
                            <div>
                                <h1>Password</h1>
                                <h2>Password not shown</h2>
                                <button onClick={() => this.setState({ passwordUpdate: true })}>Edit</button>
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
                                    <button onClick={() => this.setState({ passwordUpdate: false, passwordVer: '', password: '' })}>Cancel</button>
                                    <button>Save</button>
                                </span>
                            </div>
                    }

                    <button className='delete-button'>Delete Account</button>
                </div>
            </div>
        )
    }
}

export default Profile