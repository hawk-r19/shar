import '../styles/schedule.css'
import dayjs from 'dayjs'
import React from 'react'
import {useState} from 'react'
import Calendar from '../components/calendar.js'

export default function SchedulePage({firebase}) {
    const baseAvailability = '9am to 7pm'; //get from firebase
    const availabilityEvents = ['Out of town from 7/10 - 7/15']; //get from firebase
    const today = '2023-07-15'; //get today from dayjs
    const rate = '35'; //get from firebase
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
        date: today,
        length: '',
        time: '09:00',
    });

    const submitForm = e => {
        //handling submit to firebase, updating state
        setLastBooked({...info});
        setSubmitted(true);
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
            {submitted ? <PostSubmitInfo data={lastBooked} backToSchedule={() => setSubmitted(false)}/> : 
                <div className='schedule-form-div'>
                    <div className='initial-info-div'>
                        <div className='initial-info-header'>Availability:</div>
                        <div className='initial-info'>
                            <div className='base-avail'>I am currently available for sessions any day starting from 
                                {' ' + baseAvailability + (availabilityEvents.length === 0 ? '' : ', with the following exceptions')}.</div>
                            <ul className='avail-events'>
                                {availabilityEvents.map((event, index) => 
                                    <li className='event' key={index}>{event}</li>)}
                            </ul>
                            <div className='avail-length'>I typically do 60-90 minute sessions.</div>
                        </div>
                    </div>
                    <div className='form-div'>
                        <form onSubmit={submitForm}>
                            <div className='text-input-div email-div'>Email
                                <span className='input-wrap email-wrap'>
                                    <span className='input-width email-width' aria-hidden="true">{info.email}</span>
                                    <input type='email' id='email' name='email' required
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
                                <div className='text-input-div name-div'>{info.forMe ? 'Name' : 'Your Name'}
                                    <span className='input-wrap name-wrap'>
                                        <span className='input-width name-width' aria-hidden="true">{info.name}</span>
                                        <input type='text' name='name' id='name' value={info.name} required
                                            onChange={handleChange}/>
                                    </span>
                                </div>
                                {info.forMe ? null : 
                                    <div className='text-input-div student-name-div'>Student's Name
                                        <span className='input-wrap student-name-wrap'>
                                            <span className='input-width student-name-width' aria-hidden="true">{info.studentName}</span>
                                            <input type='text' name='studentName' id='student-name' 
                                                value={info.studentName} required onChange={handleChange}/>
                                        </span>
                                    </div>
                                }
                            </div>
                            <div className='text-input-div age-div'>{info.forMe ? 'Age' : "Student's Age"}
                                <span className='input-wrap age-wrap'>
                                    <span className='input-width age-width' aria-hidden="true">{info.age}</span>
                                    <input type='number' name='age' id='age' value={info.age} required 
                                        onChange={handleChange}/>
                                </span>
                            </div>
                            <div className='text-input-div skill-div'>
                                {info.forMe ? 'Skill Level' : "Student's Skill Level"}
                                <span className='input-wrap skill-wrap'>
                                    <span className='input-width skill-width' aria-hidden="true">{info.skill}</span>
                                    <input type='text' name='skill' id='skill' value={info.skill} required
                                        onChange={handleChange}/>
                                </span>
                            </div>
                            <div className='text-input-div focus-div'>What would you like to work on in this session?
                                <span className='input-wrap focus-wrap'>
                                    <span className='input-width focus-width' aria-hidden="true">{info.focus}</span>
                                    <input type='text' name='focus' id='focus' value={info.focus} required
                                        onChange={handleChange}/>
                                </span>
                            </div>
                            <div className='first-time-div'
                                onClick={e => handleChange({target: {name: 'firstTime', value: !info.firstTime}})}>
                                Is this your first time working with me?
                                <input type='checkbox' name='firstTime' id='first-time' 
                                    checked={info.firstTime} readOnly={true}/>
                                <span className='checkbox'></span>
                            </div>
                            {!info.firstTime ? <></> :
                                <div className='availability-container'>
                                    <div className='text-input-div availability-div'>
                                        What days/times would you like your first lesson to be?
                                        <span className='input-wrap avail-wrap'>
                                            <span className='input-width avail-width' aria-hidden="true">{info.avail}</span>
                                            <input type='text' name='avail' id='avail' value={info.avail} 
                                                onChange={handleChange} required/>
                                        </span>
                                    </div>
                                </div>
                            }
                            {info.firstTime ? <></> : 
                                <div className='schedule-time-div'>
                                    <Calendar />
                                    <div className='schedule-time-inputs'>
                                        <div className='text-input-div date-div'>Date
                                            <input type='date' name='date' id='date' value={info.date}
                                                required min={today} onChange={handleChange}/>
                                        </div>
                                        <div className='length-div'>Session Length
                                            <select name='length' onChange={handleChange} required>
                                                <option value='60'>60 Minutes</option>
                                                <option value='75'>75 Minutes</option>
                                                <option value='90'>90 Minutes</option>
                                            </select>
                                        </div>
                                        <div className='text-input-div time-div'>Time
                                            <input type='time' name='time' id='time' value={info.time} 
                                                min='09:00' max='19:00' onChange={handleChange} required/>
                                            {/* add limits based on availability */}
                                        </div>
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
                            <div className='submit-div'>
                                <button type='submit' className='submit-button'>Submit</button>
                            </div>
                        </form>
                    </div>
                    <PaymentInfo rate={rate}/>
                </div>
            }
        </div>
    )
}

