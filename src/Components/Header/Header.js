import React from 'react'
import './Header.scss'
import Logo from './../../resources/pearprogramming.png'

const Header = () => {
    return (
        <nav id='header-parent'>
            <img src={Logo} alt="PearProgrammingLogo"/>
        </nav>
    )
}

export default Header;