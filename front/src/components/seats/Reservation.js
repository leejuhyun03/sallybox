import React, { useEffect, useRef } from 'react';
import LeftHeader from './LeftHeader';
import ReservSeats from './ReservSeats';
import '../../css/seats/Reservation.css'
import { useLocation, useNavigate } from 'react-router-dom';

const Reservation = () => {

    const navigate = useNavigate()
    const location = useLocation();
    const token = localStorage.getItem('token');
    const alertShown = useRef(false);
    const cinemaId = localStorage.getItem('cinemaId')


    useEffect(()=>{
        if(!token && !alertShown.current){
            alert('로그인이 필요한 서비스입니다.')
            alertShown.current = true;
            navigate('/sallybox/sign-in',{state:{ from: `/sallybox/cinema/${cinemaId}`}})
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