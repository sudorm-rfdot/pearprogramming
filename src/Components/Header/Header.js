import React from 'react'
import './Header.scss'
import Logo from './../../resources/pearprogramming.png'
import { withRouter } from 'react-router-dom'
import LoggedIn from './LoggedIn'
import LoggedOut from './LoggedOut'

const Header = (props) => {
    const { pathname } = props.location
    return (
        <nav id='header-parent'>
            {
                (pathname !== '/' && pathname !== '/register') ?
                    <LoggedIn logo={Logo}/> :
                    <LoggedOut logo={Logo}/>
            }
        </nav>
    )
}

export default withRouter(Header);