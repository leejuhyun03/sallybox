import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../../css/main/header/navbar/navbarTest3.css'
import { useUser } from '../../../../context/UserContext';

const NavbarTest3 = ({setUserId}) => {

  const [visible, setVisible] = useState(false);
  let [visible1, setVisible1] = useState(false)
  let [visible2, setVisible2] = useState(false)
  let [visible3, setVisible3] = useState(false)


  const { isAuthenticated, userId } = useUser();

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


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

  let onTrue3 = () => {
    // !true = false, !false - > true
    setVisible3(true)
  }

  let onFalse3 = () => {
    // !true = false, !false - > true
    setVisible3(false)
  }

    return (
      <div className={`navbar ${visible ? 'show' : ''}`}>
        <div className="topNavs">
            <div className='headerf'>
              <div className='gnbs'>
                <ul className="g_menu3">
                {
                isAuthenticated ? <li><Link className='btn_my' to={`/sallybox/mypage/${userId}`}>마이</Link></li>
                                : <li><Link className='btn_my' to={'/sallybox/sign-in'}>로그인</Link></li>
                }
                  <li><a href="'http://localhost:3000/sallybox/reserv/ticketing'" className="btn_reserve">바로 예매</a></li>
                </ul>
              </div>

            <div id='navs' className='area__gnbmovingbar'>
              <ul>
                <li className='your-elements'>
                    <a href='http://localhost:3000/sallybox/reserv/ticketing' className='hover' style={{color: 'black'}}>예매</a>
                </li>
                <li className='your-elements'>
                    <a href='#' className='hover' onMouseOver={onTrue1} onMouseLeave={onFalse1} style={{color: 'black'}}>영화</a>
                    { // visible이 true이면 이라는 뜻
                    visible1 &&
                    <div className='navbars' style={{display: 'block', backgroundColor: '#F8F8F8', top: '37px'}} 
                         onMouseOver={onTrue1} onMouseLeave={onFalse1}>
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
                    <a href='#' className='hover' onMouseOver={onTrue2} onMouseLeave={onFalse2} style={{color: 'black'}}>영화관</a>
                    { // visible이 true이면 이라는 뜻
                    visible2 &&
                    <div className='navbars' style={{display: 'block', backgroundColor: '#F8F8F8', height: '60px', top: '37px'}} 
                         onMouseOver={onTrue2} onMouseLeave={onFalse2}>
                      <ul className='navbaruls'>
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
                        <li><a>&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
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
      </div>
   </div>
    );
};

export default NavbarTest3;