import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import './Register.scss'

class Register extends Component {
    state = {
        errorsList: []
    }

    render() {
        const {errorsList} = this.state
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
                <input placeholder='Email' type='email' maxLength='250'/>
                <input placeholder='Password' type='password' maxLength='40'/>
                <input placeholder='Verify Password' type='password' maxLength='40'/>
                <button>Register</button>
                <p>Already have an account <span><Link to='/'>create one</Link></span></p>
            </div>
        )
    }
}

export default Register