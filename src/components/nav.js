import '../styles/nav.css'
import React from 'react'
import {Link} from 'react-router-dom'
import {ReactComponent as Logo} from '../imgs/shar_logo.svg'

export default function Nav() {
    return (
        <nav>
            <Link className='nav-link nav-schedule' to='/'>Schedule a Lesson!</Link>
            <Link className='nav-link nav-tips' to='/'>Tennis Tips</Link>
            <Link className='nav-link nav-home' to='/'><Logo className='logo' /></Link>
            <div className='nav-link nav-about'>About</div>
            <Link className='nav-link nav-contact' to='contact'>Contact</Link>
        </nav>
    )
}