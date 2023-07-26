import '../styles/contact.css'
import {useState} from 'react'
import emailjs from '@emailjs/browser'
import _ from 'lodash'

export default function Contact({props, emailjsInfo}) {
    const {key, coachEmail, serviceID, contactTmpltID} = emailjsInfo;
    const [info, setInfo] = useState({
        client_name: '',
        client_email: '',
        message: ''
    });
    const [lastEmail, setLastEmail] = useState({
        client_name: '',
        client_email: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [sending, setSending] = useState(false);

    /* TODO:
        
    */

    const submitForm = e => {
        e.preventDefault();
        const updateLastEmail = () => {setLastEmail({...info})};
        setSending(true);
        if(_.isEqual(info, lastEmail)) {
            alert('An appointment with this exact information was already sent recently.');
            setSending(false);
        } else {
            const tmplt_params = {...info, coach_email: coachEmail};
            emailjs.send(serviceID, contactTmpltID, tmplt_params, key).then(response => {
                console.log('EMAILJS SUCCESS', response.status, response.text);
                updateLastEmail();
                setSubmitted(true);
                setSending(false);
            }, error => {
                console.log('EMAILJS FAILED', error);
                alert('Sending email failed, try clicking submit again.');
                setSending(false);
            });
        }
    }

    const handleChange = e => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value,
        });
    }

    const backToContact = () => {
        setInfo({
            client_name: '',
            client_email: '',
            message: ''
        });
        setSubmitted(false);
    }

    return (
        <div className={'page contact-page' + (props.mobile ? ' mobile' : '')}>
            {submitted ? 
                <div className='post-contact-div'>
                    <div className='post-header'>Message Sent</div>
                    <div className='again-button-div'>
                        <div className='again-button' onClick={backToContact}>
                            Send Another Message
                        </div>
                    </div>
                </div> :
                <form className='contact-form-div' onSubmit={submitForm}>
                    <div className='contact-header'>Contact Me</div>
                    <div className='contact-text-input-div contact-name-div'>Name
                        <span className='input-wrap name-wrap'>
                            <span className='input-width name-width' aria-hidden="true">{info.client_name}</span>
                            <input type='text' id='name' name='client_name' required autoComplete='on'
                                value={info.client_name} onChange={handleChange}/>
                        </span>
                    </div>
                    <div className='contact-text-input-div contact-email-div'>Email
                        <span className='input-wrap email-wrap'>
                            <span className='input-width email-width' aria-hidden="true">{info.client_email}</span>
                            <input type='email' id='email' name='client_email' required autoComplete='on'
                                value={info.client_email} onChange={handleChange}/>
                        </span>
                    </div>
                    <div className='message-div'>Message
                        <span className='message-wrap'>
                            <p className='message-height' aria-hidden='true'>
                                {(info.message === '') ? 'a' : info.message}</p>
                            <textarea name='message' id='message' value={info.message} 
                                onChange={handleChange} required/>
                        </span>
                    </div>
                    <div className='submit-div'>
                        <button type='submit' className='submit-button' disabled={sending}>Submit</button>
                    </div>
                </form>
            }
        </div>
    )
}