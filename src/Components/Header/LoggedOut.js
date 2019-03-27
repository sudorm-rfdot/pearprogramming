import React from 'react'
import { Link } from 'react-router-dom'

export default function LoggedIn(props) {
    return (
        <div>
            <Link to='/Home'><img className='logoImg' src={props.logo} alt="PearProgrammingLogo" /></Link>
        </div>
    )
}