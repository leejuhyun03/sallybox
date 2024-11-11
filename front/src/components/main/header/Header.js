import React, { useEffect, useRef, useState } from 'react';
import { IoMenuSharp } from "react-icons/io5";
import '../../../css/main/header/header.css'
import '../../../css/main/header/headerswiper.css'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';

import data1 from '../../../image/swimage/AmazonBullseye_19207742.jpg'
import data2 from '../../../image/swimage/GrandMa_1920774_2.jpg'
import data3 from '../../../image/swimage/MyPet_1920774.jpg'
import data4 from '../../../image/swimage/TwilightOfTheWarriors_1920774.jpg'

import { Link } from 'react-router-dom';
import HeaderModal from './Modal/HeaderModal';
import NavbarTest3 from './Navbar/NavbarTest3';
import { useUser } from '../../../context/UserContext';

const Header = () => {

  let [visible1, setVisible1] = useState(false)
  let [visible2, setVisible2] = useState(false)
  let [visible3, setVisible3] = useState(false)
  
  const [isShow, setIsShow] = useState(false);

  const { userId, isAuthenticated, setIsAuthenticated, userName, userPoint } = useUser();

  const handleLogout = () => {
    alert("로그아웃 하시겠습니까?")
    localStorage.removeItem('token'); // 토큰 제거
    setIsAuthenticated(false); // 인증 상태 업데이트
  };

  const onOpen = () => {
    setIsShow(true)
  };

  const onClose = () => {
    setIsShow(false);
  };

  let onTrue1 = () => {
    // !true = false, !false - > true
    setVisible1(true)
  }

  let onFalse1 = () => {
    // !true = false, !false - > true
    setVisible1(false)
  }

  let onTrue2 = () => {
    // !true = false, !false - > true
    setVisible2(true)
  }

  let onFalse2 = () => {
    // !true = false, !false - > true
    setVisible2(false)
  }

  useEffect(() => {
    // 페이지를 새로 고침하기 전에 이전 상태를 확인하여 리로드가 한 번만 일어나도록 함
    if (!sessionStorage.getItem('hasReloaded')) {
      sessionStorage.setItem('hasReloaded', 'true');
      window.location.reload();
    }
  }, [userId]);

  return (
  <>
  <NavbarTest3 handleLogout={handleLogout}/>
  <div id='header_section' className='header ty3'>
      <Link to={'/'}><h1 className="logo growing" style={{height: '37px', width: '219px'}}>Sallybox</h1></Link>
        <div className='gnb'>
        <ul className="g_menu2">
          <li><a href='#'>멤버십</a></li>
          <li><a href='http://localhost:3000/sallybox/gogaksenter'>고객센터</a></li>
          <li><a href='#'>단체관람/대관문의</a></li>
          {
            isAuthenticated ? <li><a href='/' onClick={handleLogout}>로그아웃</a></li>
                            : <li><Link to={'/sallybox/sign-in'}>로그인</Link></li>
          }
          
          {/* <li><Link to={'/sign-in'}>로그아웃</Link></li> */}
        </ul>
        <ul className="g_menu3">
        {
          isAuthenticated ? <li><Link className='btn_my' to={`/sallybox/mypage/${userId}`}>마이</Link></li>
                          : <li><Link className='btn_my' to={'/sallybox/sign-up'}>회원가입</Link></li>
        }
          <li><a href="http://localhost:3000/sallybox/reserv/ticketing" className="btn_reserve">바로 예매</a></li>
          <li><button className="btn_menu_all" onClick={() => onOpen(true)}>전체 메뉴 레이어 열기</button></li>
          {
              isShow && <HeaderModal onClose = {onClose} userName = {userName} userPoint = {userPoint}/>
          }
        </ul>
      </div>

      <div id='navs' className='area__gnbmovingbar'>
        <ul>
          <li className='your-elements'>
            <a href='http://localhost:3000/sallybox/reserv/ticketing' className='hover'>예매</a>
          </li>
          <li className='your-elements'>
            <a href='#' className='hover' onMouseOver={onTrue1} onMouseLeave={onFalse1}>영화</a>
            { // visible이 true이면 이라는 뜻
              visible1 &&
            <div className='navbar' style={{display: 'block'}} onMouseOver={onTrue1} onMouseLeave={onFalse1}>
              <ul style={{display: 'inline-block', listStyle: 'none', opacity: '1'}}>
              <li>
                <Link to={'/sallybox/movied/1'}>현재상영작</Link>
              </li>
              <li>
                <Link to={'/sallybox/movied/2'}>Sally 추천작</Link>
              </li>
              <li>
                <Link to={'/sallybox/classic'}>추억의 영화관</Link>
              </li>
              </ul> 
            </div>
            }
          </li>
          <li className='your-elements'>
            <a href='#' className='hover' onMouseOver={onTrue2} onMouseLeave={onFalse2}>영화관</a>
            { 
              visible2 &&
            <div className='navbar' style={{display: 'block', height: '60px'}} onMouseOver={onTrue2} onMouseLeave={onFalse2}>
              <ul className='navbarul'>
                <li>
                  <a href="#" title="스페셜관">스페셜관</a>
                </li>
                <li>
                  <a href="http://localhost:3000/sallybox/cinema/1" title="영화관_서울_가산디지털">가산디지털</a>
                </li>
                <li>
                  <a href="http://localhost:3000/sallybox/cinema/2" title="영화관_서울_가양">가양</a>
                </li>
                <li>
                  <a href="http://localhost:3000/sallybox/cinema/3" title="영화관_서울_강동">강동</a>
                </li>
                <li>
                  <a href="http://localhost:3000/sallybox/cinema/4" title="영화관_서울_건대입구">건대입구</a>
                </li>
                <li>
                  <a href="http://localhost:3000/sallybox/cinema/5" title="김포공항">김포공항</a>
                </li>
                <li>
                  <a href="http://localhost:3000/sallybox/cinema/6" title="노원">노원</a>
                </li>
                <li>
                  <a href="http://localhost:3000/sallybox/cinema/7" title="도곡">도곡</a>
                </li>
                <li>
                  <a href="http://localhost:3000/sallybox/cinema/8" title="독산">독산</a>
                </li>
                <li>
                  <a href="http://localhost:3000/sallybox/cinema/9" title="서울대입구">서울대입구</a>
                </li>
                <li>
                  <a href="http://localhost:3000/sallybox/cinema/10" title="수락산">수락산</a>
                </li>
                <li>
                  <a href="http://localhost:3000/sallybox/cinema/11" title="수유">수유</a>
                </li>
                <li>
                  <a href="http://localhost:3000/sallybox/cinema/12" title="신대방(구로디지털역)">신대방(구로디지털역)</a>
                </li>
                <li>
                  <a href="http://localhost:3000/sallybox/cinema/13" title="신도림">신도림</a>
                </li>
                <li>
                  <a href="http://localhost:3000/sallybox/cinema/14" title="신림">신림</a>
                </li>
                <li><a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
                <li><a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
                <li><a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
                <li><a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
                <li><a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
                <li>
                  <a href="http://localhost:3000/sallybox/cinema/15" title="에비뉴엘(명동)">에비뉴엘(명동)</a>
                </li>
                <li>
                  <a href="http://localhost:3000/sallybox/cinema/16" title="영등포">영등포</a>
                </li>
                <li>
                  <a href="http://localhost:3000/sallybox/cinema/17" title="월드타워">월드타워</a>
                </li>
                <li>
                  <a href="http://localhost:3000/sallybox/cinema/18" title="은평">은평</a>
                </li>
                <li>
                  <a href="http://localhost:3000/sallybox/cinema/19" title="중랑">중랑</a>
                </li>
                <li>
                  <a href="http://localhost:3000/sallybox/cinema/20" title="청량리">청량리</a>
                </li>
                <li>
                  <a href="http://localhost:3000/sallybox/cinema/21" title="합정">합정</a>
                </li>
                <li>
                  <a href="http://localhost:3000/sallybox/cinema/22" title="홍대입구">홍대입구</a>
                </li>
              </ul> 
            </div>
            }
          </li>
          <li className="wrap_nav_underline"><span className="nav_underline"></span></li>
        </ul>
      </div>
    </div>
    
    <Swiper
          cssMode={true}
          navigation={true}
          pagination={false}
          mousewheel={true}
          keyboard={true}
          loop={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
          className="myHeaderSwiper"
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
        >
          <SwiperSlide style={{height:'774px', width:'1920px'}}><img src={data1} alt='#'/></SwiperSlide>
          <SwiperSlide style={{height:'774px', width:'1920px'}}><img src={data2} alt='#'/></SwiperSlide>
          <SwiperSlide style={{height:'774px', width:'1920px'}}><img src={data3} alt='#'/></SwiperSlide>
          <SwiperSlide style={{height:'774px', width:'1920px'}}><img src={data4} alt='#'/></SwiperSlide>
          <div className='item'></div>
        </Swiper> 
    </>
  );
};

export default Header;