import React, { useContext } from 'react';
import '../../css/payment/PayInfo.css'
import BookingContext from '../BookingContext';
import tweleve from '../../image/grade_12.png'
import all from '../../image/grade_all.png'
import fifteen from '../../image/grade_15.png'
import nineteen from '../../image/pc_grade_19.png'

const ReserveInfo = () => {

    const {bookingData} = useContext(BookingContext)
    const { schedule, selectedSeats, counts } = bookingData; //selectedSeats = 배열
    const {poster_path,certification,title,created,start_time,end_time,name,screen_no,theater_type} = schedule

    const getAgeRatingImg = (certification) => {
        switch(certification){
            // case '전체연령가' : return '../image/grade_all.png'
            case '12세 관람가' : return tweleve;
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

    // 인원수 정보를 필터링하여 배열로 변환
    const peopleArray = Object.entries(counts).filter(([key, value]) => value > 0);
    const peopleLabels = {
        adult: '성인',
        teenager: '청소년',
        senior: '경로',
        disabled: '장애인'
    };

    

    return (
        <div className='article_wrap'>
            <div className='jh_group_top'>
                <h4>예매 정보</h4>
            </div>
            <div className='inner'>
                <div className='reserve_movie_info'>
                    <img src={`https://image.tmdb.org/t/p/original${poster_path}`} alt='영화 포스터'/>
                    <div className='reserve_movie_title_info'>
                        <img src={getAgeRatingImg(certification)} alt='연령이미지'/>
                        <strong>{title}</strong>
                    </div>
                    <dl>
                        <dt>일시</dt>
                        <dd>{formatDate(created)}  {formatTime(start_time)}~{formatTime(end_time)}</dd>
                        <dt>영화관</dt>
                        <dd>{name} {screen_no}관 - {theater_type}</dd>
                        <dt>인원</dt>
                        <dd>
                            {peopleArray.map(([type, count]) => (
                            <span key={type}>{peopleLabels[type]}: {count}명 </span>
                            ))}
                        </dd>
                    </dl>
                </div>
                <div className='reserve_seat_info'>
                    <dl>
                        <dt>좌석</dt>
                        <dd>
                            {
                                selectedSeats.map(seat=>(
                                    <span key={seat.seat_id}>{seat.seat_row}열 {seat.num}번 <br/></span>
                                ))
                            }
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default ReserveInfo;