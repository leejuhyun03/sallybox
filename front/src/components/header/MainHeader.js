import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/header/MainHeader.css'

const MainHeader = () => {

let [visible1, setVisible1] = useState(false)
  let [visible2, setVisible2] = useState(false)
  let [visible3, setVisible3] = useState(false)
  let [visible38, setVisible38] = useState(false)
  let [visible4, setVisible4] = useState(false)
  let [visible5, setVisible5] = useState(false)
  
  const [isShow, setIsShow] = useState(false)

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token); // 토큰이 존재하면 true, 없으면 false
  }, []);

  const handleLogout = () => {
    alert("로그아웃 하시겠습니까?")
    localStorage.removeItem('token'); // 토큰 제거
    setIsAuthenticated(false); // 인증 상태 업데이트
  };

  const onOpen = () => {
    setIsShow(true)
  }

  const onClose = () => {
      setIsShow(false)
  }

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

  let onTrue4 = () => {
    // !true = false, !false - > true
    setVisible4(true)
  }

  let onFalse4 = () => {
    // !true = false, !false - > true
    setVisible4(false)
  }

  let onTrue5 = () => {
    // !true = false, !false - > true
    setVisible5(true)
  }

  let onFalse5 = () => {
    // !true = false, !false - > true
    setVisible5(false)
  }

    return (
            <div id='header_section' className='headers'>
            <Link to={'/'}><h1 className="logos" style={{backgroundSize: '130px 36px'}}>Sallybox</h1></Link>
                <div className='gnbs'>
                <ul className="g_menu2">
                <li><a href='#'>멤버십</a></li>
                <li><a href='#'>고객센터</a></li>
                <li><a href='#'>단체관람/대관문의</a></li>
                {
                    isAuthenticated ? <li><a href='/' onClick={handleLogout}>로그아웃</a></li>
                                    : <li><Link to={'/sallybox'}>로그인</Link></li>
                }
                </ul>
                <ul className="g_menu3">
                {
                isAuthenticated ? <li><Link className='btn_my' to={'/sallybox'}>마이</Link></li>
                                : <li><Link className='btn_my' to={'/sallybox/sign-up'}>회원가입</Link></li>
                }
                <li><a href="#" className="btn_reserve">바로 예매</a></li>
                </ul>
            </div>

            <div id='nav' className='area__gnbmovingbar'>
                <ul>
                <li className='your-elements'>
                    <a href='#' className='hover' onMouseOver={onTrue1} onMouseLeave={onFalse1} style={{color: 'black'}}>예매</a>
                    { // visible이 true이면 이라는 뜻
                    visible1 &&
                    <div className='navbars' style={{display: 'block', backgroundColor: '#F8F8F8'}} 
                         onMouseOver={onTrue1} onMouseLeave={onFalse1}>
                    <ul style={{display: 'inline-block', listStyle: 'none', margin: '0', padding: '0', opacity: '1'}}>
                        <li style={{float: 'left'}}>
                        <a href="https://www.lottecinema.co.kr/NLCHS/Ticketing" title="예매하기">예매하기</a>
                        </li>
                        <li style={{float: 'left'}}>
                        <a href="https://www.lottecinema.co.kr/NLCHS/Ticketing/Schedule" title="상영시간표">상영시간표</a>
                        </li>
                        <li style={{float: 'left'}}>
                        <a href="https://www.lottecinema.co.kr/NLCHS/Ticketing/DiscountGuide" title="할인안내">할인안내</a>
                        </li>
                    </ul> 
                    </div>
                    }
                </li>
                <li className='your-elements'>
                    <a href='#' className='hover' onMouseOver={onTrue2} onMouseLeave={onFalse2} style={{color: 'black'}}>영화</a>
                    { // visible이 true이면 이라는 뜻
                    visible2 &&
                    <div className='navbars' style={{display: 'block', backgroundColor: '#F8F8F8'}} 
                         onMouseOver={onTrue2} onMouseLeave={onFalse2}>
                    <ul  style={{display: 'inline-block', listStyle: 'none', margin: '0', padding: '0', opacity: '1'}}>
                        <li style={{float: 'left'}}>
                        <a href="https://www.lottecinema.co.kr/NLCHS/Movie" title="홈">홈</a>
                        </li>
                        <li style={{float: 'left'}}>
                        <a href="https://www.lottecinema.co.kr/NLCHS/Movie/List?flag=1" title="현재상영작">현재상영작</a>
                        </li>
                        <li style={{float: 'left'}}>
                        <a href="https://www.lottecinema.co.kr/NLCHS/Movie/List?flag=5" title="상영예정작">상영예정작</a>
                        </li>
                        <li style={{float: 'left'}}>
                        <a href="https://www.lottecinema.co.kr/NLCHS/Movie/Arte" title="아르떼">아르떼</a>
                        </li>
                    </ul> 
                    </div>
                    }
                </li>
                <li className='your-elements'>
                    <a href='#' className='hover' onMouseOver={onTrue3} onMouseLeave={onFalse3} style={{color: 'black'}}>영화관</a>
                    { // visible이 true이면 이라는 뜻
                    visible3 &&
                    <div className='navbars' style={{display: 'block', backgroundColor: '#F8F8F8'}} 
                         onMouseOver={onTrue3} onMouseLeave={onFalse3}>
                    <ul style={{display: 'inline-block', listStyle: 'none', margin: '0', padding: '0', opacity: '1'}}>
                        <li style={{float: 'left'}}>
                        <a href="#" title="스페셜관">스페셜관</a>
                        </li>
                        <li style={{float: 'left'}}>
                        <a href="#" title="서울">서울</a>
                        </li>
                        <li style={{float: 'left'}}>
                        <a href="#" title="경기/인천">경기/인천</a>
                        </li>
                        <li style={{float: 'left'}}>
                        <a href="#" title="충청/대전">충청/대전</a>
                        </li>
                        <li style={{float: 'left'}}>
                        <a href="#" title="전라/광주">전라/광주</a>
                        </li>
                        <li style={{float: 'left'}}>
                        <a href="#" title="경북/대구">경북/대구</a>
                        </li>
                        <li style={{float: 'left'}}>
                        <a href="#" title="경남/부산/울산">경남/부산/울산</a>
                        </li>
                        <li style={{float: 'left'}} >
                        <a href="#" title="강원" onMouseOver={onTrue38} onMouseLeave={onFalse38}>강원</a>
                        { // visible이 true이면 이라는 뜻
                            visible38 &&
                            <div className='navbar1' style={{display: 'block'}} onMouseOver={onTrue38} onMouseLeave={onFalse38}>
                            <ul style={{opacity: '1'}} onMouseOver={onTrue38} onMouseLeave={onFalse38}>
                                <li >
                                <a href="#" title="영화관_강원_강릉">강릉</a>
                                </li>
                                <li >
                                <a href="#" title="영화관_강원_남원주">남원주</a>
                                </li>
                                <li >
                                <a href="#" title="영화관_강원_동해">동해</a>
                                </li>
                                <li >
                                <a href="#" title="영화관_강원_원주무실">원주무실</a>
                                </li>
                                <li >
                                <a href="#" title="영화관_강원_춘천">춘천</a>
                                </li>
                            </ul>
                            </div>
                        }
                        </li>
                        <li style={{float: 'left'}}>
                        <a href="#" title="제주">제주</a>
                        </li>
                    </ul> 
                    </div>
                    }
                </li>
                <li className="wrap_nav_underline"><span className="nav_underline"></span></li>
                </ul>
            </div>
        </div>
    );
};

export default MainHeader;