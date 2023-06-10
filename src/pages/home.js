import '../styles/home.css'
import {Link} from 'react-router-dom'

import thiem from '../imgs/thiem.png'

export default function Home() {
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

    return (
        <div className="page home-page">
            <div className='hero-div'>
                <div className="hero-div-inner">
                    <div className="hero-fade">
                        <img className='hero-pic' src={require('../imgs/shar_hero.jpg')} alt='hero pic' />
                    </div>
                    <div className='hero-text'>Private Tennis Lessons<br/>In South Austin</div>
                </div>
            </div>
            <div className='home-content'>
                <div className='intro-div'>
                    <img className='profile-pic' src={require('../imgs/shar_selfie.jpg')} alt='profile pic' />
                    <div className='intro'>
                        <div className='intro-head'>Hello!</div>
                        <div className='intro-text'>{introText}</div>
                    </div>
                </div>
                <div className='schedule-div'>
                    <Link to='/' className='schedule-link'>Schedule Now</Link>
                    <div className='schedule-text'>{scheduleText}</div>
                </div>
                <div className='about-div'>
                    <img className='about-pic' src={require('../imgs/shar_students_posed.jpg')} alt='pic with student' />
                    <div className='about'>
                        <Link to='/' className='about-link'>About Me</Link>
                        <div className='about-text'>{aboutText}</div>
                    </div>
                </div>
                <div className='reviews-div'>
                    <div className='reviews-head'>Reviews</div>
                    <div className='reviews'>
                        {reviews.map((review, index) => { return (
                            <div className={`review${'img_src' in review ? ' has-pic' : ''}`} key={`review${index}`}>
                                {'img_src' in review ? <img className='review-pic' src={review.img_src} alt='reviewer pic'/> : ''}
                                <div className='review-info'>
                                    <div className='review-name'>{review.name}</div>
                                    <div className='review-text'>{review.review}</div>
                                </div>
                            </div>
                        )})}
                    </div>
                </div>
            </div>
        </div>
    )
}