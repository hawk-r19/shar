import '../styles/schedule.css'
import dayjs from 'dayjs'
import React from 'react'
import {useState} from 'react'
import Calendar from '../components/calendar.js'

export default function SchedulePage() {
    const [submitted, setSubmitted] = useState(false);
    const [lastBooked, setLastBooked] = useState({});
    const [info, setInfo] = useState({
        email: '',
        forMe: true,
        name: '',
        studentName: '',
        age: '',
        skill: '',
        firstTime: true,
        focus: '',
        avail: '',
        notes: '',
        date: '',
        length: '',
        time: '',
    });

    /* var emailInput = document.getElementById('email');
    var emailWidth = document.getElementById('email-width');
    useEffect(() => {

    }, []); */

    const submitForm = e => {
        //handling submit to firebase, updating state
        setLastBooked({...info});
        setSubmitted(true);
    }

    /* const autoFitWidth = (target) => {
        var input = document.getElementById(target.id);
        var inputWidth = document.getElementById(target.id + '-width');
        //if(inputWidth) 
    } */

    const handleChange = e => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value,
        });
        //if(e.target.localName == 'input') autoFitWidth(e.target);
    }

    /* all info needed:
        Scheduling for yourself or for someone else?
        your name/student's name - set this to same if above is checked/unchecked
        your/student's age
        skill level (optional)
        is this your first session with me?
        anything specific you would like to focus on/do?
        Message/other info or concerns:
        calendar
        payment info
    */

    return (
        <div className='page schedule-page'>
            {submitted ? <PostSubmitInfo data={lastBooked} /> : 
                <div className='schedule-form-div'>
                    <div className='initial-info-div'>
                        Some initial info like availability, events, etc
                    </div>
                    <div className='form-div'>
                        <form>
                            <div className='text-input-div email-div'>Email
                                <span className='input-wrap email-wrap'>
                                    <span className='input-width email-width' aria-hidden="true">{info.email}</span>
                                    <input type='text' id='email' name='email'
                                        value={info.email} onChange={handleChange}/>
                                </span>
                            </div>
                            <div className='for-me-div'>I'm booking... 
                                <label for='forMe' className='radio-container for-me-container'
                                    onClick={e => handleChange({target: {name: 'forMe', value: true}})}>
                                    For Me
                                    <input type='radio' id='for-me' name='forMe' readOnly={true}
                                        value={info.forMe} checked={info.forMe}/>
                                    <span className='checkmark'></span>
                                </label>
                                <label for='forElse' className='radio-container for-else-container'
                                    onClick={e => handleChange({target: {name: 'forMe', value: false}})}>
                                    For Someone Else
                                    <input type='radio' id='for-else' name='forMe'  readOnly={true}
                                        value={!info.forMe} checked={!info.forMe}/>
                                    <span className='checkmark'></span>
                                </label>
                            </div>
                            <div className={'form-name-div' + (info.forMe ? '' : ' both-names')}>
                                <div className='text-input-div name-div'>Your Name
                                    <span className='input-wrap name-wrap'>
                                        <span className='input-width name-width' aria-hidden="true">{info.name}</span>
                                        <input type='text' name='name' id='name' value={info.name} onChange={handleChange}/>
                                    </span>
                                </div>
                                {info.forMe ? null : 
                                    <div className='text-input-div student-name-div'>Student's Name
                                        <span className='input-wrap student-name-wrap'>
                                            <span className='input-width student-name-width' aria-hidden="true">{info.studentName}</span>
                                            <input type='text' name='studentName' id='student-name' 
                                                value={info.studentName} onChange={handleChange}/>
                                        </span>
                                    </div>
                                }
                            </div>
                            <div className='text-input-div age-div'>{info.forMe ? 'Age' : "Student's Age"}
                                <span className='input-wrap age-wrap'>
                                    <span className='input-width age-width' aria-hidden="true">{info.age}</span>
                                    <input type='number' name='age' id='age' value={info.age} onChange={handleChange}/>
                                </span>
                            </div>
                            <div className='text-input-div skill-div'>
                                {info.forMe ? 'Skill Level' : "Student's Skill Level"}
                                <span className='input-wrap skill-wrap'>
                                    <span className='input-width skill-width' aria-hidden="true">{info.skill}</span>
                                    <input type='text' name='skill' id='skill' value={info.skill} onChange={handleChange}/>
                                </span>
                            </div>
                            <div className='first-time-div'>Is this your first time working with me?
                                <input type='checkbox' name='firstTime' id='first-time' 
                                    checked={info.firstTime} onChange={e => {
                                        setInfo({
                                            ...info,
                                            firstTime: e.target.checked,
                                        });
                                    }}/>
                            </div>
                            <div className='text-input-div focus-div'>What would you like to work on in this session?
                                <span className='input-wrap focus-wrap'>
                                    <span className='input-width focus-width' aria-hidden="true">{info.focus}</span>
                                    <input type='text' name='focus' id='focus' value={info.focus} onChange={handleChange}/>
                                </span>
                            </div>
                            {!info.firstTime ? <></> :
                                <div className='availability-container'>
                                    <div className='availability-info-short'>some availability info maybe</div>
                                    <div className='text-input-div availability-div'>
                                        What days/times would you like your first lesson to be?
                                        <span className='input-wrap avail-wrap'>
                                            <span className='input-width avail-width' aria-hidden="true">{info.avail}</span>
                                            <input type='text' name='avail' id='avail' value={info.avail} onChange={handleChange}/>
                                        </span>
                                    </div>
                                </div>
                            }
                            <div className='notes-div'>Other Concerns/Requests
                                <span className='notes-wrap'>
                                    <p className='notes-height' aria-hidden='true'>
                                        {(info.notes === '') ? 'a' : info.notes}</p>
                                    <textarea name='notes' id='notes' value={info.notes} onChange={handleChange}/>
                                </span>
                            </div>
                            {info.firstTime ? <></> : 
                                <div className='schedule-time-div'>
                                    <Calendar />
                                    <div className='schedule-time-inputs'>
                                        <div className='date-div'>
                                            <label for='date'>Date</label>
                                            <input type='text' name='date' id='date' value={info.date} onChange={handleChange}/>
                                        </div>
                                        <div className='length-div'>
                                            <label for='length'>Session Length</label>
                                            <select name='length' onChange={handleChange}>
                                                <option value='60'>60 Minutes</option>
                                                <option value='75'>75 Minutes</option>
                                                <option value='90'>90 Minutes</option>
                                            </select>
                                        </div>
                                        <div className='time-div'>
                                            <label for='time'>Time</label>
                                            <input type='time' name='time' id='time' value={info.time} onChange={handleChange}/>
                                        </div>
                                    </div>
                                </div>
                            }
                            <div className='submit-div'>
                                <div className='submit-button' onClick={submitForm}>Submit</div>
                            </div>
                        </form>
                    </div>
                </div>
            }
            <PaymentInfo />
        </div>
    )
}

