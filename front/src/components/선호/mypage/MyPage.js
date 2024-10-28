import React, { useState } from 'react';
import './style.css'
import { VscEdit } from "react-icons/vsc";
import Wishes from './Wishes';



const MyPage = () => {

    const [showWishes,setShowWishes] = useState(false);
    

    return (
        <div id='contents' className='contents_mypage' style={{ paddingTop: '50px' }}>            
            <div className='mypage_top_infor' id='mypage_top_infor'>
            <h2 className='hidden'>마이페이지</h2>
                <div className='mypage_box'>
                    <div className='my_info'>
                        <div className='grade_area'>
                            <span className='round-button m15'>일반</span>
                        </div>
                        <p class="name"><strong>윤선호님</strong>반가워요!</p>
                        <div className='profile_set'>
                            <button type='button' className='btn_txt_edit'><VscEdit />편집</button>
                        </div>
                        
                    </div>
                    <div className='btn_wrap'>
                        <p target="_blank" title="L.POINT 페이지 이동">
                            <span className='txt_img'>
                                <span style={{fontWeight:'bold'}} >S.POINT</span>
                            </span>
                            <em>770P</em>
                        </p>
                    </div>
                </div>
            </div>
            <div id="mypage_top_menu">
                <ul className='tab_wrap_lnk ' >
                    <li className='menu-item'>
                        <h4>결제내역</h4>
                        <ul className='submenu'>
                            <li onClick={() => setShowWishes(true)}>예매내역</li>         
                        </ul>
                    </li>
                    <li className='menu-item' >
                        <h4> My 무비로그</h4>
                        <ul className='submenu'>
                        <li onClick={() => setShowWishes(true)}>찜목록</li>         
                        </ul>
                    </li>
                    <li className='menu-item' >
                        <h4>My 정보관리</h4>
                        <ul className='submenu'>
                            <li>회원 정보 관리</li>         
                        </ul>
                    </li>
                    <hr class="wrap_nav_underline">
                        
                    </hr>
                </ul>
            </div>  
            {showWishes && <Wishes />}
        </div>
    );
};

export default MyPage;