import React, { useEffect, useState } from 'react';
import '../../css/SH/style.css'
import { VscEdit } from "react-icons/vsc";
import Wishes from './Wishes';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Showmovie from './Showmovie';
import MyInfo from './MyInfo';
import ProfileModal from './ProfileModal';
import Gogakboon from './Gogakboon';

const calculatePointsToNextTier = (points) => {
    if (points >= 10000) return 0;  // Already PLATINUM
    if (points >= 5000) return 10000 - points;  // Points needed for PLATINUM
    if (points >= 1000) return 5000 - points;  // Points needed for GOLD
    return 1000 - points;  // Points needed for VVIP
  };
  
  const getNextTier = (points) => {
    if (points >= 10000) return 'PLATINUM';
    if (points >= 5000) return 'PLATINUM';
    if (points >= 1000) return 'GOLD';
    return 'VVIP';
  };


const MyPage = () => {

    const [showWishes,setShowWishes] = useState(false);
    

    const{userId} = useParams();

    const [customerInfo, setCustomerInfo] = useState(null);
    const [wishlistMovies, setWishlistMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    //편집 모달
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    const [hoveredMenu, setHoveredMenu] = useState(null);

    const handleCloseProfileModal = () => {
        setIsProfileModalOpen(false);
    };
    const handleOpenProfileModal = () => {
        setIsProfileModalOpen(true);
        
    };
    //

    const [showMyInfo, setShowMyInfo] = useState(false);
    const [showShowmovie, setShowShowmovie] = useState(false); // Showmovie 상태 추가
    const [showGogakboon, setShowGogakboon] = useState(false);

    const handleShowShowmovie = () => {
        setShowShowmovie(true);
        setShowWishes(false);  // 찜목록 숨기기
        setShowMyInfo(false);  // 정보관리 숨기기
        setShowGogakboon(false); // 고각분 숨기기
    };

    const handleShowWishes = () => {
        setShowWishes(true);
        setShowShowmovie(false); // 예매내역 숨기기
        setShowMyInfo(false);    // 정보관리 숨기기
        setShowGogakboon(false); // 고각분 숨기기
    };

    const handleShowMyInfo = () => {
        setShowMyInfo(true);
        setShowShowmovie(false); // 예매내역 숨기기
        setShowWishes(false);    // 찜목록 숨기기
        setShowGogakboon(false); // 고각분 숨기기
    };

    const handleToggleGogakboon = () => {
        setShowGogakboon(prev => !prev);
        setShowWishes(false);
        setShowShowmovie(false); // 예매내역 숨기기
        setShowMyInfo(false);    // 정보관리 숨기기
    };

    const handleCancelShowmovie = () => {
        setShowShowmovie(false);
    };

    //주용

    const fetchMyPageData  = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`/sallybox/mypage/${userId}`);
            setCustomerInfo(response.data.customerInfo);
            setWishlistMovies(response.data.wishlistMovies);
            setError(null);
        } catch (err) {
            setError('데이터를 불러오는 데 실패했습니다.');
            console.error('Error fetching data:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const updateWishlist = async () => {
        try {
            const response = await axios.get(`/sallybox/mypage/${userId}`);
            setWishlistMovies(response.data.wishlistMovies);
        } catch (err) {
            console.error('위시리스트 업데이트 실패:', err);
        }
    };

    const pointsToNextTier = calculatePointsToNextTier(customerInfo?.points || 0);
    const nextTier = getNextTier(customerInfo?.points || 0);


    useEffect(() => {
        fetchMyPageData();
    }, [userId]);

    if (isLoading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>에러: {error}</div>;
    }

  

    const handleMenuHover = (menu) => {
        setHoveredMenu(menu);
    };

    const handleMenuLeave = () => {
        setHoveredMenu(null);
    };
    

    return (
        <div id='contents' className='contents_mypage' style={{ paddingTop: '50px' }}>            
            <div className='mypage_top_infor' id='mypage_top_infor'>
            <h2 className='hidden'>마이페이지</h2>
                <div className='mypage_box'>
                    <div className='my_info'>
                        <div className='grade_area'>
                            <span className='round-button m15'>{customerInfo?.grade}</span>
                        </div>
                        <p className='name'><strong>{customerInfo?.nickname}님</strong>반가워요!</p>
                        <div className='profile_set'>
                            <button type='button' className='btn_txt_edit' onClick={handleOpenProfileModal}><VscEdit />편집</button>
                        </div> 
                        <div className="next_rank">
                        <p>
                            {nextTier !== 'PLATINUM' 
                            ? `${nextTier}까지 남은 포인트: ${pointsToNextTier}P 입니다!` 
                            : "최고 등급입니다!"}
                        </p>
                        </div>                      
                    </div>

                    <div className="bx_grade merge2020">
                        <button className="btn_col5 ty5 rnd" onClick={handleToggleGogakboon}>
                            Membership Zone
                        </button>
                    </div>

                    <div className='btn_wrap'>
                        <p target="_blank" title="L.POINT 페이지 이동">
                            <span className='txt_img'>
                                <span style={{fontWeight:'bold'}} >S.POINT</span>
                            </span>
                            <em>{customerInfo?.points}P</em>
                        </p>
                    </div>
                </div>
            </div>
            <div id="mypage_top_menu">
                <ul className='tab_wrap_lnk ' >
                    <li className='menu-itemss' 
                        onMouseEnter={() => handleMenuHover('payment')} 
                        >
                        <h4>결제내역</h4>
                        {hoveredMenu === 'payment' && (
                            <ul className='submenus'>
                                <li onClick={handleShowShowmovie} className='abc'>예매내역</li>
                            </ul>
                        )}
                    </li>
                    <li className='menu-items'
                        onMouseEnter={() => handleMenuHover('movielog')}
                        onMouseLeave={handleMenuLeave}>
                        <h4>My 무비로그</h4>
                        {hoveredMenu === 'movielog' && (
                            <ul className='submenus'>
                                <li onClick={handleShowWishes}>찜하기</li>
                            </ul>
                        )}
                    </li>
                    <li className='menu-items'
                        onMouseEnter={() => handleMenuHover('info')}
                        onMouseLeave={handleMenuLeave}>
                        <h4>My 정보관리</h4>
                        {hoveredMenu === 'info' && (
                            <ul className='submenus'>
                                <li onClick={handleShowMyInfo}>회원 정보 관리</li>
                            </ul>
                        )}
                    </li>
                    <hr className="wrap_nav_underline"></hr>
                        
                          
                </ul>
            </div>  

            {/* 프로필 변경 모달 */}
            <ProfileModal isOpen={isProfileModalOpen} onClose={handleCloseProfileModal} userId={userId} />
            {showGogakboon && <Gogakboon />}
            {showShowmovie && <Showmovie onCancel={handleCancelShowmovie} userId={userId} />}
            
            {showWishes && <Wishes 
                userId={userId} 
                wishlistMovies={wishlistMovies} 
                updateWishlist={updateWishlist } 
                />}
            {showMyInfo && <MyInfo userId={userId}/>}
        </div>
    );
};

export default MyPage;