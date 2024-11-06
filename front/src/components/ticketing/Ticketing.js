import React from 'react';
import LeftHeader from '../seats/LeftHeader';

const Ticketing = () => {
    return (
        <div className='reserve_wrap'>
            <div className='left_reserv_wrap'> 
                {/* div는 이미 세팅 되어 있는거라 여기 말고 아래부터 코딩해 */}
                <LeftHeader/> 
                {/* Sets.js에 LeftHeader */}
            </div>
            <div className='center_reserv_wrap'>
                {/* 여기부터 코딩해요 */}
                <p>ticketing</p>
            </div>
            {/* ticketion.css를 p부분에 넣어서 디자인 하면됨 */}
        </div>
    );
};

export default Ticketing;