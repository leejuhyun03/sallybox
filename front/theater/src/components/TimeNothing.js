import React from 'react';
import '../css/TimeNothing.css'

const TimeNothing = () => {
    return (
        <div className='time_nothing'>
            <span>조회 가능한 상영 시간이 없습니다.</span>
            <span>다른 날짜를 선택해 주세요</span>
        </div>
    );
};

export default TimeNothing;