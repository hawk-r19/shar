import '../styles/announcements.css'
import {useState, useEffect} from 'react'

export default function Announcements({props}) {
    const {mobile, firestore} = props;
    const showExample = false;

    const [anns, setAnns] = useState([]);

    //importing all announcement images
    function importAll(r) {
        let images = {};
        r.keys().map(item => {images[item.replace('./', '').replace(/\.[^/.]+$/, '')] = r(item);});
        return images;
    }
    const annImgs = importAll(require.context('../imgs/ann_imgs/', false, /\.(png|jpe?g|svg)$/));

    //get announcements
    useEffect(() => {
        firestore.collection('announcements').orderBy('date').get().then(snapshot => {
            var tempAnns = []
            snapshot.forEach(doc => {
                if(doc.id !== 'ex_ann1' || (doc.id === 'ex_ann1' && showExample)) { //don't include example review if not testing
                    if(doc.img_ann) tempAnns.push({...doc.data(), img_src: annImgs[doc.img_name]});
                    else tempAnns.push(doc.data());
                }
            });
            setAnns([...tempAnns]);
        }).catch(error => console.log(error));
    }, []);

    return (
        <div className={"page ann-page" + (mobile ? ' mobile' : '')}>
            <div className='ann-header'>Announcements</div>
            <div className='ann-content'>
                <ul className='ann-list'>
                    {anns.length > 0 ? (anns.map((ann, index) => {return (
                        <li className={'announcement' + (ann.img_ann ? ' img_ann' : '')} key={index}>
                            {ann.text}
                            {ann.img_ann ? <img src={annImgs[ann.img_name]} alt='should be pic here'/> : <></>}
                        </li>)}
                    )) : <li className='announcement'>No announcements at this time</li>}
                </ul>
            </div>
        </div>
    )
}