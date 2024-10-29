import React, { useState } from 'react';
import './wishes.css'
import image from '../assets/21457_103_1.jpg'
import {
    FcLikePlaceholder,
    FcLike
}from 'react-icons/fc'


const Wishes = () => {

    const [isLiked, setIsLiked] = useState(false);

    const handleClick = () => {
        setIsLiked(!isLiked);
      };

    return (
        <>
            <div >
                <div className='mypage_wrap'>
                    <div className='title_sub_area'>
                        <div className='left_area'>
                            <h1 class="title">내가 보고 싶은 영화</h1>
                            <span class="sub"><em>1</em> 편</span>
                        </div>
                    </div>
                    <ul className='my_movie_list'>
                    <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                        <div className='poster' style={{cursor: 'pointer'}}>
                            <a href="#none"><img src={image} alt="" style={{ width: '100%', height: 'auto' }} /></a>
                        </div>
                        
                        <strong className='tit' style={{ cursor: 'pointer' }}>
                            <span className="ic_grade gr_15"></span>
                            베놈: 라스트 댄스
                        </strong>

                        <div className='detail_info ty1'>
                            <i onClick={() => { handleClick() }} style={{ marginTop: '40px', marginLeft: '-212px' }}>
                                {isLiked 
                                    ? <FcLike style={{ width: '30px', height: '30px' }}/> 
                                    : <FcLikePlaceholder style={{ width: '30px', height: '30px' }}/>}
                            </i> 
                        </div>
                        <div className='btn_box'>
                            <a href='./' className='btn_col3 ty2 rnd'>
                                <span className="txt_ic_booking">예매하기</span>
                            </a>
                        </div>
                    </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Wishes;