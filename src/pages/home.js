import React from 'react'
import '../styles/home.css'
import {Link} from 'react-router-dom'
import {ReactComponent as Hero} from '../imgs/sharbackaction.svg'

import thiem from '../imgs/thiem.png'
const introText = "I'm Shahriyar (you can call me Shar), a tennis coach and high school teacher based in South Austin. I offer professional quality private lessons for teens and adults of any skill level, scheduled at your convenience!";
const scheduleText = "To request a lesson, just click the link above, fill in your information, select an available time slot, and click submit! I'll get back to you as soon as I can to confirm your appointment.";
const aboutText = "Some extra stuff about me, my experience, history, maybe skill level, etc Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Hendrerit gravida rutrum quisque non.";

//need to set up retrieving reviews from database
const example1 = {
    name: "Dominic Thiem",
    img_src: thiem,
    review: `"Nice experience. He has been analysing my play and identified aspects of my game to improve upon. He sets up routines to improve on those areas."`
}
const example2 = {
    name: "Roger",
    review: `"Shar has a wonderful mix of high standards while making it fun. My kids and I are enjoying our lessons with him immensely!"`
}
var reviews = [example1, example2];

export default function Home() {
    return (
        <div className="page home-page">
            <div className='hero-div'>
                <div id='slash'></div>
                <Hero className='hero-pic' />
                <div className='hero-text'>Private Tennis Lessons</div>
            </div>
        </div>
    )
}