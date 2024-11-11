import React, { useContext } from 'react';
import '../../css/payment/PaymentSuccess.css'
import '../../css/seats/Reservation.css'
import LeftHeader from '../seats/LeftHeader';
import topNotice from '../../image/top_notice.png'
import numeral from 'numeral';
import { PaymentContext } from '../PaymentContext';
import { HiOutlineMinusCircle } from "react-icons/hi";
import { LuCircleEqual } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import vip from '../../image/2020_vip.png'
import vvip from '../../image/2020_vvip.png'
import gold from '../../image/2020_gold.png'
import platinum from '../../image/2020_platinum.png'
import { useUser } from '../../context/UserContext';

const PaymentSuccess = () => {

    const {paymentData} = useContext(PaymentContext)
    const navigate = useNavigate()
    const { userId, userName } = useUser();

    const {posterPath,bookingNum,created, start_time, end_time, cinemaName, theaterNo, peopleType, seats, totalPrice, 
        discountAmount} = paymentData

    const extractDate = (created) => {
        const date = new Date(created)
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            });
    };

    const getWeekday = (created) => {
        const date = new Date(created);
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        return days[date.getDay()];
    };

    const formatTime = (isoString) => {
        const date = new Date(isoString)
        return date.toLocaleTimeString([],{hour: '2-digit', minute: '2-digit',hour12: false})
    }

    const convertPeopleType = (peopleType) => {
        const result = [];
      
        if (peopleType.adult > 0) {
          result.push(`성인 ${peopleType.adult}명`);
        }
        if (peopleType.teenager > 0) {
          result.push(`청소년 ${peopleType.teenager}명`);
        }
        if (peopleType.senior > 0) {
          result.push(`경로 ${peopleType.senior}명`);
        }
        if (peopleType.disabled > 0) {
          result.push(`장애인 ${peopleType.disabled}명`);
        }
      
        return result.length > 0 ? result.join(', ') : '해당 인원이 없습니다';
      };

    const getSeats = (seats) => {
        const result = []
        for(let i=0;i<seats.length;i++){
            const string = seats[i].seat_row + seats[i].num
            result.push(string)
        }
        return result.length > 0 ? result.join(', ') : '해당 좌석이 없습니다.'
    }

    const formatPrice = (price) => {
        return numeral(price).format('0,0'); // 1000 단위로 콤마 찍기
      };


    return (
        <div className='reserve_wrap'>
            <div className='left_reserv_wrap'>
                <LeftHeader/>
            </div>
            <div className='center_reserv_wrap'>
                <div className='article_payment_fin'>
                    <div className='payment_group_top'>
                        <h4>결제 완료</h4>
                    </div>
                    <div className='payment_inner'>
                        <div className='payment_fin_wrap'>
                            <div className='payment_top_notice'>
                                <img src={topNotice} alt='카드'/>
                                <strong style={{fontSize:'20px'}}>"{userName}" 회원님, 결제가 성공적으로 완료되었습니다.</strong>
                            </div>
                            <div className='reserve_result_wrap'>
                                <div className='infor_result_wrap'>
                                    <div className='reserv_poster'>
                                        <img src={`https://image.tmdb.org/t/p/original${posterPath}`} alt='예약 영화 이미지'/>
                                    </div>
                                    <div className='reserv_payment_info'>
                                        <div className='reserv_payment_info_booknum'>
                                            <span>예매 번호</span>
                                            <span style={{fontWeight: 'bold'}}>{bookingNum}</span>
                                        </div>
                                        <div className='reserv_payment_info_bottom'>
                                            <div className='jh_info_reserv'>
                                                <span>상영일시</span>
                                                <span>
                                                    {extractDate(created)} ({getWeekday(created)})<br/>
                                                    {formatTime(start_time)} ~ {formatTime(end_time)}    
                                                </span>
                                            </div>
                                            <div className='jh_info_reserv'>
                                                <span>상영관</span>
                                                <span>{cinemaName} {theaterNo}관</span>
                                            </div>
                                            <div className='jh_info_reserv'>
                                                <span>관람인원</span>
                                                <span>{convertPeopleType(peopleType)}</span>
                                            </div>
                                            <div className='jh_info_reserv'>
                                                <span>좌석</span>
                                                <span>{getSeats(seats)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='infor_pay_count'>
                                    <div className='pay_count_row'>
                                        <span>주문금액</span>
                                        <span>{formatPrice(totalPrice)}원</span>
                                    </div>
                                    <div className='pay_count_row'>
                                        <HiOutlineMinusCircle style={{width:'25px', height:'25px',paddingTop:'5px'}}/>
                                    </div>
                                    <div className='pay_count_row'>
                                        <span>할인금액</span>
                                        <span>{formatPrice(discountAmount)}원</span>
                                    </div>
                                    <div className='pay_count_row'>
                                        <LuCircleEqual style={{width:'25px', height:'25px',paddingTop:'5px'}}/>
                                    </div>
                                    <div className='pay_count_row'>
                                        <span>총 결제 금액</span>
                                        <span>{formatPrice(totalPrice - discountAmount)}원</span>
                                    </div>
                                </div>
                            </div>
                            <div className='success_info'>
                                <ul>
                                    <li>예약 취소는 마이페이지에서 가능합니다.</li>
                                    <li>포인트 적립은 아래 이미지를 참고해주시길 바랍니다.</li>
                                </ul>
                            </div>
                            <div className='point_grade_img'>
                                <div className='point_grade_top'>
                                    <div className='grade_img_group'>
                                        <img src={vip} alt='vip'/>
                                        <span style={{backgroundColor:'#675448'}}>VIP</span>
                                        <p>5%</p>
                                    </div>
                                    <div className='grade_img_group'>
                                        <img src={vvip} alt='vvip'/>
                                        <span style={{backgroundColor:'#969697'}}>VVIP</span>
                                        <p>8%</p>
                                    </div>
                                    <div className='grade_img_group'>
                                        <img src={gold} alt='gold'/>
                                        <span style={{backgroundColor:'#756023'}}>GOLD</span>
                                        <p>12%</p>
                                    </div>
                                    <div className='grade_img_group'>
                                        <img src={platinum} alt='platinum'/>
                                        <span style={{backgroundColor:'#000'}}>PLATINUM</span>
                                        <p>18%</p>
                                    </div>                                    
                                </div>
                            </div>
                            <div className='btn_success_wrap'>
                                <button onClick={()=>navigate(`/sallybox/mypage/${userId}`)}>결제내역</button>
                                <button onClick={()=>navigate('/')}>홈으로 바로가기</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;