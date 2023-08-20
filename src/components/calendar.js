import '../styles/calendar.css'
import * as dayjs from 'dayjs'
import {useState, useEffect} from 'react'
import Icon from '@mdi/react';
import {mdiChevronLeft, mdiChevronRight} from '@mdi/js';

//create array of 28 days (4 weeks), starting with today
const today = dayjs();
var days = [today];
for(let i = 0; i < 27; i++) {
    days.push(days[i].add(1, 'day'));
}
const weeks = [days.slice(0, 7), days.slice(7, 14), days.slice(14, 21), days.slice(21)];

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYSOFWEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Calendar(props) {
    const [week, setWeek] = useState(0);
    const minWeek = 0;
    const maxWeek = 3;

    const getDateText = (date) => {
        let month = date.month() + 1;
        let day = date.date();
        return ('' + date.year() + '-' + (month < 10 ? '0' + month : month) + '-' + 
            (day < 10 ? '0' + day : day));
    }

    //setting label that displays month
    const getMonthLabel = () => {
        //first and last day currently visible on calendar
        let firstDay = days[week * 7];
        let lastDay = days[week * 7 + 6];
        return (MONTHS[firstDay.month()] + (MONTHS[firstDay.month()] === MONTHS[lastDay.month()] ? '' :
            (' - ' + MONTHS[lastDay.month()])))
    }
    const [monthLabel, setMonthLabel] = useState(getMonthLabel());
    useEffect(() => {
        setMonthLabel(getMonthLabel);
    }, [week]);

    const clickDate = date => {
        props.clickDate(date);
    }

    return (
        <div className='calendar'>
            <div className='calendar-top'>
                <Icon className='arrow' id='arrow-left' path={mdiChevronLeft} size={1} onClick={() => setWeek(Math.min(Math.max(week - 1, minWeek), maxWeek))}/>
                <div className='month-label'>{monthLabel}</div>
                <Icon className='arrow' id='arrow-right' path={mdiChevronRight} size={1} onClick={() => setWeek(Math.min(Math.max(week + 1, minWeek), maxWeek))}/>
            </div>
            <div className='calendar-days'>
                {weeks[week].map((day, index) => <DayView date={day} clickDate={clickDate} key={index}/>)}
            </div>
        </div>
    )
}

function DayView({date, clickDate}) {
    const click = e => {
        clickDate(date);
    }

    return (
        <div className='day' onClick={click}>
            <div className='day-header'>{DAYSOFWEEK[date.day()] + ' ' + date.date()}</div>
            <div className='time-block 8'>8am</div>
            <div className='time-block 12'>12pm</div>
            <div className='time-block 16'>4pm</div>
            <div className='time-block 20'>8pm</div>
        </div>
    )
}