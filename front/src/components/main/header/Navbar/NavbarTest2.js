import React, { useEffect, useState } from 'react';
import '../../../../css/main/header/navbar/navbarTest2.css';
import { Link } from 'react-router-dom';


const NavbarTest2 = ({ isAuthenticated, handleLogout }) => {

    let [visible1, setVisible1] = useState(false)
    let [visible2, setVisible2] = useState(false)
    let [visible3, setVisible3] = useState(false)
    let [visible38, setVisible38] = useState(false)

  const [visible, setVisible] = useState(false);

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

    let onTrue38 = () => {
      // !true = false, !false - > true
      setVisible38(true)
    }

    let onFalse38 = () => {
      // !true = false, !false - > true
      setVisible38(false)
    }


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

  return (
    <div className={`navbar ${visible ? 'show' : ''}`}>
      <div className="topNav">
        <ul className="navbar-list">
          <li className="your-elements">
            <a href="#" className="hovers" onMouseOver={onTrue1} onMouseLeave={onFalse1}>예매</a>
            {visible1 && (
              <div className="navbar" style={{ display: 'block' }} onMouseOver={onTrue1} onMouseLeave={onFalse1}>
                <ul style={{ display: 'inline-block', listStyle: 'none', margin: '0', padding: '0', opacity: '1' }}>
                  <li style={{ float: 'left' }}>
                    <a href="https://www.lottecinema.co.kr/NLCHS/Ticketing" title="예매하기">예매하기</a>
                  </li>
                  <li style={{ float: 'left' }}>
                    <a href="https://www.lottecinema.co.kr/NLCHS/Ticketing/Schedule" title="상영시간표">상영시간표</a>
                  </li>
                  <li style={{ float: 'left' }}>
                    <a href="https://www.lottecinema.co.kr/NLCHS/Ticketing/DiscountGuide" title="할인안내">할인안내</a>
                  </li>
                </ul>
              </div>
            )}
          </li>
          <li className="your-elements">
            <a href="#" className="hovers" onMouseOver={onTrue2} onMouseLeave={onFalse2}>영화</a>
            {visible2 && (
              <div className="navbar" style={{ display: 'block' }} onMouseOver={onTrue2} onMouseLeave={onFalse2}>
                <ul style={{ display: 'inline-block', listStyle: 'none', margin: '0', padding: '0', opacity: '1' }}>
                  <li style={{ float: 'left' }}>
                    <a href="https://www.lottecinema.co.kr/NLCHS/Movie" title="홈">홈</a>
                  </li>
                  <li style={{ float: 'left' }}>
                    <a href="https://www.lottecinema.co.kr/NLCHS/Movie/List?flag=1" title="현재상영작">현재상영작</a>
                  </li>
                  <li style={{ float: 'left' }}>
                    <a href="https://www.lottecinema.co.kr/NLCHS/Movie/List?flag=5" title="상영예정작">상영예정작</a>
                  </li>
                  <li style={{ float: 'left' }}>
                    <a href="https://www.lottecinema.co.kr/NLCHS/Movie/Arte" title="아르떼">아르떼</a>
                  </li>
                </ul>
              </div>
            )}
          </li>
          <li className="your-elements">
            <a href="#" className="hovers" onMouseOver={onTrue3} onMouseLeave={onFalse3}>영화관</a>
            {visible3 && (
              <div className="navbar" style={{ display: 'block' }} onMouseOver={onTrue3} onMouseLeave={onFalse3}>
                <ul style={{ display: 'inline-block', listStyle: 'none', margin: '0', padding: '0', opacity: '1' }}>
                  <li style={{ float: 'left' }}>
                    <a href="#" title="스페셜관">스페셜관</a>
                  </li>
                  <li style={{ float: 'left' }}>
                    <a href="#" title="서울">서울</a>
                  </li>
                  <li style={{ float: 'left' }}>
                    <a href="#" title="강원" onMouseOver={onTrue38} onMouseLeave={onFalse38}>강원</a>
                    {visible38 && (
                      <div className='navbar1' style={{ display: 'block' }} onMouseOver={onTrue38} onMouseLeave={onFalse38}>
                        <ul style={{ opacity: '1' }} onMouseOver={onTrue38} onMouseLeave={onFalse38}>
                          <li>
                            <a href="#" title="영화관_강원_강릉">강릉</a>
                          </li>
                          <li>
                            <a href="#" title="영화관_강원_남원주">남원주</a>
                          </li>
                          <li>
                            <a href="#" title="영화관_강원_동해">동해</a>
                          </li>
                          <li>
                            <a href="#" title="영화관_강원_원주무실">원주무실</a>
                          </li>
                          <li>
                            <a href="#" title="영화관_강원_춘천">춘천</a>
                          </li>
                        </ul>
                      </div>
                    )}
                  </li>
                  <li style={{ float: 'left' }}>
                    <a href="#" title="제주">제주</a>
                  </li>
                </ul>
              </div>
            )}
          </li>
          <li className="wrap_nav_underline"><span className="nav_underline"></span></li>
        </ul>
        <ul className="g_menu4">
            {
            isAuthenticated ? <li><Link className='btn_mys' to={'/sallybox'}>마이</Link></li>
                            : <li><Link className='btn_mys' to={'/sallybox/sign-up'}>회원가입</Link></li>
            }
            <li><a href="#" className="btn_reserves">바로 예매</a></li>
        </ul>
      </div>
    </div>
  );
};

export default NavbarTest2;
