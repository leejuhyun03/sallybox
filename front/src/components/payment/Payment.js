import React, { useContext, useState } from 'react';
import LeftHeader from '../seats/LeftHeader';
import BookingContext from '../BookingContext';
import '../../css/seats/Reservation.css'
import '../../css/payment/Payment.css'
import ReserveInfo from './ReserveInfo';
import PayMethod from './PayMethod';
import PaymentInfo from './PaymentInfo';

const Payment = () => {

    const {bookingData} = useContext(BookingContext)
    const [usePoint,setUsePoint] = useState(0);

    if (!bookingData || !bookingData.selectedSeats || bookingData.selectedSeats.length === 0) {
        return <p>선택된 좌석이 없습니다.</p>;
    }

    return (
        <div className='reserve_wrap'>
            <div className='left_reserv_wrap'>
                <LeftHeader/>
            </div>
            <div className='center_reserv_wrap'>
                <div className='reserve_info_wrap'>
                    <ReserveInfo/>
                </div>
                <div className='pay_method_wrap'>
                    <PayMethod etUsePoint={setUsePoint}/>
                </div>
                <div className='payment_info_wrap'>
                    <PaymentInfo usePoint={usePoint}/>
                </div>
            </div>
        </div>
    );
};

export default Payment;