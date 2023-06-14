import '../styles/forms.css';
import {forwardRef, useImperativeHandle} from 'react'

const Inquiry = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        getData() {
            return ({
                type: 'inquiry',
                //get data from this form
            })
        }
    }));

    return (
        <div className='inquiry-page'>
            inquiry
            <div className='inquiry-div'>
                
            </div>
        </div>
    )
})

export default Inquiry;