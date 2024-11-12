import React, { useEffect, useRef } from 'react';
import LeftHeader from './LeftHeader';
import ReservSeats from './ReservSeats';
import '../../css/seats/Reservation.css'
import { useNavigate } from 'react-router-dom';

const Reservation = () => {

    const navigate = useNavigate()
    const token = localStorage.getItem('token');
    const alertShown = useRef(false);

    useEffect(()=>{
        if(!token && !alertShown.current){
            alert('로그인하세요.')
            alertShown.current = true;
            navigate('/sallybox/sign-in')
        }
    },[token,navigate])

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