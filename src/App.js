import './styles/App.css'
import {useState, useEffect} from 'react'
import {HashRouter, Routes, Route} from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import Home from './pages/home.js'
import Layout from './pages/layout.js'
import SchedulePage from './pages/schedule.js'
import Tips from './pages/tips.js'
import Contact from './pages/contact.js'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

/* 
TODO fix nav to not use a whole new route
TODO make admin page
*/

firebase.initializeApp({
    apiKey: `${process.env.REACT_APP_FIREBASE_KEY}`,
    authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
    projectId: `${process.env.REACT_APP_PROJECT_ID}`,
    storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
    messagingSenderId: `${process.env.REACT_APP_MESS_SENDER_ID}`,
    appId: `${process.env.REACT_APP_APP_ID}`
});
const firestore = firebase.firestore();
const TESTING_EMAIL = false;

export default function App() {
    var mobile = useMediaQuery({query: '(max-width: 1000px)'});
    var props = {
        mobile: mobile,
        firestore: firestore
    };
    const [emailjsInfo, setEmailjsInfo] = useState({
        key: '',
        coachEmail: '',
        serviceID: '',
        newApptTemplateID: '',
        contactTemplateID: ''
    });
    //fetching emailjs information
    useEffect(() => {
        firestore.collection('keys').doc('emailjs').get().then(doc => {
            if(doc.exists) {
                let data = {...doc.data()};
                setEmailjsInfo({
                    key: data.key,
                    coachEmail: (TESTING_EMAIL ? data.testingEmail : data.coachEmail),
                    serviceID: (TESTING_EMAIL ? data.testingServiceID : data.serviceID),
                    newApptTmpltID: data.newApptTmpltID,
                    contactTmpltID: data.contactTmpltID
                });
            } else console.log(Error('emailjs doc does not exist'));
        }).catch(error => console.log(Error('Could not retrieve emailjs doc from firebase', {cause: error})));
    }, []);

    return (
        <div className='app' id='app'>
            <HashRouter>
                <Routes>
                    <Route path='/' element={<Layout mobile={mobile}/>}>
                        <Route index element={<Home props={props}/>} />
                        <Route path='about' element={<Home props={props}/>} />
                        <Route path='schedule' element={<SchedulePage props={props} emailjsInfo={emailjsInfo}/>} />
                        <Route path='tips' element={<Tips props={props}/>} />
                        <Route path='contact' element={<Contact props={props} emailjsInfo={emailjsInfo}/>} />
                    </Route>
                </Routes>
            </HashRouter>
        </div>
    )
};