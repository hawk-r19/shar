import '../styles/home.css'
import {Link} from 'react-router-dom'

export default function Home() {
    const introText = "I'm Shahriyar (you can call me Shar), a tennis coach and high school teacher based in South Austin. I offer professional quality private lessons for teens and adults of any skill level, scheduled at your convenience!";
    const scheduleText = "To request a lesson, just click the link above, fill in your information, select an available time slot, and click submit! I'll get back to you as soon as I can to confirm your appointment.";
    const aboutText = "Some extra stuff about me, my experience, history, maybe skill level, etc Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Hendrerit gravida rutrum quisque non. Aliquam ut porttitor leo a diam sollicitudin tempor.";

    //need to set up retrieving reviews from database
    const example1 = {
        name: "Dominic Thiem",
        review: "Nice expereince. He has been analysing my play and identified aspects of game to improve upon. He sets up routines to imrove on those area."
    }
    const example2 = {
        name: "Roger",
        review: "Shar has a wonderful mix of high standards while making it fun. My kids and I are enjoying our lessons with him immensely!"
    }
    var reviews = [example1, example2];

    return (
        <div className="home-page">
            <div className="hero-div">
                <img className='hero-pic' src='' alt='hero pic' />
                <div className='hero-text'>Private Tennis Lessons</div>
            </div>
            <div className='intro-div'>
                <img className='profile-pic' src='' alt='profile pic' />
                <div className='intro'>
                    <h1 className='intro-head'>Hello!</h1>
                    <div className='intro-text'>{introText}</div>
                </div>
            </div>
            <div className='schedule-div'>
                <Link to='/' className='schedule-link'>Schedule Now</Link>
                <div className='schedule-text'>{scheduleText}</div>
            </div>
            <div className='about-div'>
                <img className='about-pic' src='' alt='pic with student' />
                <div className='about'>
                    <Link to='/' className='about-link'>About Me</Link>
                    <div className='about-text'>{aboutText}</div>
                </div>
            </div>
            <div className='reviews-div'>
                <h1 className='reviews-head'>Reviews</h1>
                {reviews.map((review, index) => { return (
                    <div className='review' key={`review${index}`}>
                        <div className='review-name'>{review.name}</div>
                        <div className='review-text'>{review.review}</div>
                    </div>
                )})}
            </div>
        </div>
    )
}