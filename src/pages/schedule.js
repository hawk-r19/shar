import '../styles/schedule.css'
import dayjs from 'dayjs'
import {useState} from 'react'
import Calendar from '../components/calendar.js'

export default function SchedulePage() {
    const [submitted, setSubmitted] = useState(false);
    const [lastBooked, setLastBooked] = useState({});
    const [info, setInfo] = useState({
        forMe: true,
        name: '',
        studentName: '',
        age: '',
        skill: '',
        firstTime: true,
        focus: '',
        notes: '',
        date: '',
        length: '',
        time: '',
    });

    const onSubmitForm = e => {
        //handling submit to firebase, updating state
    }

    const handleChange = e => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value,
        });
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
            {submitted ? <PostSubmitInfo lastBooked={lastBooked} /> : 
                <div className='schedule-form-div'>
                    <div className='initial-info-div'>
                        initial info div
                    </div>
                    <div className='form-div'>
                        <form onSubmit={onSubmitForm}>
                            <div className='for-me-div'>
                                <div className='for-me-head'>I'm booking... </div>
                                <div className='for-me-container'>
                                    <label for='forMe'>For Me:</label>
                                    <input type='radio' id='for-me' name='forMe' 
                                        value='forMe' checked={info.forMe} onChange={e => {
                                            setInfo({...info, forMe: e.target.value})
                                        }}/>
                                </div>
                                <div className='for-else-container'>
                                    <label for='forElse'>For Someone Else:</label>
                                    <input type='radio' id='for-else' name='forMe' 
                                        value='forElse' checked={!info.forMe} onChange={e => {
                                            setInfo({...info, forMe: e.target.value})
                                        }}/>
                                </div>
                            </div>
                            <div className='form-name-div'>
                                <div className='name-div'>
                                    <label for='name'>Your name:</label>
                                    <input type='text' name='name' id='name' value={info.name} onChange={handleChange}/>
                                </div>
                                {info.forMe ? null : 
                                    <div className='student-name-div'>
                                        <label for='studentName'>Student's Name:</label>
                                        <input type='text' name='studentName' id='student-name' 
                                            value={info.studentName} onChange={handleChange}/>
                                    </div>
                                }
                            </div>
                            <div className='age-div'>
                                <label for='age'>{info.forMe ? 'Age:' : "Student's Age:"}</label>
                                <input type='number' name='age' id='age' value={info.age} onChange={handleChange}/>
                            </div>
                            <div className='skill-div'>
                                <label for='skill'>{info.forMe ? 'Skill Level:' : "Student's Skill Level:"}</label>
                                <input type='text' name='skill' id='skill' value={info.skill} onChange={handleChange}/>
                            </div>
                            <div className='first-time-div'>
                                <label for='firstTime'>Is this your first time working with me?</label>
                                <input type='checkbox' name='firstTime' id='first-time' 
                                    checked={info.firstTime} onChange={e => {
                                        setInfo({
                                            ...info,
                                            firstTime: e.target.checked,
                                        });
                                    }}/>
                            </div>
                            <div className='focus-div'>
                                <label for='focus'>What would you like to work on in this session?</label>
                                <input type='text' name='focus' id='focus' value={info.focus} onChange={handleChange}/>
                            </div>
                            {!info.firstTime ? <></> :
                                <div className='availability-div'>
                                    <div className='availability-info-short'>some availability info</div>
                                    <label for='availabilty'>What days/times would you like your first lesson to be?</label>
                                    <input type='text' name='availability' id='availability' onChange={handleChange}/>
                                </div>
                            }
                            <div className='notes-div'>
                                <label for='notes'>Other Concerns/Requirements:</label>
                                <textarea name='notes' id='notes' value={info.notes} onChange={handleChange}/>
                            </div>
                            {info.firstTime ? <></> : 
                                <div className='schedule-time-div'>
                                    <Calendar />
                                    <div className='schedule-time-inputs'>
                                        <div className='date-div'>
                                            <label for='date'>Date:</label>
                                            <input type='text' name='date' id='date' value={info.date} onChange={handleChange}/>
                                        </div>
                                        <div className='length-div'>
                                            <label for='length'>Session Length:</label>
                                            <select name='length' onChange={handleChange}>
                                                <option value='60'>60 Minutes</option>
                                                <option value='75'>75 Minutes</option>
                                                <option value='90'>90 Minutes</option>
                                            </select>
                                        </div>
                                        <div className='time-div'>
                                            <label for='time'>Time:</label>
                                            <input type='time' name='time' id='time' value={info.time} onChange={handleChange}/>
                                        </div>
                                    </div>
                                </div>
                            }
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

function PostSubmitInfo(props) {
    return (
        <div className='post-submit-info-div'>
            {props.lastBooked}
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