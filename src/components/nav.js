import '../styles/nav.css'
import {Link} from 'react-router-dom'

export default function Nav() {
    return (
        <nav>
            <img src='../imgs/ex_logo.png' alt='logo' />
            <div className='nav-right'>
                <div className='nav-links'>
                    <Link className='nav-link nav-home' to='/'>Home</Link>
                    <Link className='nav-link nav-schedule' to='/'>Schedule a Lesson!</Link>
                    <Link className='nav-link nav-tips' to='/'>Tips</Link>
                    <Link className='nav-link nav-about' to='/'>About</Link>
                    <Link className='nav-link nav-contact' to='/'>Contact</Link>
                </div>
            </div>
        </nav>
    )
}