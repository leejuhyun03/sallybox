import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoClose } from "react-icons/io5"; // 닫기 버튼 아이콘
import axios from 'axios';
import '../../css/movie/moviepage.css';
import { TbClockHour9 } from "react-icons/tb";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { IoIosPlay } from "react-icons/io";
import MovieDetail from './MovieDetail';
import { useUser } from '../../context/UserContext';

const MoviePage = () => {
    const { movie_id } = useParams();
    const [movieDetails, setMovieDetails] = useState({});
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTrailer, setSelectedTrailer] = useState(null);
    const [loading, setLoading] = useState(true); // 영화 세부 정보 로딩 상태
    const [loadingWishlist, setLoadingWishlist] = useState(false); // 위시리스트 로딩 상태
    const [error, setError] = useState(null);
    const [isMovieNowPlaying, setIsMovieNowPlaying] = useState(false); // 영화 상영 여부 상태 추가

    const { userId } = useUser();

    const navigate = useNavigate(); // useNavigate를 컴포넌트 최상단에 정의 --jwt
  
    useEffect(() => {
      const fetchMovieDetails = async () => {
          try {
              const response = await axios.get(`http://localhost:8085/sallybox/movies/${movie_id}`);
              console.log(response.data);
              if (response.data) {
                  setMovieDetails(response.data);
                  setLoading(false); // 영화 정보 로딩 완료
              }

               const existsResponse = await axios.get(`http://localhost:8085/sallybox/nowmovies/exists/${movie_id}`);
               setIsMovieNowPlaying(existsResponse.data); // 상영 여부 상태 설정

              const statusResponse = await axios.get(`http://localhost:8085/sallybox/movies/${movie_id}/wishlist/status`, {
                  params: {
                      user_id: userId,
                      movie_id: movie_id
                  }
              });
              setIsLiked(statusResponse.data.isLiked);
          } catch (error) {
              console.error("Error loading movie data:", error);
              setError("영화 정보를 불러오는데 실패했습니다. 다시 시도해 주세요.");
              setLoading(false);
          }
      };

      fetchMovieDetails();
    }, [movie_id]);

    const handleLikeClick = async () => {
        if (loadingWishlist) return;
        setLoadingWishlist(true);
        
        try {
            const response = await axios.post(`http://localhost:8085/sallybox/movies/${movie_id}/wishlist/toggle`, null, {
                params: {user_id: userId}
            });

            const newIsLiked = response.data.isLiked;
            setIsLiked(newIsLiked);
            setLikeCount(newIsLiked ? likeCount + 1 : likeCount - 1);
            setError(null);
        } catch (error) {
            console.error("Error updating wishlist:", error);
            setError("위시리스트를 업데이트하는데 실패했습니다. 다시 시도해 주세요.");
        } finally {
            setLoadingWishlist(false);
        }
    };

    //예매 페이지로 영화 정보 보내는 함수
    const handleBookingClick = () => {
        const today = new Date();
        const date = today.toLocaleDateString();
        const time = today.toLocaleTimeString();
    
        const movieData = {
            movieId: movieDetails.movieId,
            title: movieDetails.title,
            posterPath: movieDetails.posterPath,
            runtime: movieDetails.runtime,
            certification: movieDetails.certification,
            date: date,
            time: time
        };
    
        console.log("영화 세부 정보:", movieDetails);
        console.log("전송할 영화 정보:", movieData);
    
        axios.post(`http://localhost:8085/sallybox/reserv/ticketing`, movieData)
            .then(response => {
                console.log("예매 정보가 성공적으로 전달되었습니다.");
                console.log("응답 데이터:", response.data);
                navigate(`/sallybox/reserv/ticketing`, { state: response.data });
            })
            .catch(error => {
                console.error("예매 정보를 전달하는 중 에러 발생:", error);
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleTrailerClick = () => {
        setSelectedTrailer(movieDetails.videos);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTrailer(null);
    };

    const getCertificationClass = (certification) => {
        switch(certification) {
            case "12세 관람가":
                return "jycert-12";
            case "15세 관람가":
                return "jycert-15";
            case "전체 관람가":
                return "jycert-all";
            case "19세 관람가":
                return "jycert-19";
            default:
                return "";
        }
    };

    return (
      <div id="jycontents_new23">
        <div id="jycontent" className="jycontents_movie_detail">
          <h2 className="jyhidden">영화</h2>
          <h2 className="jyhidden">영화 상세정보</h2>
          <div className="jydetail_top_wrap jynew22">
            <div className="jyposter_info">
            <img 
              src={movieDetails.posterPath ? `https://image.tmdb.org/t/p/original${movieDetails.posterPath}` : '/image/image_comming.jpg'} 
              alt={movieDetails.title || '영화 포스터'} 
            />
              <div className="jybox__tag">
                <ul className="jywrap__tag">
                  {movieDetails.genres && movieDetails.genres.split(',').map((genre, index) => (
                    <li key={index}>{genre}</li>
                  ))}
                </ul>
              </div>
            </div>
  
            <div className="jytit_info">
              <strong>{movieDetails.title}</strong>
            </div>
  
            <ul className="jymov_info1">
              <li><span>{movieDetails.releaseDate || 'N/A'}</span> 개봉</li>
              <li><span><TbClockHour9 /> {movieDetails.runtime || 'N/A'}분</span></li>
              <li>
                <span className={getCertificationClass(movieDetails.certification)}>
                  {movieDetails.certification || 'N/A'}
                </span>
              </li>
              <li><span>{(movieDetails.popularity ? movieDetails.popularity.toFixed(1) : 'N/A')}</span> 만명</li>
            </ul>
  
            <ul className="jymov_info2" style={{marginBottom:'40px'}}>
              {movieDetails.videos && (
                <li>
                  <button type="button" className="jybtn_trailer" onClick={handleTrailerClick}>
                    <IoIosPlay style={{ fontSize: '20px' }} />예고편 재생
                  </button>
                </li>
              )}
              <li>
                <button 
                      type="button" 
                      className="jybtn_icon_wish" 
                      onClick={handleLikeClick}
                      disabled={loadingWishlist}
                      style={{height:'40px'}}
                >
                        {isLiked ? <FaHeart style={{ color: 'red' }} /> : <CiHeart />}
                    </button>
                </li>
            </ul>
  
            {isModalOpen && <div className="jyoverlay" onClick={closeModal}></div>}
            {isModalOpen && selectedTrailer && (
              <div id="jylayerMovieTrailer" className="jylayer_wrap active">
                  <div className="jylayer_header">
                    <button type="button" className="jybtn_close" onClick={closeModal}>
                      <IoClose  size={30}/>
                    </button>
                  </div>
                  <div className="jylayer_contents">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${selectedTrailer}`}
                      allowFullScreen
                      title={movieDetails.title}
                    ></iframe>
                  </div>
              </div>
            )}
  
            <div className="jytxtarea_box" style={{marginBottom:'45px'}}>
              <div className="jytxtarea">
                <span>{movieDetails.overview}</span>
              </div>
            </div>
  
            {/* 상영 여부에 따라 버튼을 조건부로 렌더링 */}
            <a
              className="jybtn_col1 jyty7 jyrnd jymovreservation" 
              onClick={isMovieNowPlaying ? handleBookingClick : null}
            >
              <button
                className="jybutton"
                style={{
                  backgroundColor: isMovieNowPlaying ? '' : '#adadad', //상영 종료 시 회색 배경
                  color: isMovieNowPlaying ? '' : '#ffffff', //상영 종료 시 흰색 텍스트
                  cursor: isMovieNowPlaying ? 'pointer' : 'default', //상영 종료 시 클릭 비활성화
                }}
              >
                {isMovieNowPlaying ? '예매하기' : '상영종료'} {/* 버튼 텍스트 변경 */}
              </button>

            </a>
          </div>
          <MovieDetail movie_id={movie_id} />
        </div>
      </div>
    );
};

export default MoviePage;
