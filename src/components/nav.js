import '../styles/nav.css'
import React from 'react'
import {Link} from 'react-router-dom'
import {ReactComponent as Logo} from '../imgs/shar_logo.svg'

export default function Nav() {
    const ScrollToAbout = (e) => {
        if(document.querySelector("#about") !== null) {
            window.scrollTo({
                top: document.querySelector("#about").offsetTop,
                behavior: "smooth"
            });
        }
    }

    return (
        <nav>
            <div className='nav-left'>
                <Link className='nav-link nav-about' to='/' onClick={ScrollToAbout}>About</Link>
                <Link className='nav-link nav-schedule' to='schedule'>Get Lessons</Link>
            </div>
            <Link className='nav-link nav-home' to='/'><Logo className='logo' /></Link>
            <div className='nav-right'>
                <Link className='nav-link nav-tips' to='tips'>Tennis Tips</Link>
                <Link className='nav-link nav-contact' to='contact'>Contact</Link>
            </div>
        </nav>
    )
}