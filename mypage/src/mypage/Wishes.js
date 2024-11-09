import React, {  useState } from 'react';
import './wishes.css'


import {
    FcLikePlaceholder,
    FcLike
}from 'react-icons/fc'
import axios from 'axios';


const Wishes = ({wishlistMovies,userId,updateWishlist}) => {

    const [likedMovies, setLikedMovies] = useState({});

    const handleLike = async (movieId) => {
        const isConfirmed = window.confirm("이 영화를 보고싶은 영화 목록에서 삭제하시겠습니까?");
        if (isConfirmed) {
            try {
                await axios.delete(`/sallybox/mypage/${userId}/${movieId}`);
                // 삭제 성공 후 위시리스트 다시 불러오기
                updateWishlist();
                alert("영화가 위시리스트에서 삭제되었습니다.");
            } catch (error) {
                console.error('위시리스트에서 영화 삭제 실패:', error);
                alert("삭제 중 오류가 발생했습니다. 다시 시도해주세요.");
            }
        }
    };

    const getAgeRatingImg = (age_rating) => {
        switch(age_rating){
            case '12세 관람가' : return 12;
            case '15세 관람가' : return 15;
            case '19세 관람가' : return 19 ;
            default : return 'all';
        }
    };


    return (
        <>
            <div >
                <div className='mypage_wrap'>
                    <div className='title_sub_area'>
                        <div className='left_area'>
                            <h1 className="title">내가 보고 싶은 영화</h1>
                            <span className="sub"><em>{wishlistMovies.length}</em> 편</span>
                        </div>
                    </div>
                    <ul className='my_movie_list'>
                    {wishlistMovies.map((movie) => (
                            <li key={movie.movie_id} style={{display: 'block'}}>
                                <div className='poster' style={{cursor: 'pointer'}}>
                                    <a href="#none">
                                        <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} style={{ width: '100%', height: 'auto' }} />
                                    </a>
                                </div>
                                <strong className='tit' style={{cursor: 'pointer'}}>
                                    <span className={`ic_grade gr_${getAgeRatingImg(movie.certification)}`}></span>
                                    &nbsp;
                                    {movie.title}
                                </strong>
                                <div className='detail_info ty1'>
                                    <i onClick={() => handleLike(movie.movie_id)}>
                                        {likedMovies[movie.movie_id] 
                                            ? <FcLikePlaceholder style={{ width: '20px', height: '20px' }}/>
                                            : <FcLike style={{ width: '20px', height: '20px' }}/> }
                                    </i>
                                </div>
                                <dl className="review_box" style={{cursor: 'pointer'}}>
                                    <dt>Overview</dt>
                                    <dd>{movie.overview}</dd>
                                </dl>
                                <div className='btn_box'>
                                    <a href="#none" className="btn_col3 ty2 rnd">
                                        <span className="txt_ic_booking">예매하기</span>
                                    </a>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Wishes;