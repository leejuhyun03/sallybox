import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/seats/ReservSeats.css'
import all from '../../image/grade_all.png'
import twelve from '../../image/grade_12.png'
import fifteen from '../../image/grade_15.png'
import nineteen from '../../image/pc_grade_19.png'
import BookingContext from '../BookingContext';
import Seats from './Seats';
import { useNavigate } from 'react-router-dom';
import type1 from '../../image/seat_type1.png'
import type2 from '../../image/seat_type2.png'
import type3 from '../../image/seat_type3.png'
import type4 from '../../image/seat_type4.png'
import SeatModal from './SeatModal';

const ReservSeats = () => {

    //예약정보 받아오기
    const {bookingData, setBookingData} = useContext(BookingContext)
    const [err,setErr] = useState(null)
    const [seats,setSeats] = useState([])
    const [price,setPrice] = useState(0);
    const [showModal,setShowModal] = useState(false)
    const navigate = useNavigate()

    

    //스프링 부트에 theater_id 보내서 seats 정보 받아옴 
    useEffect(() => {

        const getSeats = async () => {
            if (bookingData.schedule && bookingData.schedule.theater_id) {
                try {
                    const response = await axios.get('http://192.168.16.4:8085/sallybox/reserv/seats', {
                        params: { theater_id: bookingData.schedule.theater_id, schedule_id:bookingData.schedule.schedule_id },
                        headers: { 'Content-Type': 'application/json' }
                    });

                    // console.log(response.data)
                    setSeats(response.data);
                    
                } catch (error) {
                    console.log('백엔드에서 seats 정보 가져오는데 실패함', error);
                    setErr('좌석 정보를 가져오는데 실패했습니다.');
                } 
            }else{
                setShowModal(true)
            }
        };

        getSeats();

    }, [bookingData,navigate]);

    const handleModal = () => {
        setShowModal(false)
        navigate('/sallybox/reserv/ticketing')
    }

    //인원 선택
    const [counts,setCounts] = useState({
        adult:0,
        teenager: 0,
        senior: 0,
        disabled: 0
    })
    const increaseCount = (type) => {
        setCounts((prevCounts)=>{
            const updatedCounts = {
                ...prevCounts,
                [type]: prevCounts[type] < 8 ? prevCounts[type] + 1 : 8
            };
            calcPrice(updatedCounts); // 인원 변경 시 가격 계산
            setBookingData((prevData) => ({
                ...prevData,
                counts: updatedCounts
            }));
            return updatedCounts;
        })
    }
    const decreaseCount = (type) => {
        setCounts((prevCounts) => {
            const updatedCounts = {
                ...prevCounts,
                [type]: prevCounts[type] > 0 ? prevCounts[type] - 1 : 0
            };
            calcPrice(updatedCounts); // 인원 변경 시 가격 계산
            setBookingData((prevData) => ({
                ...prevData,
                counts: updatedCounts
            }));
            return updatedCounts;
        });
    };

    //가격 설정
    const calcPrice = (updatedCounts) => {
        const {theater_type} = bookingData.schedule

        let totalPrice = 0

        const priceTable = {
            '2D' : {adult:15000,teenager:12000,senior:10000,disabled:8000},
            '4D' : {adult:18000,teenager:15000,senior:13000,disabled:11000},
            '리클라이너' : {adult:20000,teenager:17000,senior:15000,disabled:13000}
        } 

        if(priceTable[theater_type]){
            totalPrice += updatedCounts.adult * priceTable[theater_type].adult
            totalPrice += updatedCounts.teenager * priceTable[theater_type].teenager
            totalPrice += updatedCounts.senior * priceTable[theater_type].senior
            totalPrice += updatedCounts.disabled * priceTable[theater_type].disabled
        }
        setPrice(totalPrice)
    }

    const getAgeRatingImg = (age_rating) => {
        switch(age_rating){
            // case '전체연령가' : return '../image/grade_all.png'
            case '12세 관람가' : return twelve;
            case '15세 관람가' : return fifteen;
            case '19세 관람가' : return nineteen ;
            default : return all;
        }
    };

    //날짜, 시간 조정
    const formatDate = (created) => {
        const date = new Date(created)

        const year = date.getFullYear()
        const month = (`0${date.getMonth() + 1}`).slice(-2)
        const day = (`0${date.getDate()}`).slice(-2)

        return `${year}-${month}-${day}`
    }

    const formatTime = (isoString) => {
        const date = new Date(isoString)
        return date.toLocaleTimeString([],{hour: '2-digit', minute: '2-digit',hour12: false})
    }

     // ** bookingData.schedule이 없을 때 모달을 먼저 표시하고 나머지 컴포넌트 렌더링을 막음**
     if (!bookingData.schedule) {
        return (
            <>
                { showModal && <SeatModal handleModal={handleModal} /> }
            </>
        );
    }
    // ***************************************************

    const handlePaymentClick = () => {
        if (bookingData.selectedSeats && bookingData.selectedSeats.length > 0) {
            setBookingData((prevData) => ({
                ...prevData,
                totalPrice:price
            }));
            navigate('/sallybox/payment');
        } else {
            alert('인원수를 선택하세요.');
        }
    };


    if(err) return <p>{err}</p>

    return (
        <div className='reserv_seats_wrap'>
            <div className='reserv_group_top'>
                <h4 style={{marginLeft: '200px'}}>인원/좌석 선택</h4>
                <p>*인원은 최대 8명까지 선택 가능합니다.</p>
            </div>
            <div className='inner_wrap'>
                <div className='seat_count'>
                    <div className='movie_info'>   
                        <img src={`https://image.tmdb.org/t/p/original/${bookingData.schedule.poster_path}`} alt='예매영화포스터'/>
                        <div className='movie_info_text'>
                            <div className='bx_title'>
                                <img alt='연령 이미지' src={getAgeRatingImg(bookingData.schedule.certification)}/>
                                <strong style={{fontSize:'18px'}}>{bookingData.schedule.title}</strong>
                            </div>
                            <div className='bx_info'>
                                <span>{formatDate(bookingData.schedule.created)}</span><br/>
                                <span>{formatTime(bookingData.schedule.start_time)+'~'+formatTime(bookingData.schedule.end_time)}</span><br/>
                                <span>{bookingData.schedule.name}, {bookingData.schedule.screen_no}관</span>
                            </div>
                        </div>
                    </div>
                    <div className='count_people'>
                        <ul>
                            <li>
                                <strong>성인 :</strong>
                                <span>
                                    <button onClick={()=>decreaseCount('adult')} style={{marginBottom:'27px',fontSize:'45px'}}>
                                            -
                                    </button>
                                    <p>{counts.adult}</p>
                                    <button onClick={()=>increaseCount('adult')} style={{marginBottom:'7px'}}>
                                            +
                                    </button>
                                </span>
                            </li>
                            <li>
                                <strong>청소년 :</strong>
                                <span>
                                    <button onClick={()=>decreaseCount('teenager')} style={{marginBottom:'27px',fontSize:'45px'}}>
                                            -
                                    </button>
                                    <p>{counts.teenager}</p>
                                    <button onClick={()=>increaseCount('teenager')} style={{marginBottom:'7px'}}>+</button>
                                </span>
                            </li>
                            <li>
                                <strong>경로 :</strong>
                                <span>
                                    <button onClick={()=>decreaseCount('senior')} style={{marginBottom:'27px',fontSize:'45px'}}>-</button>
                                    <p>{counts.senior}</p>
                                    <button onClick={()=>increaseCount('senior')} style={{marginBottom:'7px'}}>+</button>
                                </span>
                            </li>
                            <li>
                                <strong>장애인 :</strong>
                                <span>
                                    <button onClick={()=>decreaseCount('disabled')} style={{marginBottom:'27px',fontSize:'45px'}}>-</button>
                                    <p>{counts.disabled}</p>
                                    <button onClick={()=>increaseCount('disabled')} style={{marginBottom:'7px'}}>+</button>
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        { showModal && <SeatModal handleModal={handleModal}/>}
                    </div>
                </div>
                <div className='select_seat_wrap'>
                    <div className='top_txt_info'>
                        <p>좌석 선택 후 결제 버튼을 클릭하세요</p>
                    </div>
                    <div className='center_seat_info'>
                        <span>S C R E E N</span>
                        <div className='seat_info_under'>
                            <Seats seats={seats} counts={counts}/>
                        </div>
                    </div>
                </div>
                <div className='seat_btm_box'>
                    <div className='seat_type_info'>
                        <div className='seat_top_info'>
                            <img src={type1} alt='선택가능 좌석'/>
                            <span>선택 가능</span>
                            <img src={type2} alt='선택한 좌석'/>
                            <span>선택한 좌석</span>
                            <img src={type3} alt='선택 불가 좌석'/>
                            <span>예매 완료</span>
                            <img src={type4} alt='장애인 석'/>
                            <span>장애인 석</span>
                        </div>
                    </div>
                </div>
                <div className='person_summary'>
                    <div className='group_left'>
                        <div className='select_seat_result'>
                            <span>총 합계</span>
                            <span>{price}</span>
                            <span>원</span>
                        </div>
                    </div>
                    <div className='group_right'>
                        <button onClick={handlePaymentClick} className='to_pay_link'>
                            <span>결제하기</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReservSeats;