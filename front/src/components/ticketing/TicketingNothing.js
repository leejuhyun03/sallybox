import React from 'react';
import '../../css/ticketing/TicketingNothing.css';

const TicketingNothing = () => {
    return (
        <div>
            <div className='jytime_nothing'>
                <span>조회 가능한 상영 시간이 없습니다.</span>
                <span>다른 날짜를 선택해 주세요</span>
            </div>
        </div>
    );
};

export default TicketingNothing;
