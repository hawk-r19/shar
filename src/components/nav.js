import '../styles/nav.css'
import React from 'react'
import {useEffect} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {ReactComponent as Logo} from '../imgs/shar_logo.svg'

/* TODO:
    remove link for about, maybe use state, don't need useLocation/path, maybe use useNavigate
*/

export default function Nav() {
    let path = useLocation();

    useEffect(() => {
        if(path.pathname === '/about') {
            window.scrollTo({
                top: document.querySelector("#about").offsetTop,
                behavior: "smooth"
            });
        }
    }, [path]);

    return (
        <nav>
            <div className='nav-left'>
                <Link className='nav-link nav-about' to='/about'>About</Link>
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