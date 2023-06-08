import '../styles/nav.css'
import React from 'react'
import {Link, Outlet} from 'react-router-dom'

export default function Nav() {
    return (
        <React.Fragment>
            <nav>
                <img src={require('../imgs/ex_logo.png')} alt='logo' />
                <div className='nav-right'>
                    <div className='nav-links'>
                        <Link className='nav-link nav-home' to='/'>Home</Link>
                        <Link className='nav-link nav-schedule' to='/'>Schedule a Lesson!</Link>
                        <Link className='nav-link nav-tips' to='/'>Tips</Link>
                        {/* <Link className='nav-link nav-about' to='/'>About</Link> */}
                        <Link className='nav-link nav-contact' to='/'>Contact</Link>
                    </div>
                </div>
            </nav>
            <Outlet />
        </React.Fragment>
    )
}