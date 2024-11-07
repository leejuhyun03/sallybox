import React, { useEffect, useState } from 'react';
import '../../../../css/main/header/modal/HeaderModal.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import hani from '../../../../image/hanni2.jpg'

const HeaderModal = ({onClose, isAuthenticated, userId}) => {

    const [name, setName] = useState([]);
    const [point, setPoint] = useState([]);
    const [error, setError] = useState(null);
    console.log('modal:' ,userId)

    const fetchUser = async () => {
        if (!userId) return; // userid가 없으면 함수 종료

        try {
            const response = await axios.get(
                `http://localhost:5000/api/movies/user`,
                {
                    params: {
                        userId: userId
                    },
                }
            );
            const data = response.data;
            
            setName(data[0])
            setPoint(data[1])
            console.log(name);
            console.log(point);
            
        } catch (err) {
            setError('Failed to fetch recommended movies.');
            console.error(err);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [userId]);

    return (
        
        <div className='Modals'>
            <div className='bg'></div>
            <div className='popup' style={{position: 'fixed', left: '50%', top: '70px', marginLeft: '-490px'}}>
                <div id="layerAllMenu" className="menu_all_wrap active">
                    <strong className="hidden">레이어 팝업 시작</strong>
                    <div className="group_menu_all">
                        <table className='mainTable'>
                            <caption>전체메뉴</caption>
                            <thead>
                                <tr>
                                    <th colSpan="6" scope="colgroup" id="gmenu">
                                        <span className="hidden">사이트 전체메뉴</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="col" id="gmenu1"><span>예매</span></th>
                                    <th scope="col" id="gmenu2"><span>영화</span></th>
                                    <th scope="col" id="gmenu3"><span>영화관</span></th>
                                    
                                </tr>
                                <tr>
                                    <td headers="gmenu gmenu1">
                                        <ul style={{paddingInlineStart: '0px'}}>
                                            <li><a href='http' title="예매하기" tabIndex="0">예매하기</a></li>
                                            <li><a title="상영시간표" tabIndex="0">상영시간표</a></li>
                                            <li><a title="할인안내" tabIndex="0">할인안내</a></li>
                                        </ul>
                                    </td>
                                    <td headers="gmenu gmenu2">
                                        <ul style={{paddingInlineStart: '0px'}}>
                                            <li><a href='http://localhost:3000/sallybox/movied/1' title="현재상영작" tabIndex="0">현재상영작</a></li>
                                            <li><a href='http://localhost:3000/sallybox/movied/2' title="상영예정작" tabIndex="0">Sally 추천작</a></li>
                                            <li><a href='http://localhost:3000/sallybox/classic' title="아르떼" tabIndex="0">추억의 영화관</a></li>
                                        </ul>
                                    </td>
                                    <td headers="gmenu gmenu3">
                                        <div style={{ display: 'flex'}}>
                                            <ul style={{ paddingInlineStart: '0px', marginRight: '30px' }}>
                                                <li><a href="http://localhost:3000/sallybox/cinema/1" title="영화관_서울_가산디지털">가산디지털</a></li>
                                                <li><a href="http://localhost:3000/sallybox/cinema/2" title="영화관_서울_가양">가양</a></li>
                                                <li><a href="http://localhost:3000/sallybox/cinema/3" title="영화관_서울_강동">강동</a></li>
                                                <li><a href="http://localhost:3000/sallybox/cinema/4" title="영화관_서울_건대입구">건대입구</a></li>
                                                <li><a href="http://localhost:3000/sallybox/cinema/5" title="김포공항">김포공항</a></li>
                                                <li><a href="http://localhost:3000/sallybox/cinema/6" title="노원">노원</a></li>
                                                <li><a href="http://localhost:3000/sallybox/cinema/7" title="도곡">도곡</a></li>
                                                <li><a href="http://localhost:3000/sallybox/cinema/8" title="독산">독산</a></li>
                                                <li><a href="http://localhost:3000/sallybox/cinema/9" title="서울대입구">서울대입구</a></li>
                                                <li><a href="http://localhost:3000/sallybox/cinema/10" title="수락산">수락산</a></li>
                                                <li><a href="http://localhost:3000/sallybox/cinema/11" title="수유">수유</a></li>
                                            </ul>
                                            <ul style={{ paddingInlineStart: '0px' }}>
                                                <li><a href="http://localhost:3000/sallybox/cinema/12" title="신대방(구로디지털역)">신대방(구로디지털역)</a></li>
                                                <li><a href="http://localhost:3000/sallybox/cinema/13" title="신도림">신도림</a></li>
                                                <li><a href="http://localhost:3000/sallybox/cinema/14" title="신림">신림</a></li>
                                                <li><a href="http://localhost:3000/sallybox/cinema/15" title="에비뉴엘(명동)">에비뉴엘(명동)</a></li>
                                                <li><a href="http://localhost:3000/sallybox/cinema/16" title="영등포">영등포</a></li>
                                                <li><a href="http://localhost:3000/sallybox/cinema/17" title="월드타워">월드타워</a></li>
                                                <li><a href="http://localhost:3000/sallybox/cinema/18" title="은평">은평</a></li>
                                                <li><a href="http://localhost:3000/sallybox/cinema/19" title="중랑">중랑</a></li>
                                                <li><a href="http://localhost:3000/sallybox/cinema/20" title="청량리">청량리</a></li>
                                                <li><a href="http://localhost:3000/sallybox/cinema/21" title="합정">합정</a></li>
                                                <li><a href="http://localhost:3000/sallybox/cinema/22" title="홍대입구">홍대입구</a></li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="col" id="gmenu7"><span>마이</span></th>
                                    <th scope="col" id="gmenu8"><span>고객센터</span></th>
                                    <th scope="col" id="gmenu8"><span>회원 서비스</span></th>
                                </tr>
                                <tr>
                                    <td headers="gmenu gmenu7">
                                        <ul style={{paddingInlineStart: '0px'}}>
                                            <li><a href='http://localhost:3000/sallybox/mypage' title="결제내역" tabIndex="0">결제내역</a></li>
                                            <li><a href='http://localhost:3000/sallybox/mypage' title="MY 정보 관리" tabIndex="0">MY 정보 관리</a></li>
                                        </ul>
                                    </td>
                                    <td headers="gmenu gmenu8">
                                        <ul style={{paddingInlineStart: '0px'}}>
                                            <li><a href='http://localhost:3000/sallybox/' title="공지사항" tabIndex="0">공지사항</a></li>
                                            <li><a href='http://localhost:3000/sallybox/' title="1:1 문의" tabIndex="0">1:1 문의</a></li>
                                        </ul>
                                    </td>
                                    <td headers="gmenu gmenu9">
                                        <ul style={{paddingInlineStart: '0px'}}>
                                            <li><a href='http://localhost:3000/sallybox/sign-in'title="로그인" tabIndex="0">로그인</a></li>
                                            <li><a href='http://localhost:3000/sallybox/sign-up' title="회원가입" tabIndex="0">회원가입</a></li>
                                            <li><a href='http://localhost:3000/sallybox/resetPassword' title="비밀번호찾기" tabIndex="0">아이디/비밀번호찾기</a></li>
                                            <li><a title="이용약관" tabIndex="0">이용약관</a></li>
                                            <li><a title="개인정보처리방침" tabIndex="0">개인정보처리방침</a></li>
                                            <li><a title="이메일무단수집거부" tabIndex="0">이메일무단수집거부</a></li>
                                            <li><a title="r고정형 영상정보처리기기 운영 및 관리방침" tabIndex="0">고정형 영상정보처리기기 운영 및 관리방침</a></li>
                                            <li><a title="L.POINT회원안내" tabIndex="0">L.POINT회원안내</a></li>
                                        </ul>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="group_my">
                        <div className="mypage_box">
                            <h3 className="hidden">회원 등급 및 포인트</h3>
                            <div className="my_info">
                            {   
                                isAuthenticated 
                                ? 
                                <>
                                    <div className="grade_area">
                                        <span className="txt_rank_common ml5">일반</span>
                                        </div>
                                    <p className="name"><strong style={{fontSize: '16px', marginRight: '5px'}}>{name}님</strong>반가워요!</p>
                                    <div className="my_point">
                                        <dl>
                                            <dt><img src="https://www.lottecinema.co.kr/NLCHS/Content/images/icon/txt_lpoint_46.png" alt="L.POINT"/></dt>
                                            <dd>
                                                <a href="#" style={{color: '#000'}} target="_blank" title="L.POINT 페이지 이동" tabIndex="0"><strong><b>{point}P</b></strong></a>
                                            </dd>
                                        </dl>
                                    </div>
                                </>
                                : 
                                <>
                                    <div className="area_btn_login">
                                        <Link to={'/sallybox/sign-in'} className="btn_col3 ty4 w_full" tabIndex="0" style={{borderRadius: '7px'}}>로그인</Link>
                                    </div>
                                    <div className="nomember_box">
                                        <p className="tip">로그인 하시고<br/>다양한 혜택을 확인하세요.</p>
                                        <Link to={'/sallybox/sign-up'} className="btn_col3 ty4 rnd" title="회원가입 페이지 이동" tabIndex="0" style={{borderRadius: '20px'}}>회원가입</Link>
                                    </div>
                                </>
                                }
                            </div>
                        </div>
                        <div className="bx_banner">
                            <img src={hani} alt="팜하니"/>
                        </div>
                    </div>
                    <div className="group_close">
                        <button className="btn_close" onClick={onClose}>전체메뉴 닫기</button>
                    </div>
                    <strong className="hidden txtTabIndex" tabIndex="0">레이어 팝업 끝</strong>
                </div>
            </div> 
        </div>
    );
};

export default HeaderModal;