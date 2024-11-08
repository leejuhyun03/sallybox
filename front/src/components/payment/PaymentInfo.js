import React, { useContext } from 'react';
import '../../css/payment/PayInfo.css'
import BookingContext from '../BookingContext';
import { PaymentContext } from '../PaymentContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import numeral from 'numeral';

const PaymentInfo = ({usePoint}) => {

    const navigate = useNavigate();
    const {bookingData} = useContext(BookingContext)
    const {setPaymentData} = useContext(PaymentContext)
    const {totalPrice} = bookingData

    const { isAuthenticated, setIsAuthenticated } = useUser();

    const onBooking = async() => {

        try{

            const {schedule,selectedSeats} = bookingData;
            
            const bookingNum = Math.floor(Math.random() * 1000000) + Date.now();
            let peopleType;
            

            for(let i = 0; i < selectedSeats.length; i++){ 
                const seat = selectedSeats[i] 
                // const peopleType = determinePeopleType(i);

                if(seat.seat_type === '휠체어'){
                    peopleType = '장애인'
                }else{
                    peopleType = determinePeopleType(i)
                }

                const bookingDataToSend = {
                    userId: '1', // jwt에서 userId 받아서 쓸거임
                    scheduleId: schedule.schedule_id,
                    seatId: seat.seat_id,
                    bookingDate: new Date(),
                    peopleType,
                    bookingNum: bookingNum, // 랜덤한 bookingNum 생성
                    movieId:schedule.movie_id
                };
                //console.log('전송할 데이터:', bookingDataToSend); // 전송할 데이터를 로그로 출력
               
                await axios.post('http://localhost:8085/sallybox/payment/booking', bookingDataToSend);
            }

            await axios.post('http://localhost:8085/sallybox/payment/final',{
                userId:'1', //jwt에서 받음
                bookingNum:bookingNum,
                paymentMethod:'card',
                price:totalPrice,
                paymentDate:new Date().toISOString(),
                pointUsage:usePoint,                
                // totalPayment:totalPrice-usePoint
            })

            setPaymentData({
                userId: '1', //jwt에서 받기
                userName: '이주현', //jwt에서 받기
                posterPath:schedule.poster_path,
                bookingNum:bookingNum,
                created:schedule.created,
                start_time:schedule.start_time,
                end_time:schedule.end_time,
                cinemaName:schedule.name,
                theaterNo:schedule.screen_no,
                peopleType:bookingData.counts,
                seats:selectedSeats,
                totalPrice:totalPrice,
                discountAmount:usePoint
            });         

            navigate('/sallybox/reserv/complete')

        }catch (error){
            alert('예약 중 오류 발생:' + error)
        }

    }

    const determinePeopleType = (index) => {
        const { counts } = bookingData;
    
        if (index < counts.adult + counts.disabled) return '성인'; //counts.adult = 2
        if (index < counts.adult + counts.teenager + counts.disabled) return '청소년';
        if (index < counts.adult + counts.teenager + counts.senior + counts.disabled) return '경로';
        return '장애인';
    };

    const formatPrice = (price) => {
        return numeral(price).format('0,0'); // 1000 단위로 콤마 찍기
      };

    return (
        <div className='article_wrap'>
            <div className='group_top'>
                <h4>결제하기</h4>
            </div>
            <div className='inner'>
                <div className='select_point'></div>
                <div className='payment_sum'>
                    <div className='jh_for_pay'>
                        <div className='jh_calc_price'>
                            <span>상품금액</span>
                            <span>{formatPrice(totalPrice)}</span>
                        </div>
                        <div className='jh_calc_price'>
                            <span>할인금액</span>
                            <span>- {formatPrice(usePoint)}</span>
                        </div>
                        <div className='jh_calc_price'>
                            <span>결제금액</span>
                            <span>{formatPrice(totalPrice - usePoint)}</span>
                        </div>
                    </div>
                    <button onClick={onBooking}>결제하기</button>
                </div>
            </div>
        </div>
    );
};

export default PaymentInfo;