function PaymentInfo({rate}) {
    return (
        <div className='pay-div'>
            <div className='pay-left'>
                <div className='pay-header'>Payment Info</div>
                <div className='pay-info'>My rate is ${rate} an hour. I typically use venmo,
                    but we can discuss other payment options if needed.</div>
            </div>
            <a className='venmo-link' href='https://www.framer.com/templates/coming-soon-website/' target='_blank' rel='noreferrer'>
                <img className='venmo' src={require('../imgs/qr.png')} alt='shar venmo'/>
            </a>
        </div>
    )
}

/* add schedule again button */
function PostSubmitInfo({data, loading, backToSchedule}) {
    const appointment = `Appointment Info: ${data.date}, ${data.time}, for ${data.length} minutes`;

    return (
        <div className='post-submit-info-div'>
            <div className='post-header-div'>
                <div className='post-header-text'>
                    Successfully submitted! A confirmation message will be sent your email
                    at {data.email} with the following information. I will get back to you as
                    soon as I can to confirm your appointment and discuss any extra details as needed.
                </div>
                <div className='post-header-sub-text'>Thank you, and I look forward to working with you!</div>
            </div>
            <hr/>
            <div className='post-submit-info'>
                {data.forMe ? 
                <div className='post-for-me'>
                    <div className='post-name-age'>{data.name + ", " + data.age +
                        data.firstTime ? ", new client." : ", returning client."}
                    </div>
                </div> : 
                <div className='post-for-else'>
                    <div className='post-name'>{data.name + (data.firstTime ? ", new client." : ", returning client.")}</div>
                    <div className='post-student-name-age'>{'Student: ' + data.studentName + ', ' + data.age}</div>
                </div>}
                {data.skill !== '' ? <div className='post-skill'>Skill Level:<br/><span>{data.skill}</span></div> : <></>}
                <div className='post-focus'>Focus:<br/><span>{data.focus}</span></div>
                {data.firstTime ? <div className='post-availability'>Availability:<br/><span>{data.avail}</span></div> : 
                    <div className='post-appointment'>{appointment}</div>
                }
                <div className='post-notes'>Notes:<br/><span>{data.notes}</span></div>
            </div>
            <div className='again-button-div'>
                <div className='again-button' onClick={backToSchedule}>
                    Schedule Another Appointment
                </div>
            </div>
        </div>
    )
}