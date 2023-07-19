import '../styles/nav.css'
import React from 'react'
import {useEffect, useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {ReactComponent as Logo} from '../imgs/shar_logo.svg'
import Icon from '@mdi/react'
import {mdiMenu} from '@mdi/js'

/* TODO:
    remove link for about, maybe use state, don't need useLocation/path, maybe use useNavigate
*/

export default function Nav({mobile}) {
    const [expanded, setExpanded] = useState(false);

    var path = useLocation();
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
            {mobile ? expanded ? 
            <div className='nav-mobile expanded'>
                <Icon path={mdiMenu} className='nav-menu-icon' onClick={() => setExpanded(false)}/>
                <div className='expanded-nav-links-div'>
                    <Link className='nav-home' to='/'><Logo className='logo' /></Link>
                    <Link className='nav-link nav-about' to='/about' onClick={() => setExpanded(false)}>About</Link>
                    <Link className='nav-link nav-schedule' to='schedule' onClick={() => setExpanded(false)}>Get Lessons</Link>
                    <Link className='nav-link nav-tips' to='tips' onClick={() => setExpanded(false)}>Tennis Tips</Link>
                    <Link className='nav-link nav-contact' to='contact' onClick={() => setExpanded(false)}>Contact</Link>
                </div>
            </div> : 
            <div className='nav-mobile'>
                <Icon path={mdiMenu} className='nav-menu-icon' onClick={() => setExpanded(true)}/>
                <Link className='nav-link nav-home' to='/'><Logo className='logo' /></Link>
            </div> : 
            <div className='nav-wide'>
                <div className='nav-left'>
                    <Link className='nav-link nav-about' to='/about'>About</Link>
                    <Link className='nav-link nav-schedule' to='schedule'>Get Lessons</Link>
                </div>
                <Link className='nav-link nav-home' to='/'><Logo className='logo' /></Link>
                <div className='nav-right'>
                    <Link className='nav-link nav-tips' to='tips'>Tennis Tips</Link>
                    <Link className='nav-link nav-contact' to='contact'>Contact</Link>
                </div>
            </div>}
        </nav>
    )
}