function PaymentInfo(props) {
    return (
        <div className='pay-div'>Payment Info Coming Soon</div>
    )
}

function PostSubmitInfo({data, loading}) {
    const appointment = `Appointment Info: ${data.date}, ${data.time}, for ${data.length}`;

    return (
        <div className='post-submit-info-div'>
            <div className='post-header-div'>
                <div className='post-header-text'>
                    Successfully submitted! A confirmation message will be sent your email
                    at {data.email} with the following information. I will get back to you as
                    soon as I can to confirm your appointment and discuss any extra details needed.
                </div>
                <div className='post-header-sub-text'>Thank you, and I look forward to working with you!</div>
            </div>
            <div className='post-submit-info'>
                <div className='post-for-me'>{data.forMe ? "Scheduling for me." : "Scheduling for someone else."}</div>
                <div className='post-name-age'>{data.name + ", " + data.age}</div>
                {data.skill !== '' ? <div className='post-skill'>{"Skill Level: " + data.skill}</div> : <></>}
                <div className='post-first'>{data.firstTime ? "I am a new client." : "I am a returning client."}</div>
                <div className='post-focus'>{"Focus: " + data.focus}</div>
                {data.firstTime ? <div className='post-availability'>{"Availability: " + data.avail}</div> : 
                    <div className='post-appointment'>{appointment}</div>
                }
                <div className='post-notes'>{"Notes: " + data.notes}</div>
            </div>
        </div>
    )
}

/* import '../styles/schedule.css'
import dayjs from 'dayjs'
import {useState, useRef} from 'react'
//import ReactCSSTransitionGroup from 'react-transition-group'
import Direct from '../components/direct.js'
import Inquiry from '../components/inquiry.js'

export default function SchedulePage() {
    const [chosen, setChosen] = useState(false);
    const [direct, setDirect] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [lastBooked, setLastBooked] = useState({});
    const [carriedData, setCarriedData] = useState({});
    const directForm = useRef(null);
    const inquiryForm = useRef(null);

    const choose = (choice) => {
        setDirect(choice);
        setChosen(true);
    }

    const switchType = () => {
        setCarriedData({
            ...carriedData,
            ...(direct ? directForm.current.getData() : inquiryForm.current.getData())
        });
        setDirect(!direct);
    }

    const submit = (data) => {
        setLastBooked(data);
        setSubmitted(true);
        //submit data to firebase
        //send google event and email to shar
        //send email to client
    }

    return (
        <div className='page schedule-page'>
            <div className='current-schedule-container'>
                {submitted ? <Submitted last={lastBooked} scheduleAgain={() => setSubmitted(false)}/> : (
                    !chosen ? <ChooseTypeModal choose={choose}/> : 
                        <>
                            <TypeSelector direct={direct} switch={switchType} />
                            {direct ? <Direct ref={directForm} 
                                        carriedData={carriedData} submit={submit} /> : 
                                <Inquiry ref={inquiryForm} carriedData={carriedData}  submit={submit} />}
                            <Payment />
                        </>
                    )
                }
            </div>
        </div>
    )
}

function Submitted(props) {
    return (
        <div className='submitted-div'>
            submitted
            <button id='schedule-again' onClick={props.scheduleAgain}>Schedule Again</button>
        </div>
    )
}

function ChooseTypeModal(props) {
    return (
        <div className='choose-type-modal'>
            <div className='choose-side choose-inquiry'>
                <div className='head-text'>Send me a message:</div>
                <div className='sub-text'>Choose this option if any of these apply:</div>
                <div className='bullet-list'>
                    <div className='reason'> - You are a new customer</div>
                    <div className='reason'> - You are looking to set up a long-term lesson schedule</div>
                    <div className='reason'> - You are a new customer</div>
                </div>
                <button id='inquiry'
                    className='choose-type-button'
                    onClick={() => props.choose(false)}>
                    Inquiry</button>
            </div>
            <button id='direct'
                className='choose-type-button'
                onClick={() => props.choose(true)}>
                Direct</button>
        </div>
    )
}

function TypeSelector(props) {
    return (
        <div className='type-selector-div'>
            <button id='direct'
                className='switch-type-button'
                onClick={() => {if(!props.direct) props.switch();}}>
                Direct</button>
            <button id='inquiry'
                className='switch-type-button'
                onClick={() => {if(props.direct) props.switch();}}>
                Inquiry</button>
        </div>
    )
}

function Payment(props) {
    return (
        <div className='pay-div'>Payment Info Coming Soon</div>
    )
} */