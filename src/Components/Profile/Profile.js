import React, { Component, createRef } from 'react'
import axios from 'axios'
import Dropzone from 'react-dropzone';
import { v4 as randomString } from 'uuid';

import { handleChange } from './../Logic/handleChangeLogic'
import { handleProfileErrors, handleInputColorUpdate } from './ProfileLogic'

import default_profile_picture from './../../resources/blank_profile_pic.png'

import './Profile.scss'

class Profile extends Component {
    constructor(props) {
        super(props)

        this.oldPasswordInput = createRef()
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
        handleInputColorUpdate(errorsList, {
            emailInput: this.emailInput,
            usernameInput: this.usernameInput,
            oldPasswordInput: this.oldPasswordInput,
            passwordInput: this.passwordInput,
            passwordVerInput: this.passwordVerInput,
            deletePasswordInput: this.deletePassword
        })
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

    handleUpdatePassword() {
        const { oldPassword, password, passwordVer } = this.state
        const { id } = this.state.user

        axios.post('/auth/verifypassword', { password: oldPassword, id })
            .then(() => {
                let newArr = handleProfileErrors('password', { password, passwordVer })

                if (newArr.length < 1) {
                    axios.put('/auth/updatepassword', { password, id })
                        .then(res => {
                            this.setState({
                                oldPassword: '',
                                password: '',
                                passwordVer: '',
                                passwordUpdate: false
                            })
                        })
                        .catch(error => { this.setState({ errorsList: [error.response.data] }) })
                } else {
                    this.setState({ errorsList: newArr })
                }
            })
            .catch(error => { this.setState({ errorsList: [error.response.data] }) })
    }

    handleDeleteAccount() {
        const { deletePassword: password } = this.state
        const { id } = this.state.user

        axios.post('/auth/verifypassword', { password, id })
            .then(() => {
                axios.delete(`/api/user/${id}`)
                    .then(() => {
                        this.props.history.push('/')
                    })
                    .catch(err => { console.log(err) })
            })
            .catch(error => { this.setState({ errorsList: [error.response.data] }) })
    }

    getSignedRequest = ([file]) => {
        this.setState({ isUploading: true });
        const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`;
        axios.get('/api/signs3', {
            params: {
              'file-name': fileName,
              'file-type': file.type,
            },
          })
          .then(response => {
            const { signedRequest, url } = response.data;
            this.uploadFile(file, signedRequest, url);
          })
          .catch(err => {
            console.log(err);
          });
      };
    
      uploadFile = (file, signedRequest, url) => {
        const options = {
          headers: {
            'Content-Type': file.type,
          },
        };
    
        axios.put(signedRequest, file, options)
        .catch(err => {
            this.setState({
              isUploading: false,
            });
            if (err.response.status === 403) {
              alert(
                `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${
                  err.stack
                }`
              );
            } else {
              alert(`ERROR: ${err.status}\n ${err.stack}`);
            }
          });
      };

    render() {
        const { emailUpdate, usernameUpdate, passwordUpdate, errorsList, email, oldPassword, password, passwordVer, username, deletePassword, deleteClick, deleteClick2, deleteClick3, deleteClick4 } = this.state
        const errors = errorsList.map((error, index) => {
            return <li key={index}>{error}</li>
        })

        return (
            <div id='profile-component-parent'>
                {
                    this.state.user.profile_picture ?
                    <Dropzone
                    onDropAccepted={this.getSignedRequest}
                    accept="image/*"
                    multiple={false}>
                    {({getRootProps, getInputProps}) => (
                        <div>
                            <input {...getInputProps()}/>
                            <img src={this.state.user.profile_picture} alt={'Profile_Picture'} {...getRootProps()}></img>
                        </div>
                    )}
                    </Dropzone> :
                    <Dropzone
                    onDropAccepted={this.getSignedRequest}
                    accept="image/*"
                    multiple={false}>
                    {({getRootProps, getInputProps}) => (
                        <div>
                            <input {...getInputProps()}/>
                            <img src={default_profile_picture} alt={'Profile_Picture'} {...getRootProps()}></img>
                        </div>
                    )}
                    </Dropzone>
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
                                <button onClick={() => this.setState({ emailUpdate: true, usernameUpdate: false, passwordUpdate: false, deleteClick4: false, errorsList: [] })}>Edit</button>
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
                                    onChange={(e) => { let newObj = handleChange(this.state, e.target.value, 'email'); this.setState({ ...newObj, errorsList: [...errorsList.filter(element => element.toLowerCase().includes('already') ? !element.toLowerCase().includes('already') : !element.toLowerCase().includes('email'))] }); }}
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
                                <button onClick={() => this.setState({ emailUpdate: false, usernameUpdate: true, passwordUpdate: false, deleteClick4: false, errorsList: [] })}>Edit</button>
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
                                <button onClick={() => this.setState({ emailUpdate: false, usernameUpdate: false, passwordUpdate: true, deleteClick4: false, errorsList: [] })}>Edit</button>
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
                                    onChange={(e) => { let newObj = handleChange(this.state, e.target.value, 'password'); this.setState({ ...newObj, errorsList: [...errorsList.filter(element => (element.toLowerCase().includes('retype') || element.toLowerCase().includes('incorrect')) ? true : !element.toLowerCase().includes('password'))] }); }}
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
                                    <button onClick={() => this.setState({ passwordUpdate: false, oldPassword: '', passwordVer: '', password: '', errorsList: [] })}>Cancel</button>
                                    <button onClick={() => this.handleUpdatePassword()}>Save</button>
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
                                    <button className='delete-button' onClick={() => this.setState({ deleteClick3: false, deleteClick4: true, emailUpdate: false, usernameUpdate: false, passwordUpdate: false, errorsList: [] })}>No</button>
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
                                    <button className='delete-button' onClick={() => this.handleDeleteAccount()}>Delete</button>
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