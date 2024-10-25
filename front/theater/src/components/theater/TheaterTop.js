import React from 'react';
import { CiHeart } from "react-icons/ci";
import { FaCar } from "react-icons/fa";
import { FaMapMarkedAlt } from "react-icons/fa";

import '../css/TheaterTop.css'

const TheaterTop = ({cinemaDTO}) => {

     // cinemaDTO가 존재하는지 확인
     if (!cinemaDTO) {
        return <p>Loading...</p>; // 데이터가 아직 로드되지 않은 경우
    }

    const {cinema_id,name,location,theater,seats,parking} = cinemaDTO;

    const ParkingStatus = (parking) => {
        const status = parking === 'Y' ? '가능':'불가능'
        return status
    }

    return (
        <div className='theater_top_wrap'>
                    <div className='theater_title'>
                        
                            <h3> {name} </h3>
                            {/* <button type='button' className='btn_like_theater'>
                                <span id='theater_like' className=''><CiHeart/></span>
                                My 영화관
                            </button> */}
                        
                    </div>
                    <div className='theater_top_bottom_wrap'>
                        <div className='info_wrap'>
                            <dl className='theater_info'>                                
                                <dt>총 상영관 수</dt>
                                <dd>{theater}개관</dd>
                                
                                <dt>총 좌석 수</dt>
                                <dd>{seats}석</dd>
                            </dl>
                            <dl className='theater_info'>
                                <dd className='addr'>{location}</dd>
                            </dl>
                            <dl className='theater_info'>
                                <dt><FaCar/> 주차가능여부 : </dt>
                                <dd><span>{ParkingStatus(parking)}</span></dd>                                
                            </dl>                                                           
                        </div>
                        <div className='rcm_wrap'>
                            <div className='rcm_txt_wrap'>
                                <div className='rcm_txt'>
                                    <strong>"{name}"</strong>에서 <br/>
                                    <span>"영화 추천"</span><br/>
                                    어떠신가요??
                                </div>
                                <div className='rcm_btn_wrap'>
                                    <a href='' className='btn_link' title='예매화면' style={{marginRight:'25px'}}>예매하러 가기</a>
                                </div>
                            </div>
                            <div className='rcm_movie'>
                                <a href=''><img src='' alt=''/>"포스터"</a>
                            </div>
                        </div>
                    </div>
                </div>
    );
};

export default TheaterTop;