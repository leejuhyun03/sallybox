import React, { useEffect, useState } from 'react';
import './style.css'
import { VscEdit } from "react-icons/vsc";
import Wishes from './Wishes';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const fetchWishlistMovies = async (userId) => {
    try {
      const response = await axios.get(`/sallybox/mypage/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching wishlist movies:', error);
      throw error;
    }
  };


const MyPage = () => {

    const{user_id} = useParams();
    const [wishlistMovies, setWishlistMovies] = useState([]);

    useEffect(() => {
        const loadWishlistMovies = async () => {
          try {
            const movies = await fetchWishlistMovies(user_id);
            setWishlistMovies(movies);
          } catch (error) {
            console.error('Failed to load wishlist movies:', error);
          }
        };
    
        loadWishlistMovies();
      }, [user_id]);

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
                        <p className='name'><strong>윤선호님</strong>반가워요!</p>
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
                            <li onClick={() => setShowWishes(true) }>예매내역</li>         
                        </ul>
                    </li>
                    <li className='menu-item' >
                        <h4> My 무비로그</h4>
                        <ul className='submenu'>
                            <li onClick={() => setShowWishes(true)}>예매내역</li>      
                        </ul>
                    </li>
                    <li className='menu-item' >
                        <h4>My 정보관리</h4>
                        <ul className='submenu'>
                            <li>회원 정보 관리</li>         
                        </ul>
                    </li>
                    <hr className="wrap_nav_underline">
                        
                    </hr>

                    <ul>
                        {wishlistMovies.map((movie) => (
                            <li key={movie.id}>
                            <h3>{movie.title}</h3>
                            <p>Age Rating: {movie.certification}</p>
                            {/* 추가적인 영화 정보 표시 */}
                            </li>
                        ))}
                    </ul>
                </ul>
            </div>  
            {showWishes && <Wishes />}
        </div>
    );
};

export default MyPage;