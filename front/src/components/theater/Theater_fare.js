import React, { useState } from 'react';
import '../../css/theater/Theater_fare.css'

const Theater_fare = () => {

    const [type,setType] = useState('general')

    const onType = (name) => {
        setType(name)
    }


    return (
        <div className='fare_wrap'>
            <div className='fare_top_wrap'>
                <button onClick={()=>onType('general')} className={type === 'general' ? 'active':''}>일반관</button>
                <button onClick={()=>onType('special')} className={type === 'special' ? 'active':''}>스페셜관</button>
            </div>
            <div className='fare_bottom_wrap'>
                <div className={`fare_bottom_content ${type === 'general' ? 'active':''}`}>
                    <div className='top_content'>
                        <div className='price_title'>
                            <h4>2D,3D 일반석</h4>
                        </div>
                        <div className='price_content'>
                             <div className='content_content'>
                                <strong>구분</strong>
                                <span>성인</span>
                                <span>청소년</span>
                                <span>경로</span>
                                <span>장애인</span>
                            </div> 
                            <div className='content_content'>
                                <strong>일반</strong>
                                <span>15,000</span>
                                <span>12,000</span>
                                <span>10,000</span>
                                <span>8,000</span>
                            </div>
                        </div>
                        <div className='price_title'>
                            <h4>4D 일반석</h4>
                        </div>
                        <div className='price_content'>
                             <div className='content_content'>
                                <strong>구분</strong>
                                <span>성인</span>
                                <span>청소년</span>
                                <span>경로</span>
                                <span>장애인</span>
                            </div> 
                            <div className='content_content'>
                                <strong>일반</strong>
                                <span>18,000</span>
                                <span>15,000</span>
                                <span>13,000</span>
                                <span>11,000</span>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className={`fare_bottom_content ${type === 'special' ? 'active':''}`}>
                <div className='top_content'>
                        <div className='price_title'>
                            <h4>리클라이너 관</h4>
                        </div>
                        <div className='price_content'>
                             <div className='content_content'>
                                <strong>구분</strong>
                                <span>성인</span>
                                <span>청소년</span>
                                <span>경로</span>
                                <span>장애인</span>
                            </div> 
                            <div className='content_content'>
                                <strong>일반</strong>
                                <span>20,000</span>
                                <span>17,000</span>
                                <span>15,000</span>
                                <span>13,000</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='fare_detail_wrap'>
                <strong>청소년 할인</strong>
                <ul>
                    <li>만 4세이상~만 19세미만의 초ㆍ중ㆍ고등학생(청소년증 소지자) 및 미취학아동</li>
                </ul>
                <strong>경로 우대할인</strong>
                <ul>
                    <li>경로 : 만 65세 이상 고객(반드시 본인의 신분증 지참)</li>
                </ul>
                <strong>장애 우대할인</strong>
                <ul>
                    <li>현장에서 복지카드를 소지한 장애인
                        (장애의 정도가 심한 장애인 : 동반 1인까지 적용(기존 1~3등급) 
                        / 장애의 정도가 심하지 않은 장애인 : 본인에 한함(기존 4~6등급)
                    </li>
                </ul>
                <strong>유아 해당 사항</strong>
                <ul>
                    <li>48개월 미만의 경우 증빙원(예 : 의료보험증, 주민등록 초/등본 등) 지참 시에만 무료관람 가능합니다.
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Theater_fare;