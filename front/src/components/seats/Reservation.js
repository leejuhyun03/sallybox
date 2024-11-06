<<<<<<< HEAD
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

=======
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

>>>>>>> 963c018b77b364d1a5310fbcfa99d105fdfe1969
export default Reservation;