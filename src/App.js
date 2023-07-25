import './styles/App.css'
import {HashRouter, Routes, Route} from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import Home from './pages/home.js'
import Layout from './pages/layout.js'
import SchedulePage from './pages/schedule.js'
import Tips from './pages/tips.js'
import Contact from './pages/contact.js'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import {firebaseConfig} from './keys/firebase.js'

/* TODO:
    fix nav to not use a whole new route
    fix min page height
*/

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

export default function App() {
    var mobile = useMediaQuery({query: '(max-width: 1000px)'});
    const coachEmail = 'coachhuq@gmail.com'; //maybe get this from firebase too
    var props = {mobile: mobile, coachEmail: coachEmail, firestore: firestore};

    return (
        <div className='app' id='app'>
            <HashRouter>
                <Routes>
                    <Route path='/' element={<Layout mobile={mobile}/>}>
                        {/* <Route index element={<Home mobile={mobile} coachEmail={coachEmail} firestore={firestore}/>} />
                        <Route path='about' element={<Home mobile={mobile} coachEmail={coachEmail}/>} />
                        <Route path='schedule' element={<SchedulePage mobile={mobile} coachEmail={coachEmail}/>} />
                        <Route path='tips' element={<Tips mobile={mobile}/>} />
                        <Route path='contact' element={<Contact mobile={mobile} coachEmail={coachEmail}/>} /> */}
                        <Route index element={<Home props={props}/>} />
                        <Route path='about' element={<Home props={props}/>} />
                        <Route path='schedule' element={<SchedulePage props={props}/>} />
                        <Route path='tips' element={<Tips props={props}/>} />
                        <Route path='contact' element={<Contact props={props}/>} />
                    </Route>
                </Routes>
            </HashRouter>
        </div>
    )
};