import '../styles/contact.css'
import {useState} from 'react'
import emailjs from '@emailjs/browser'
import {EMAILJS_KEY} from '../keys/emailjs.js'
import _ from 'lodash'

export default function Contact({mobile}) {
    const [info, setInfo] = useState({
        client_email: '',
        client_name: '',
        message: ''
    });
    const [lastEmail, setLastEmail] = useState({
        client_email: '',
        client_name: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    /* form contact type
        coachhuq@gmail.com
    */

    const submitForm = e => {
        e.preventDefault();
        const tmplt_params = {...info};
        setLastEmail({...info});
        console.log(tmplt_params);
    }

    return (
        <div className={'page contact-page' + (mobile ? ' mobile' : '')}>Contact Page Coming Soon!</div>
    )
}