import React, {Component} from 'react'

class Login extends Component {
    render() {
        return (
            <div className='Login-Component-Parent'>
                <ul>
                    {}
                </ul>
                <h1>Login</h1>
                <input placeholder='Email'/>
                <input placeholder='Password'/>
                <button>Login</button>
                <p>Don't have an account <span>create one</span></p>
            </div>
        )
    }
}

export default Login