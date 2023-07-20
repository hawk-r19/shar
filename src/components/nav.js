import '../styles/nav.css'
import React from 'react'
import {useEffect, useState} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {ReactComponent as Logo} from '../imgs/shar_logo.svg'
import Icon from '@mdi/react'
import {mdiMenu} from '@mdi/js'

/* TODO:
    remove link for about, maybe use state, don't need useLocation/path, maybe use useNavigate
    animate menu icon
*/

export default function Nav({mobile}) {
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();

    //home button
    const clickHome = () => {
        setExpanded(false);
        navigate('/');
    }

    //scroll to about
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
            {mobile ? 
            <div className={'nav-mobile' + (expanded ? ' expanded' : '')}>
                <Icon path={mdiMenu} className='nav-menu-icon' onClick={expanded ? 
                    (() => setExpanded(false)) : (() => setExpanded(true))}/>
                {/* <ExpandedNav clickHome={clickHome} close={closeNav}/> */}
                <div className='expanded-nav-links-div'>
                    <div className='nav-home-div'><Logo className='nav-home logo' onClick={clickHome}/></div>
                    <Link className='nav-link nav-about' to='/about' onClick={() => setExpanded(false)}>About</Link>
                    <Link className='nav-link nav-schedule' to='schedule' onClick={() => setExpanded(false)}>Get Lessons</Link>
                    <Link className='nav-link nav-tips' to='tips' onClick={() => setExpanded(false)}>Tennis Tips</Link>
                    <Link className='nav-link nav-contact' to='contact' onClick={() => setExpanded(false)}>Contact</Link>
                </div>
            </div> : 
            <div className='nav-wide'>
                <div className='nav-left'>
                    <Link className='nav-link nav-about' to='/about'>About</Link>
                    <Link className='nav-link nav-schedule' to='schedule'>Get Lessons</Link>
                </div>
                <div className='nav-home-div'><Logo className='nav-home logo' onClick={clickHome}/></div>
                <div className='nav-right'>
                    <Link className='nav-link nav-tips' to='tips'>Tennis Tips</Link>
                    <Link className='nav-link nav-contact' to='contact'>Contact</Link>
                </div>
            </div>}
        </nav>
    )
}

function ExpandedNav({clickHome, close}) {
    return (
        <div className='expanded-nav-links-div'>
            <div className='nav-home-div'><Logo className='nav-home logo' onClick={clickHome}/></div>
            <Link className='nav-link nav-about' to='/about' onClick={close}>About</Link>
            <Link className='nav-link nav-schedule' to='schedule' onClick={close}>Get Lessons</Link>
            <Link className='nav-link nav-tips' to='tips' onClick={close}>Tennis Tips</Link>
            <Link className='nav-link nav-contact' to='contact' onClick={close}>Contact</Link>
        </div>
    )
}