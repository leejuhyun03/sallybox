import React, { useState, useEffect, useRef } from 'react';
import '../../css/movie/moviedetail.css';
import axios from 'axios';
import { PiStarFill } from "react-icons/pi";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { IoClose } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const API_KEY = 'c1fe680d16ac165e297b9bf72e80e897';

const MovieDetail = ({ movie_id }) => {
    const [activeTab, setActiveTab] = useState('details');
    const [movieDetails, setMovieDetails] = useState({});
    const [credits, setCredits] = useState({});
    const [trailers, setTrailers] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [sortOrder, setSortOrder] = useState('true');
    const [images, setImages] = useState([]);
    const [selectedActor, setSelectedActor] = useState(null);
    const [selectedDirector, setSelectedDirector] = useState(null);
    const [isActorModalOpen, setIsActorModalOpen] = useState(false);
    const [isDirectorModalOpen, setIsDirectorModalOpen] = useState(false);
    const [comment, setComment] = useState('');
    const [visibleReviews, setVisibleReviews] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTrailer, setSelectedTrailer] = useState(null);
    const [rating, setRating] = useState(5);
    const [reviewContent, setReviewContent] = useState('');
    const [nickname, setNickname] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [showExistingReview, setShowExistingReview] = useState(true);
    const initialImageCount = 6;
    const [visibleImageCount, setVisibleImageCount] = useState(initialImageCount);
    const { userId, userNickName, isAuthenticated } = useUser();
    const isUserLoggedIn = !!userId;
    
    const navigate = useNavigate();
    const reviewInputRef = useRef(null);

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const movieRes = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=ko-KR`);
                const movieData = await movieRes.json();
                setMovieDetails(movieData);

                const creditsRes = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${API_KEY}&language=ko-KR`);
                const creditsData = await creditsRes.json();
                setCredits(creditsData);

                const trailersRes = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US`);
                const trailersData = await trailersRes.json();
                const teaser = trailersData.results.find(video => video.type === "Teaser");
                const trailer = trailersData.results.find(video => video.type === "Trailer");
                setTrailers([teaser, trailer].filter(Boolean));

                const imagesRes = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/images?api_key=${API_KEY}`);
                const imagesData = await imagesRes.json();
                setImages(imagesData.backdrops.slice(0, 10));
            } catch (error) {
                console.error("Error fetching movie data:", error);
            }
        };
        fetchMovieData();
    }, [movie_id]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                //전체 리뷰 목록 재요청
                const reviewsRes = await axios.get(`http://localhost:8085/sallybox/movies/${movie_id}/reviews`);
                setReviews(reviewsRes.data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };
        fetchReviews();
    }, [movie_id]);

    const sortedReviews = reviews.sort((a, b) => {
        if (sortOrder) {
            return new Date(b.createdAt) - new Date(a.createdAt);
        } else {
            return new Date(a.createdAt) - new Date(b.createdAt);
        }
    });

    const toggleSortOrder = () => setSortOrder(!sortOrder);

    const fetchActorDetails = async (actorId) => {
        try {
            const actorRes = await fetch(`https://api.themoviedb.org/3/person/${actorId}?api_key=${API_KEY}&language=ko-KR`);
            const actorData = await actorRes.json();
            const creditsRes = await fetch(`https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${API_KEY}&language=ko-KR`);
            const creditsData = await creditsRes.json();
            setSelectedActor({ ...actorData, movieCredits: creditsData.cast });
            setIsActorModalOpen(true);
        } catch (error) {
            console.error("배우 정보를 가져오는 중 오류 발생:", error);
        }
    };

    const fetchDirectorDetails = async (directorId) => {
        try {
            const directorRes = await fetch(`https://api.themoviedb.org/3/person/${directorId}?api_key=${API_KEY}&language=ko-KR`);
            const directorData = await directorRes.json();
            const creditsRes = await fetch(`https://api.themoviedb.org/3/person/${directorId}/movie_credits?api_key=${API_KEY}&language=ko-KR`);
            const creditsData = await creditsRes.json();
            setSelectedDirector({ ...directorData, movieCredits: creditsData.crew });
            setIsDirectorModalOpen(true);
        } catch (error) {
            console.error("감독 정보를 가져오는 중 오류 발생:", error);
        }
    };

    const closeActorModal = () => {
        setIsActorModalOpen(false);
        setSelectedActor(null);
    };

    const closeDirectorModal = () => {
        setIsDirectorModalOpen(false);
        setSelectedDirector(null);
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        const section = document.getElementById(tab);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
        setIsImageModalOpen(true);
    };

    const handlePrevImage = () => {
        setSelectedImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
    };

    const handleNextImage = () => {
        setSelectedImageIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
    };

    const handleTrailerClick = (trailerKey) => {
        setSelectedTrailer(trailerKey);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTrailer(null);
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).replace(/\s/g, '') +
        ' ' +
        date.toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
    };

    // const handleCommentChange = (e) => {
    //     const { value } = e.target;
    //     if (value.length <= 220) {
    //         setComment(value);
    //     }
    // };

    const handleRatingChange = (star) => setRating(star);

    //지영
    // 로그인 버튼 클릭 시 현재 movie_id를 전달하며 navigate
    const handleWriteReviewClick = () => {
        if (!isUserLoggedIn) {
            navigate('/sallybox/sign-in', { state: { from: `/sallybox/movies/${movie_id}` } });
        }
    };
    /* */
    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
             
            const payload = {
                movie_id: movie_id,
                reviewText: reviewContent,
                user_id: userId,
                rating: rating,
                nickname: userNickName,
            };
            // payload의 각 값을 출력
            
            console.log("movie_id:", payload.movie_id);
            console.log("reviewText:", payload.reviewText);
            console.log("user_id:", payload.user_id);
            console.log("rating:", payload.rating);
            console.log("nickname:", payload.nickname);
            

            // // 예약 기록 확인
            // const bookingCheckResponse = await axios.get(`http://localhost:8085/sallybox/movies/${movie_id}/reviews/checkBooking`, {
            //     params: {
            //         userId: userId,
            //         movieId: movie_id,
            //     }
            // });
        

            if (isEditing) {
                await axios.put(`http://localhost:8085/sallybox/movies/${movie_id}/reviews/${editingReviewId}`, {
                    movieId: movie_id,
                    reviewId: editingReviewId, // reviewId를 본문에 추가
                    reviewText: reviewContent,
                    userId: userId,
                    rating: rating,
                    nickname: userNickName,
                });
                //최신 목록 리스트
                const reviewsRes = await axios.get(`http://localhost:8085/sallybox/movies/${movie_id}/reviews`);
                setReviews(reviewsRes.data);
                //수정된 리뷰 위치로 스크롤
                setTimeout(() => {
                    const editedReviewElement = document.getElementById(`review-${editingReviewId}`);
                    if (editedReviewElement) {
                        editedReviewElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 100);
            } else {
                //console.log("payloadpayloadpayloadpayload:", payload.user_id);
                await axios.post(`http://localhost:8085/sallybox/movies/${movie_id}/reviews`, {movieId: movie_id,
                        reviewText: reviewContent,
                        userId: userId,
                        rating: rating,
                        nickname: userNickName, 
                    
                }); //입력
                const reviewsRes = await axios.get(`http://localhost:8085/sallybox/movies/${movie_id}/reviews`);
                setReviews(reviewsRes.data);
                console.log('입력!!!!!:'+payload);
            }
            setReviewContent('');
            setNickname('');
            setRating(5);
            setIsEditing(false);
            setEditingReviewId(null);
            setShowExistingReview(true);
        } catch (error) {
            console.error("Error submitting review:", error);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    
    
    const handleShowMoreReviews = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setVisibleReviews((prevVisibleReviews) => prevVisibleReviews + 10);
    };

    const handleEditReview = (review) => {
        if (review.userId === userId) {
            setReviewContent(review.reviewText);
            setRating(review.rating);
            setIsEditing(true);
            setEditingReviewId(review.reviewId);
            //console.log("Editing review ID:", review.reviewId); // 설정된 review ID를 콘솔에 출력
            setShowExistingReview(false);
            setTimeout(() => {
                reviewInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 0);
        } else {
            alert("본인의 리뷰만 수정할 수 있습니다.");
        }
    };
    const handleDeleteReview = async (reviewId) => {
        try {
            await axios.delete(`http://localhost:8085/sallybox/movies/${movie_id}/reviews/${reviewId}`, {
                params: { user_id: userId, },
            });
            setReviews((prevReviews) => prevReviews.filter((review) => review.reviewId !== reviewId));
        } catch (error) {
            console.error("리뷰 삭제 중 오류 발생:", error);
        }
    };
    //DELETE 요청은 본문에 데이터를 포함할 수 없기 때문에, params를 사용하여 쿼리 문자열로 데이터를 전달

    const handleLoadMoreImages = () => {
        setVisibleImageCount((prevCount) => prevCount + initialImageCount);
    };

    //console.log("리뷰리뷰리뷰 payload:",payload);

    return (
        <div>
            <div>
                <ul className='jytab_wrap jyouter jymoviedetailbar jynew22 jyactionmovingbar' style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                    <li>
                        <button
                            type='button'
                            className={`jytab_tit ${activeTab === 'details' ? 'active' : ''}`}
                            onClick={() => handleTabClick('details')}
                            style={{ width: '485px', backgroundColor: activeTab === 'details' ? '#333' : '#ddd', color: activeTab === 'details' ? '#fff' : '#000' }}
                        >
                            <span>상세정보</span>
                        </button>
                    </li>
                    <li>
                        <button
                            type='button'
                            className={`jytab_tit ${activeTab === 'reviews' ? 'active' : ''}`}
                            onClick={() => handleTabClick('reviews')}
                            style={{ width: '485px', backgroundColor: activeTab === 'reviews' ? '#333' : '#ddd', color: activeTab === 'reviews' ? '#fff' : '#000' }}
                        >
                            <span>관람평</span>
                        </button>
                    </li>
                </ul>
                <div className='jyslider' style={{ left: activeTab === 'details' ? '0%' : '490px' }} />

                <div id='jydetails'>
                    {activeTab === 'details' && (
                        <div className="jyinnerfull jygray">
                            <div className="jyinner980">
                                <div className="jymovi_tab_info1">
                                    <h5 className="jytit_info jytype1">영화정보</h5>
                                    <ul className="jydetail_info2">
                                        <li>
                                            <span style={{ marginRight: '10px' }}>장르</span>
                                            <span className="jyline_type">
                                                <a>{movieDetails.genres && movieDetails.genres.map(genre => genre.name).join(', ')}</a>
                                            </span>
                                        </li>
                                        <li>
                                            <span style={{ marginRight: '10px' }}>감독</span>
                                            <span className="jyline_type">
                                                {credits.crew && credits.crew
                                                    .filter(member => member.job === 'Director')
                                                    .map(director => (
                                                        <a href="#crew" key={director.id} onClick={() => fetchDirectorDetails(director.id)}>
                                                            {director.name}
                                                        </a>
                                                    ))}
                                            </span>
                                        </li>
                                        <li>
                                            <span style={{ marginRight: '10px' }}>출연</span>
                                            <span className="jyline_type">
                                                {credits.cast && credits.cast.length > 0 ? (
                                                    credits.cast.slice(0, 5).map((actor, index, arr) => (
                                                        <span key={actor.cast_id}>
                                                            <a href="#crew" onClick={() => fetchActorDetails(actor.id)}>
                                                                {actor.name}
                                                            </a>
                                                            {index < arr.length - 1 && ', '}
                                                        </span>
                                                    ))
                                                ) : (
                                                    '출연진 정보가 없습니다.'
                                                )}
                                            </span>
                                        </li>
                                    </ul>
                                </div>

                                <h5 className="jytit_info jytype1">트레일러</h5>
                                <div className="jytrailers">
                                    {trailers.length > 0 ? (
                                        trailers.map(trailer => (
                                            <div key={trailer.id} style={{ marginTop: '50px' }}>
                                                <img
                                                    src={`https://img.youtube.com/vi/${trailer.key}/0.jpg`}
                                                    alt={movieDetails.title}
                                                    className="jymovie-image"
                                                    style={{ width: '316px', height: '176px', cursor: 'pointer' }}
                                                    onClick={() => handleTrailerClick(trailer.key)}
                                                />
                                                <strong style={{ paddingTop: '50px', fontSize: '18px' }}>
                                                    {trailer.type === "Teaser" ? "티저 예고편" : "메인 예고편"}
                                                </strong>
                                            </div>
                                        ))
                                    ) : (
                                        <p>트레일러가 없습니다.</p>
                                    )}
                                </div>

                                {isModalOpen && <div className="jyoverlay" onClick={closeModal}></div>}
                                {isModalOpen && selectedTrailer && (
                                    <div id="jylayerMovieTrailer" className="jylayer_wrap jytrailer_modal active" style={{ width: '970px', height: '580px' }}>
                                        <div className="jylayer_contents">
                                            <button type="button" className="jybtn_close" onClick={closeModal}><IoClose size={30} /></button>
                                            <iframe
                                                width="100%"
                                                height="100%"
                                                src={`https://www.youtube.com/embed/${selectedTrailer}`}
                                                allowFullScreen
                                                title="트레일러 재생"
                                            ></iframe>
                                        </div>
                                    </div>
                                )}

                                <div className="jymovi_tab_info3">
                                    <h5 className="jytit_info jytype1" style={{ marginTop: '50px' }}>스틸컷</h5>
                                    <div className='jyslide_wrap jyslide_movie_detail_images' style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                                        gap: '10px',
                                        padding: '0',
                                        margin: '0',
                                    }}>
                                        {images && images.length > 0 ? (
                                            images.slice(0, visibleImageCount).map((image, index) => (
                                                <div className='jyimage-item' key={image.file_path}>
                                                    <img
                                                        src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                                                        alt="스틸컷"
                                                        className="jymovie-image"
                                                        style={{ width: '100%', height: 'auto', cursor: 'pointer' }}
                                                        onClick={() => handleImageClick(index)}
                                                    />
                                                </div>
                                            ))
                                        ) : (
                                            <p>스틸컷이 없습니다.</p>
                                        )}
                                    </div>
                                    {visibleImageCount < images.length && (
                                        <button
                                            onClick={handleLoadMoreImages}
                                            className="jyshow-more-button2"
                                        >
                                            더보기
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {activeTab === 'reviews' && (
                    <div>
                        <div style={{display:'flex', justifyContent:'center',alignContent:'center', background:'#f8f8f8'}}>
                        {!isUserLoggedIn && (
                            <button
                                onClick={handleWriteReviewClick}
                                className='jy-writeReviewButtonStyle'
                            >
                                <p>관람평 작성하기</p>
                            </button>
                        )}

                        {isUserLoggedIn && (
                            <form onSubmit={handleReviewSubmit} className="jyreview-form">
                                <div className="jyreviews-container">
                                    <div className="jyrating-container">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <label key={star} style={{ cursor: 'pointer' }}>
                                                <input
                                                    type="radio"
                                                    name="rating"
                                                    value={star}
                                                    onChange={() => handleRatingChange(star)}
                                                    style={{ display: 'none' }}
                                                />
                                                <PiStarFill
                                                    size={50}
                                                    color={star <= rating ? '#FFD700' : '#E0E0E0'}
                                                />
                                            </label>
                                        ))}
                                    </div>
                                    <div className="jyreview_write_row">
                                        <div className="jyreview_write_box" style={{ width: '827px', height: '130px' }}>
                                            <textarea
                                                ref={reviewInputRef}
                                                id="jyreviewContent"
                                                value={reviewContent}
                                                onChange={(e) => {
                                                    if (e.target.value.length <= 220) {
                                                        setReviewContent(e.target.value);
                                                    }
                                                }}
                                                style={{ width: '100%', height: '150px', padding: '10px', boxSizing: 'border-box', marginTop: '-10px', fontSize: '17px' }}
                                                placeholder="평점 및 영화 관람평을 작성해 주세요. (최소 10글자 이상)"
                                                required
                                                title="관람평 작성"
                                            />
                                            <span className="jybyte_info">
                                                <strong className="jybyte">{reviewContent.length}</strong> / <em>220</em>
                                            </span>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting || reviewContent.length < 10}
                                            className={`jysubmit-button ${reviewContent.length < 10 ? 'jydisabled-button' : 'jyenabled-button'}`}
                                        >
                                            {isSubmitting ? '제출 중...' : isEditing ? '수정 완료' : '관람평 작성'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}
                        </div>
                        {/* 리스트 보여주는 곳 */}
                        <div className="jyreview-list">
                                {sortedReviews.length === 0 ? (
                                    <p style={{ fontSize: '14pt', 
                                        color: 'gray', 
                                        backgroundColor: '#f8f8f8', 
                                        padding: '34px', 
                                        margin: '0', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        paddingLeft: '400px',
                                        paddingBottom:'30px'  }}>작성된 리뷰가 없습니다</p>
                                ) : (
                                    sortedReviews.slice(0, visibleReviews).map((review) => (
                                            <div
                                            key={review.reviewId}
                                            id={`review-${review.reviewId}`}
                                            className={`jyreview-item ${isEditing && editingReviewId === review.reviewId ? 'hidden' : ''}`}
                                            >
                                            <p style={{ fontSize: '13pt', fontWeight: 'bold' }}>{review.nickname}</p>
                                            <p style={{ fontSize: '13pt', margin: '-8px 0' }}>{formatDate(review.createdAt)}</p>
                                            <p style={{ fontSize: '13pt' }}>{review.reviewText}</p>

                                            {String(review.userId) === String(userId) && (
                                                <>
                                                    <button onClick={() => handleEditReview(review)}>수정</button>
                                                    <button onClick={() => handleDeleteReview(review.reviewId)}>삭제</button>
                                                </>
                                            )}
                                        </div>
                                    ))
                                )}
                            {visibleReviews < sortedReviews.length && (
                                <button onClick={handleShowMoreReviews} className="jyshow-more-button">
                                    더보기
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {isActorModalOpen && <div className="jyoverlay" onClick={closeModal}></div>}
                {isActorModalOpen && selectedActor && (
                    <div id="jycrewDetailModal" className="jylayer_wrap jycrew_modal">
                        <div className="jylayer_header_crew">
                            <button type="button" className="jybtn_close jybtnCloseLayer" onClick={closeActorModal}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '5px'
                                }}><IoClose size={30} /></button>
                        </div>
                        <div className="jylayer_contents_crew">
                            {selectedActor && (
                                <>
                                    <img
                                        src={selectedActor.profile_path
                                            ? `https://image.tmdb.org/t/p/w200${selectedActor.profile_path}`
                                            : process.env.PUBLIC_URL + '/image/person.jpg'
                                        }
                                        alt={`${selectedActor.name} 프로필 사진`}
                                        className="jyprofile_image"
                                    />
                                    <h3>{selectedActor.name}</h3>
                                    <p style={{ fontSize: '17px' }}>{selectedActor.birthday}</p>
                                    <p style={{ fontSize: '11px' }}>{selectedActor.place_of_birth}</p>
                                    <p className="jyfilmography-title">필모그래피</p>
                                    <div className="jyfilmography-grid">
                                        {selectedActor.movieCredits && selectedActor.movieCredits.length > 0 ? (
                                            [...new Map(selectedActor.movieCredits
                                                .filter(credit => credit.poster_path && credit.title)
                                                .map(credit => [credit.id, credit])
                                            ).values()]
                                                .map(credit => (
                                                    <div key={credit.id} className="jyfilmography-item">
                                                        <img
                                                            src={`https://image.tmdb.org/t/p/w200${credit.poster_path}`}
                                                            alt={credit.title}
                                                        />
                                                        <p>{credit.title}</p>
                                                    </div>
                                                ))
                                        ) : (
                                            <p>출연작 정보가 없습니다.</p>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {isDirectorModalOpen && <div className="jyoverlay" onClick={closeModal}></div>}
                {isDirectorModalOpen && selectedDirector && (
                    <div id="jycrewDetailModal" className="jylayer_wrap jycrew_modal">
                        <div className="jylayer_header_crew">
                            <button type="button" className="jybtn_close jybtnCloseLayer" onClick={closeDirectorModal}><IoClose size={30} /></button>
                        </div>
                        <div className="jylayer_contents_crew">
                            {selectedDirector && (
                                <>
                                    <img
                                        src={selectedDirector.profile_path
                                            ? `https://image.tmdb.org/t/p/w200${selectedDirector.profile_path}`
                                            : process.env.PUBLIC_URL + '/image/person.jpg'
                                        }
                                        alt={`${selectedDirector.name} 프로필 사진`}
                                        className="jyprofile_image"
                                    />
                                    <h3>{selectedDirector.name}</h3>
                                    <p>{selectedDirector.birthday}</p>
                                    <p>{selectedDirector.place_of_birth}</p>
                                    <p className="jyfilmography-title">필모그래피</p>
                                    <div className="jyfilmography-grid">
                                        {selectedDirector.movieCredits && selectedDirector.movieCredits.length > 0 ? (
                                            [...new Map(selectedDirector.movieCredits
                                                .filter(credit => credit.poster_path && credit.title)
                                                .map(credit => [credit.id, credit])
                                            ).values()]
                                                .map(credit => (
                                                    <div key={credit.id} className="jyfilmography-item">
                                                        <img
                                                            src={`https://image.tmdb.org/t/p/w200${credit.poster_path}`}
                                                            alt={credit.title}
                                                            style={{ width: '100px', height: '150px', marginBottom: '10px' }}
                                                        />
                                                        <p>{credit.title}</p>
                                                    </div>
                                                ))
                                        ) : (
                                            <p>작품 정보가 없습니다.</p>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {isImageModalOpen && <div className="jyoverlay" onClick={closeModal}></div>}
                {isImageModalOpen && (
                    <div id="jyimageModal" className="jylayer_wrap2 jyimage_modal active">
                        <div className="jylayer_contents" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <button type="button" className="jybtn_close" onClick={() => setIsImageModalOpen(false)} style={{
                                position: 'absolute',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                color: 'white',
                            }}>
                                <IoClose size={45} />
                            </button>
                            <button type="button" className="jybtn_prev" onClick={handlePrevImage} style={{ marginRight: '50px', backgroundColor: 'rgba(0, 0, 0, 0)', border: 'none', outline: 'none', color: 'white' }}>
                                <SlArrowLeft size={40} />
                            </button>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${images[selectedImageIndex].file_path}`}
                                alt="스틸컷"
                                className="jymodal-image"
                                style={{ width: '100%', height: 'auto' }}
                            />
                            <button type="button" className="jybtn_next" onClick={handleNextImage} style={{ marginLeft: '50px', backgroundColor: 'rgba(0, 0, 0, 0)', border: 'none', outline: 'none', color: 'white' }}>
                                <SlArrowRight size={40} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieDetail;
