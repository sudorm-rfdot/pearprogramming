import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './Login.scss'

class Login extends Component {
    render() {
        return (
            <div id='login-component-parent'>
                <ul>
                    {}
                </ul>
                <h1>Login</h1>
                <input placeholder='Email' />
                <input placeholder='Password' />
                <button>Login</button>
                <p>Don't have an account <span><Link to='/register'>create one</Link></span></p>
            </div>
        )
    }
}

export default Login