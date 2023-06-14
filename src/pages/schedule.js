import '../styles/schedule.css'
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
                    !chosen ? <ChooseType choose={choose}/> : 
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
        <div className='submitted-page'>
            <div className='submitted-div'>
                submitted
                <button id='schedule-again' onClick={props.scheduleAgain}>Schedule Again</button>
            </div>
        </div>
    )
}

function ChooseType(props) {
    return (
        <div className='choose-type-page'>
            <div className='choose-type-modal'>
                <button id='direct'
                    className='choose-type-button'
                    onClick={() => props.choose(true)}>
                    Direct</button>
                <button id='inquiry'
                    className='choose-type-button'
                    onClick={() => props.choose(false)}>
                    Inquiry</button>
            </div>
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
}