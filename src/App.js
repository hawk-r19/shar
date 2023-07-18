import './styles/App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
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
    return (
        <div className='app' id='app'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path='about' element={<Home />} />
                        <Route path='schedule' element={<SchedulePage />} />
                        <Route path='tips' element={<Tips />} />
                        <Route path='contact' element={<Contact />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
};