import React from 'react';
import '../css/Theater_Modal.css'
import { AiOutlineClose } from 'react-icons/ai';
import all from '../image/grade_all.png'
import twelve from '../image/grade_12.png'
import fifteen from '../image/grade_15.png'
import nineteen from '../image/pc_grade_19.png'

const TheaterModal = ({closeModal}) => {

    return (
        <div className='Modal'>
            <div className='Modal_title'>
                <h2>관람 등급 안내</h2>
                <span onClick={closeModal}><i><AiOutlineClose/></i></span>
            </div>            
            <div className='Modal_info_wrap'>
                <div className='Modal_info_title'>
                    <span>등급명</span>
                    <span>설명</span>
                </div>
                <div className='Modal_info_desc'>
                    <div className='info_desc_grade'>
                        <span><img src={all} alt='all'/>전체관람가</span>
                        <span>모든 연령의 관람객이 관람할 수 있는 영화</span>
                    </div>
                    <div className='info_desc_grade'>
                        <span><img src={twelve} alt='twelve'/>만 12세 이상 관람가</span>
                        <span>만 12세 미만의 관람객은 관람할 수 없는 영화<br/>
                        부모 및 보호자 동반시 관람 가능</span>
                    </div>
                    <div className='info_desc_grade'>
                        <span><img src={fifteen} alt='fifteen'/>만 15세 이상 관람가</span>
                        <span>만 15세 미만의 관람객은 관람할 수 없는 영화 <br/>
                        부모 및 보호자 동반시 관람 가능</span>
                    </div>
                    <div className='info_desc_grade'>
                        <span><img src={nineteen} alt='nineteen'/>청소년 관람불가</span>
                        <span>만 19세 미만의 관람객은 관람할 수 없는 영화 <br/>
                        성인 보호자를 동반하여도 관람 불가  <br/>
                        (영화 관람시 반드시 신분증 지참)</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TheaterModal;