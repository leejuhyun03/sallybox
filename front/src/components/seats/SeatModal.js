<<<<<<< HEAD
import React from 'react';
import '../../css/seats/SeatModal.css'

const SeatModal = ({handleModal}) => {
    return (
        <div className='seat_modal_wrap'>
            <p>예약 정보가 없습니다. 
                <br/>상영 시간 예매 페이지로 이동하세요</p>
            <button onClick={handleModal}>확인</button>
        </div>
    );
};

=======
import React from 'react';
import '../../css/seats/SeatModal.css'

const SeatModal = ({handleModal}) => {
    return (
        <div className='seat_modal_wrap'>
            <p>예약 정보가 없습니다. 
                <br/>상영 시간 예매 페이지로 이동하세요</p>
            <button onClick={handleModal}>확인</button>
        </div>
    );
};

>>>>>>> 963c018b77b364d1a5310fbcfa99d105fdfe1969
export default SeatModal;