import React from 'react'
import './Header.scss'
import Logo from './../../resources/pearprogramming.png'
import {Link, withRouter} from 'react-router-dom'
import axios from 'axios'

const Header = (props) => {

    const logout = () => {
        axios.post('/auth/logout').then(() => {
            props.history.push('/')
        })
    }    

    return (
        <nav id='header-parent'>
            <Link to='/Home'><img src={Logo} alt="PearProgrammingLogo"/></Link>
            <button onClick={logout}>Logout</button>
        </nav>
    )
}

export default withRouter(Header);