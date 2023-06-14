import '../styles/forms.css';
import {forwardRef, useImperativeHandle} from 'react'

const Direct = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        getData() {
            return ({
                type: 'direct',
                //get data from this form
            });
        }
    }));

    return (
        <div className='direct-schedule-page'>
            direct scheduling
            <div className='direct-schedule-div'>
                <div className='info-div'>
                    
                </div>
                <div className='calendar-div'>
                    
                </div>
            </div>
        </div>
    )
});

export default Direct;