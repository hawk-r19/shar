import './styles/App.css'
import {HashRouter, Routes, Route} from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import Home from './pages/home.js'
import Layout from './pages/layout.js'
import SchedulePage from './pages/schedule.js'
import Tips from './pages/tips.js'
import Contact from './pages/contact.js'
import { initializeApp } from 'firebase/app'
import {firebaseConfig} from './keys/firebase.js'

/* TODO:
    fix nav to not use a whole new route
*/

const app = initializeApp(firebaseConfig);

export default function App() {
    var mobile = useMediaQuery({query: '(max-width: 1000px)'});

    return (
        <div className='app' id='app'>
            <HashRouter>
                <Routes>
                    <Route path='/' element={<Layout mobile={mobile}/>}>
                        <Route index element={<Home mobile={mobile}/>} />
                        <Route path='about' element={<Home mobile={mobile}/>} />
                        <Route path='schedule' element={<SchedulePage mobile={mobile}/>} />
                        <Route path='tips' element={<Tips mobile={mobile}/>} />
                        <Route path='contact' element={<Contact mobile={mobile}/>} />
                    </Route>
                </Routes>
            </HashRouter>
        </div>
    )
};