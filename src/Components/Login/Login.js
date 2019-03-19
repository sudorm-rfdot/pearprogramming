import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './Login.scss'

class Login extends Component {
    state = {
        errorsList: []
    }

    render() {
        const {errorsList} = this.state
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
                <input placeholder='Email' type='email' maxLength='250'/>
                <input placeholder='Password' type='password' maxLength='40'/>
                <button>Login</button>
                <p>Don't have an account <span><Link to='/register'>create one</Link></span></p>
            </div>
        )
    }
}

export default Login