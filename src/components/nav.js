import '../styles/nav.css'
import React from 'react'
import {Link} from 'react-router-dom'
import {ReactComponent as Logo} from '../imgs/shar_logo.svg'

export default function Nav() {
    return (
        <nav>
            <div className='nav-left'>
                <div className='nav-link nav-about'>About</div>
                <Link className='nav-link nav-schedule' to='/'>Schedule a Lesson!</Link>
            </div>
            <Link className='nav-link nav-home' to='/'><Logo className='logo' /></Link>
            <div className='nav-right'>
                <Link className='nav-link nav-tips' to='/'>Tennis Tips</Link>
                <Link className='nav-link nav-contact' to='contact'>Contact</Link>
            </div>
        </nav>
    )
}