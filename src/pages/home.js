import React from 'react'
import '../styles/home.css'
import {useState, useEffect, useRef} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import {ReactComponent as Hero} from '../imgs/sharbackaction.svg'
import {ReactComponent as Arrow} from '../imgs/arrow_up_right.svg'
import exReviews from '../components/exampleReviews.js' //backup reviews

/* TODO:
    
*/

const introTextDefault = "I’m Shar Huq, a math teacher and tennis coach for Crockett HS in south Austin. I offer private/group lessons for all skill levels all around Austin/Cedar Park. I like to stay south/central on weekday evenings and can travel more on weekends!";
const scheduleTextDefault = "To request a lesson, just click here, fill in your information, and submit! I'll get back to you as soon as I can to confirm your appointment.";
const aboutTextDefault = "I’ve been playing for over 15 years. Taken lessons from coaches at SATC. I am an avid fan, researching gear, technique and strategy and implement that with my students. I play at a NTRP 4.0 level for USTA and ATN and have worked with players up to a 4.5 level.";

//importing all review images
function importAll(r) {
    let images = {};
    r.keys().map(item => {images[item.replace('./', '').replace(/\.[^/.]+$/, '')] = r(item);});
    return images;
}
const reviewImgs = importAll(require.context('../imgs/review_imgs/', false, /\.(png|jpe?g|svg)$/));

export default function Home({props}) {
    const {mobile, firestore} = props;

    //getting page text
    const [introText, setIntroText] = useState(introTextDefault);
    const [aboutText, setAboutText] = useState(aboutTextDefault);
    useEffect(() => {
        firestore.collection('info').doc('introText').get().then(doc => {
            if(doc.exists) setIntroText(doc.data().text);
            else console.log(Error('Could not retrieve introText from firebase'));
        }).catch(error => console.log(Error('Could not retrieve introText from firebase', {cause: error})));
        
        firestore.collection('info').doc('aboutText').get().then(doc => {
            if(doc.exists) setAboutText(doc.data().text);
            else console.log(Error('Could not retrieve aboutText from firebase'));
        }).catch(error => console.log(Error('Could not retrieve aboutText from firebase', {cause: error})));
    }, []);

    //getting reviews
    const [realReviews, setRealReviews] = useState([]);
    useEffect(() => {
        firestore.collection('reviews').orderBy('order').get().then(snapshot => {
            var tempReviews = []
            snapshot.forEach(doc => {
                if(doc.id in reviewImgs) tempReviews.push({...doc.data(), img_src: reviewImgs[doc.id]});
                else tempReviews.push(doc.data());
            });
            setRealReviews([...tempReviews]);
        }).catch(error => console.log(error));
    }, []);

    //return to top arrow visibility
    const arrow = useRef(null);
    const arrowRevealOffset = .8; //(once scrolled down 80vh)
    const arrowOffsetMobile = .6;
    const arrowStatus = () => {
        arrow.current.className.baseVal = (window.scrollY >= window.innerHeight * 
            (mobile ? arrowOffsetMobile : arrowRevealOffset)) ?
            '' : 'arrow-hidden';
    }
    useEffect(() => {
        window.addEventListener('scroll', arrowStatus, {passive: true});
        return () => window.removeEventListener('scroll', arrowStatus);
    }, []);
    const scrollToTop = () => {
        window.scrollTo({
            top: document.querySelector("#app").offsetTop,
            behavior: 'smooth'
        });
    }

    //reroute to schedule page
    const navigate = useNavigate();
    const toSchedule = e => {
        e.preventDefault();
        navigate('/schedule');
    }

    //hero image cropping
    var cropHero = useMediaQuery({query: '(max-width: 500px)'});

    return (
        <div className={"page home-page" + (mobile ? ' mobile' : '')}>
            <div className='hero-div'>
                <div className='slash'></div>
                {cropHero ? 
                    <Hero className='hero-pic' preserveAspectRatio='xMidYMid slice' width='80vw'/>
                    : <Hero className='hero-pic'/>}
                <div className='hero-text'>Private Tennis Lessons</div>
            </div>
            <div className='home-content'>
                <Arrow id='arrow' className='arrow-hidden' ref={arrow} onClick={scrollToTop}/>
                <div className='intro-div'>
                    <div className='pic-container'><img className='intro-pic' src={require('../imgs/shar_portrait_cropped.jpg')} alt='intro pic' /></div>
                    <div className='intro'>
                        <div className='intro-head'>Hello!</div>
                        <div className='intro-text'>{introText}</div>
                    </div>
                </div>
                <div className='schedule-div'>
                    <Link onClick={toSchedule} className='schedule-link'>Schedule Now!</Link>
                    <div className='schedule-text'>{scheduleTextDefault}</div>
                </div>
                <div className='about-div' id='about'>
                    <div className='pic-container'><img className='about-pic' src={require('../imgs/shar_students_posed.jpg')} alt='pic with student' /></div>
                    <div className='about'>
                        <div className='about-head'>More About Me</div>
                        <div className='about-text'>{aboutText}</div>
                    </div>
                </div>
                <div className='reviews-div'>
                    <div className='reviews-head'>Reviews</div>
                    {realReviews.length > 0 ? '' : 
                        <div className='examples'>*Firebase is not loaded, these are example reviews</div>}
                    <div className='reviews'>
                        {(realReviews.length > 0 ? realReviews : exReviews).map((review, index) => { return (
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