import React from 'react';
import LeftHeader from './LeftHeader';
import ReservSeats from './ReservSeats';
import '../../css/seats/Reservation.css'

const Reservation = () => {

    return (
        <div className='reserve_wrap'>
            <div className='left_reserv_wrap'>
                <LeftHeader/>
            </div>
            <div className='center_reserv_wrap'>
                <ReservSeats />
            </div>
        </div>
    );
};

export default Reservation;