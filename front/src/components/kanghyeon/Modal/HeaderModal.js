import React from 'react';
import './HeaderModal.css'
import { Link } from 'react-router-dom';

const HeaderModal = ({onClose, isAuthenticated, handleLogout}) => {

    return (
        
        <div className='Modal'>
            <div className='bg'></div>
            <div className='popup' style={{position: 'fixed', left: '50%', top: '70px', marginLeft: '-490px'}}>
                <div id="layerAllMenu" className="menu_all_wrap active">
                    <strong className="hidden">레이어 팝업 시작</strong>
                    <div className="group_menu_all">
                        <table>
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
                                    <th scope="col" id="gmenu4"><span>스페셜관</span></th>
                                    <th scope="col" id="gmenu5"><span>스토어</span></th>
                                    <th scope="col" id="gmenu6"><span>멤버십</span></th>
                                </tr>
                                <tr>
                                    <td headers="gmenu gmenu1">
                                        <ul style={{paddingInlineStart: '0px'}}>
                                            <li><a title="예매하기" tabIndex="0">예매하기</a></li>
                                            <li><a title="상영시간표" tabIndex="0">상영시간표</a></li>
                                            <li><a title="할인안내" tabIndex="0">할인안내</a></li>
                                        </ul>
                                    </td>
                                    <td headers="gmenu gmenu2">
                                        <ul style={{paddingInlineStart: '0px'}}>
                                            <li><a title="홈" tabIndex="0">홈</a></li>
                                            <li><a title="현재상영작" tabIndex="0">현재상영작</a></li>
                                            <li><a title="상영예정작" tabIndex="0">상영예정작</a></li>
                                            <li><a title="아르떼" tabIndex="0">아르떼</a></li>
                                        </ul>
                                    </td>
                                    <td headers="gmenu gmenu3">
                                        <ul style={{paddingInlineStart: '0px'}}>
                                            <li><a title="스페셜관" tabIndex="0">스페셜관</a></li>
                                            <li><a title="서울" tabIndex="0">서울</a></li>
                                            <li><a title="경기/인천" tabIndex="0">경기/인천</a></li>
                                            <li><a title="충청/대전" tabIndex="0">충청/대전</a></li>
                                            <li><a title="전라/광주" tabIndex="0">전라/광주</a></li>
                                            <li><a title="경북/대구" tabIndex="0">경북/대구</a></li>
                                            <li><a title="경남/부산/울산" tabIndex="0">경남/부산/울산</a></li>
                                            <li><a title="강원" tabIndex="0">강원</a></li>
                                            <li><a title="제주" tabIndex="0">제주</a></li>
                                        </ul>
                                    </td>
                                    <td headers="gmenu gmenu4">
                                        <ul style={{paddingInlineStart: '0px'}}>
                                            <li><a title="홈" tabIndex="0">홈</a></li>
                                            <li><a title="샤롯데" tabIndex="0">샤롯데</a></li>
                                            <li><a title="수퍼플렉스" tabIndex="0">수퍼플렉스</a></li>
                                            <li><a title="수퍼MX4D" tabIndex="0">수퍼MX4D</a></li>
                                            <li><a title="수퍼 4D" tabIndex="0">수퍼 4D</a></li>
                                            <li><a title="수퍼LED" tabIndex="0">수퍼LED</a></li>
                                            <li><a title="광음시네마" tabIndex="0">광음시네마</a></li>
                                            <li><a title="리클라이너" tabIndex="0">리클라이너</a></li>
                                            <li><a title="씨네패밀리" tabIndex="0">씨네패밀리</a></li>
                                            <li><a title="씨네커플" tabIndex="0">씨네커플</a></li><li>
                                            <a title="씨네비즈" tabIndex="0">씨네비즈</a></li>
                                        </ul>
                                    </td>
                                    <td headers="gmenu gmenu5">
                                        <ul style={{paddingInlineStart: '0px'}}>
                                            <li><a title="베스트" tabIndex="0">베스트</a></li>
                                            <li><a title="포토카드" tabIndex="0">포토카드</a></li>
                                            <li><a title="관람권" tabIndex="0">관람권</a></li>
                                            <li><a title="스낵음료" tabIndex="0">스낵음료</a></li>
                                        </ul>
                                    </td>
                                    <td headers="gmenu gmenu6">
                                        <ul style={{paddingInlineStart: '0px'}}>    
                                            <li><a title="VIP" tabIndex="0">VIP</a></li>
                                            <li><a title="짝꿍클럽" tabIndex="0">짝꿍클럽</a></li>
                                            <li><a title="틴틴클럽" tabIndex="0">틴틴클럽</a></li>
                                            <li><a title="브라보클럽" tabIndex="0">브라보클럽</a></li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="col" id="gmenu7"><span>마이</span></th>
                                    <th scope="col" id="gmenu8"><span>고객센터</span></th>
                                    <th scope="col" id="gmenu9"><span>회원 서비스</span></th>
                                    <th scope="col" id="gmenu10"><span>이벤트</span></th>
                                    <th scope="col" id="gmenu11"><span>할인안내</span></th>
                                </tr>
                                <tr>
                                    <td headers="gmenu gmenu7">
                                        <ul style={{paddingInlineStart: '0px'}}>
                                            <li><a title="결제내역" tabIndex="0">결제내역</a></li>
                                            <li><a title="쿠폰함" tabIndex="0">쿠폰함</a></li>
                                            <li><a title="MY 이벤트" tabIndex="0">MY 이벤트</a></li>
                                            <li><a title="MY 클럽" tabIndex="0">MY 클럽</a></li>
                                            <li><a title="MY 무비로그" tabIndex="0">MY 무비로그</a></li>
                                            <li><a title="MY 정보 관리" tabIndex="0">MY 정보 관리</a></li>
                                        </ul>
                                    </td>
                                    <td headers="gmenu gmenu8">
                                        <ul style={{paddingInlineStart: '0px'}}>
                                            <li><a title="브라보클럽" tabIndex="0">FAQ</a></li>
                                            <li><a title="공지사항" tabIndex="0">공지사항</a></li>
                                            <li><a title="1:1 문의" tabIndex="0">1:1 문의</a></li>
                                            <li><a title="단체관람/대관문의" tabIndex="0">단체관람/대관문의</a></li>
                                            <li><a title="분실물문의" tabIndex="0">분실물문의</a></li>
                                        </ul>
                                    </td>
                                    <td headers="gmenu gmenu9">
                                        <ul style={{paddingInlineStart: '0px'}}>
                                            <li><a title="로그인" tabIndex="0">로그인</a></li>
                                            <li><a title="회원가입" tabIndex="0">회원가입</a></li>
                                            <li><a title="아이디/비밀번호찾기" tabIndex="0">아이디/비밀번호찾기</a></li>
                                            <li><a title="이용약관" tabIndex="0">이용약관</a></li>
                                            <li><a title="개인정보처리방침" tabIndex="0">개인정보처리방침</a></li>
                                            <li><a title="이메일무단수집거부" tabIndex="0">이메일무단수집거부</a></li>
                                            <li><a title="r고정형 영상정보처리기기 운영 및 관리방침" tabIndex="0">고정형 영상정보처리기기 운영 및 관리방침</a></li>
                                            <li><a title="L.POINT회원안내" tabIndex="0">L.POINT회원안내</a></li>
                                        </ul>
                                    </td>
                                    <td headers="gmenu gmenu10">
                                        <ul style={{paddingInlineStart: '0px'}}>
                                            <li><a title="영화" tabIndex="0">영화</a></li>
                                            <li><a title="시사회/무대인사" tabIndex="0">시사회/무대인사</a></li>
                                            <li><a title="HOT" tabIndex="0">HOT</a></li>
                                            <li><a title="제휴할인" tabIndex="0">제휴할인</a></li>
                                            <li><a title="우리동네영화관" tabIndex="0">우리동네영화관</a></li>
                                        </ul>
                                    </td>
                                    <td headers="gmenu gmenu11">
                                        <ul style={{paddingInlineStart: '0px'}}>
                                            <li><a title="신용카드" tabIndex="0">신용카드</a></li>
                                            <li><a title="포인트" tabIndex="0">포인트</a></li>
                                            <li><a title="통신사" tabIndex="0">통신사</a></li>
                                            <li><a title="기타결제수단" tabIndex="0">기타결제수단</a></li>
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
                                    <p className="name"><strong style={{fontSize: '16px', marginRight: '5px'}}>허강현님</strong>반가워요!</p>
                                    <div className="my_point">
                                        <dl>
                                            <dt><img src="https://www.lottecinema.co.kr/NLCHS/Content/images/icon/txt_lpoint_46.png" alt="L.POINT"/></dt>
                                            <dd>
                                                <a href="#" style={{color: '#000'}} target="_blank" title="L.POINT 페이지 이동" tabIndex="0"><strong><b>770P</b></strong></a>
                                            </dd>
                                            <dt><b>쿠폰함</b></dt>
                                            <dd><a href="#" style={{color: '#000'}} title="쿠폰함 페이지 이동" tabIndex="0"><b>0</b></a></dd>
                                        </dl>
                                    </div>
                                    <div className="my_theater" id="my_theater">
                                        <h3 className="tit">MY 영화관</h3><button type="button" className="btn_setup">설정</button>
                                        <ul className="theater_box">
                                            <li className="alter" id="my_theater_1"><strong>월드타워</strong></li>
                                            <li className="add" id="my_theater_2"><a href="#" tabIndex="0">2nd</a></li>
                                            <li className="add" id="my_theater_3"><a href="#" tabIndex="0">3rd</a></li>
                                        </ul>
                                    </div>
                                </>
                                : 
                                <>
                                    <div className="area_btn_login">
                                        <Link to={'/sign-in'} className="btn_col3 ty4 w_full" tabIndex="0" style={{borderRadius: '7px'}}>로그인</Link>
                                    </div>
                                    <div className="nomember_box">
                                        <p className="tip">로그인 하시고<br/>다양한 혜택을 확인하세요.</p>
                                        <Link to={'/sign-up'} className="btn_col3 ty4 rnd" title="회원가입 페이지 이동" tabIndex="0" style={{borderRadius: '20px'}}>회원가입</Link>
                                    </div>
                                </>
                                }
                            </div>
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