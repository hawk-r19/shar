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
*/

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const TESTING_EMAIL = false;

export default function App() {
    var mobile = useMediaQuery({query: '(max-width: 1000px)'});
    const coachEmail = 'coachhuq@gmail.com'; //maybe get coach email from firebase too
    var props = {
        mobile: mobile,
        coachEmail: (TESTING_EMAIL ? 'rhawk1509@gmail.com' : coachEmail),
        firestore: firestore,
        serviceID: (TESTING_EMAIL ? 'default_service' : 'service_y36z4zd')
    };
    //get these IDs from firebase
    var newApptTemplateID = 'tmplt_new_appt'; 
    var contactTemplateID = 'tmplt_contact';

    return (
        <div className='app' id='app'>
            <HashRouter>
                <Routes>
                    <Route path='/' element={<Layout mobile={mobile}/>}>
                        <Route index element={<Home props={props}/>} />
                        <Route path='about' element={<Home props={props}/>} />
                        <Route path='schedule' element={<SchedulePage props={props} templateID={newApptTemplateID}/>} />
                        <Route path='tips' element={<Tips props={props}/>} />
                        <Route path='contact' element={<Contact props={props} templateID={contactTemplateID}/>} />
                    </Route>
                </Routes>
            </HashRouter>
        </div>
    )
};