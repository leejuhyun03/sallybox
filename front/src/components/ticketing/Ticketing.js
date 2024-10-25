import React from 'react';
import LeftHeader from '../seats/LeftHeader';

const Ticketing = () => {
    return (
        <div className='reserve_wrap'>
            <div className='left_reserv_wrap'>
                <LeftHeader/>
            </div>
            <div className='center_reserv_wrap'>
                <p>ticketing</p>
            </div>
        </div>
    );
};

export default Ticketing;