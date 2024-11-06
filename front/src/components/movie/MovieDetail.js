import React, { useState, useEffect } from 'react';
import '../../css/movie/moviedetail.css'; // CSS 파일 import
import axios from 'axios';
import { PiStarFill } from "react-icons/pi";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa"; // 다음/이전 버튼 아이콘
import { IoClose } from "react-icons/io5"; // 닫기 버튼 아이콘

const API_KEY = 'c1fe680d16ac165e297b9bf72e80e897';

const MovieDetail = ({ movie_id }) => {
    const [activeTab, setActiveTab] = useState('details'); // 활성화된 탭 상태
    const [movieDetails, setMovieDetails] = useState({});
    const [credits, setCredits] = useState({});
    const [trailers, setTrailers] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [sortOrder, setSortOrder] = useState('최신순'); // 정렬 기준 상태 추가-관람평
    const [images, setImages] = useState([]);
    const [selectedActor, setSelectedActor] = useState(null);
    const [selectedDirector, setSelectedDirector] = useState(null);
    const [isActorModalOpen, setIsActorModalOpen] = useState(false);
    const [isDirectorModalOpen, setIsDirectorModalOpen] = useState(false);
    const [comment, setComment] = useState(''); // comment 상태와 setComment 함수 선언

    // 모달
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 (true일 때 모달이 열림)
    const [selectedTrailer, setSelectedTrailer] = useState(null); // 선택된 트레일러 키를 저장할 상태
    const [rating, setRating] = useState(5);  // 초기 별점은 0으로 설정
    const [reviewContent, setReviewContent] = useState(''); // 리뷰 내용 상태 관리
    const [nickname, setNickname] = useState(''); // 임시로 닉네임 설정
    const [isSubmitting, setIsSubmitting] = useState(false); // 리뷰 제출 중인지 상태
    const [isEditing, setIsEditing] = useState(false); // 수정 모드인지 여부
    const [editingReviewId, setEditingReviewId] = useState(null); // 수정 중인 리뷰 ID
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    
    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                // 영화 상세 정보 가져오기
                const movieRes = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=ko-KR`);
                const movieData = await movieRes.json();
                setMovieDetails(movieData);

                // 출연진 정보 가져오기
                const creditsRes = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${API_KEY}&language=ko-KR`);
                const creditsData = await creditsRes.json();
                setCredits(creditsData);

                // 트레일러 정보 가져오기
                const trailersRes = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${API_KEY}&language=ko-KR`);
                const trailersData = await trailersRes.json();
                setTrailers(trailersData.results.slice(0, 2)); // 3개만 저장

                // 스틸컷 정보 가져오기
                const imagesRes = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/images?api_key=${API_KEY}`);
                const imagesData = await imagesRes.json();
                setImages(imagesData.backdrops.slice(0, 10)); // 10개만 저장
            } catch (error) {
                console.error("Error fetching movie data:", error);
            }
        };

        fetchMovieData();

    }, [movie_id]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const reviewsRes = await axios.get(`http://localhost:8085/sallybox/movies/${movie_id}/reviews`);
                setReviews(reviewsRes.data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };
        fetchReviews();
    }, [movie_id]);

    const sortedReviews = reviews.sort((a, b) => {
        if (sortOrder === '최신순') {
            return new Date(b.createdAt) - new Date(a.createdAt); // 최신순
        } else {
            return new Date(a.createdAt) - new Date(b.createdAt); // 오래된순
        }
    });

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
            day: '2-digit' 
        }).replace(/\s/g, '') + 
        ' ' + 
        date.toLocaleTimeString('ko-KR', { 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: false 
        });
    };

    const handleCommentChange = (e) => {
        const { value } = e.target;
        if (value.length <= 220) {
            setComment(value);
        }
    };

    const handleRatingChange = (star) => {
        setRating(star);
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (isEditing) {
                const response = await axios.put(`http://localhost:8085/sallybox/movies/${movie_id}/reviews/${editingReviewId}`, {
                    reviewText: reviewContent,
                    user_id: 1,
                    rating: rating,
                    nickname: nickname,
                });

                const reviewsRes = await axios.get(`http://localhost:8085/sallybox/movies/${movie_id}/reviews`);
                setReviews(reviewsRes.data);
            } else {
                const response = await axios.post(`http://localhost:8085/sallybox/movies/${movie_id}/reviews`, {
                    movie_id: movie_id,
                    reviewText: reviewContent,
                    user_id: 1,
                    rating: rating,
                    nickname: nickname,
                });

                setReviews((prevReviews) => [...prevReviews, response.data]);
            }

            const reviewsRes = await axios.get(`http://localhost:8085/sallybox/movies/${movie_id}/reviews`);
            setReviews(reviewsRes.data);

            setReviewContent('');
            setNickname('');
            setRating(5);
            setIsEditing(false);
            setEditingReviewId(null);

        } catch (error) {
            console.error("Error submitting review:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLike = async (reviewId) => {
        try {
            const response = await axios.post(`http://localhost:8085/sallybox/movies/reviews/${reviewId}/like`, {
                user_id: 1
            });

            setReviews((prevReviews) =>
                prevReviews.map((review) =>
                    review.reviewId === reviewId
                        ? { ...review, liked: review.liked + 1 }
                        : review
                )
            );
        } catch (error) {
            console.error("Error liking the review:", error);
        }
    };

    const handleEditReview = (review) => {
        setReviewContent(review.reviewText);
        setRating(review.rating);
        setIsEditing(true);
        setEditingReviewId(review.reviewId);
    };

    const handleDeleteReview = async (reviewId) => {
        try {
            await axios.delete(`http://localhost:8085/sallybox/movies/${movie_id}/reviews/${reviewId}`, {
                params: { user_id: 1 }
            });

            setReviews((prevReviews) => prevReviews.filter((review) => review.reviewId !== reviewId));

            console.log('리뷰가 성공적으로 삭제되었습니다.');
        } catch (error) {
            console.error('리뷰 삭제 중 오류 발생:', error);
        }
    };

    return (
        <div>
            <div>
                <ul className='jytab_wrap jyouter jymoviedetailbar jynew22 jyactionmovingbar' style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                    <li>
                        <button type='button' className={`jytab_tit ${activeTab === 'details' ? 'active' : ''}`} onClick={() => handleTabClick('details')} style={{ width: '485px' }}>
                            <span>상세정보</span>
                        </button>
                    </li>
                    <li>
                        <button type='button' className={`jytab_tit ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => handleTabClick('reviews')} style={{ width: '485px' }}>
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
                                                    alt={trailer.name}
                                                    className="jymovie-image"
                                                    style={{ width: '316px', height: '176px', cursor: 'pointer' }}
                                                    onClick={() => handleTrailerClick(trailer.key)}
                                                />
                                                <strong style={{ paddingTop: '50px' }}>{trailer.name}</strong>
                                            </div>
                                        ))
                                    ) : (
                                        <p>트레일러가 없습니다.</p>
                                    )}
                                </div>

                                {isModalOpen && selectedTrailer && (
                                    <div id="jylayerMovieTrailer" className="jylayer_wrap jytrailer_modal active">
                                        <div className="jylayer_header">
                                            <button type="button" className="jybtn_close" onClick={closeModal}>팝업 닫기</button>
                                        </div>
                                        <div className="jylayer_contents">
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
                                    <h5 className="jytit_info jytype1">스틸컷</h5>
                                    <div className='jyslide_wrap jyslide_movie_detail_images' style={{ display: 'flex', flexWrap: 'wrap' }}>
                                        {images && images.length > 0 ? (
                                            images.map((image, index) => (
                                                <div className='jyimage-item' key={image.file_path}>
                                                    <img
                                                        src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                                                        alt="스틸컷"
                                                        className="jymovie-image"
                                                        style={{ width: '200px', height: 'auto', margin: '10px', cursor: 'pointer' }}
                                                        onClick={() => handleImageClick(index)}
                                                    />
                                                </div>
                                            ))
                                        ) : (
                                            <p>스틸컷이 없습니다.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {activeTab === 'reviews' && (
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
                                <div className="jyreview_write_box" style={{width:'130px', height:'130px'}}>
                                    <textarea
                                        id="jyreviewContent"
                                        value={reviewContent}
                                        onChange={(e) => {
                                            if (e.target.value.length <= 220) {
                                                setReviewContent(e.target.value);
                                            }
                                        }}
                                        style={{ width: '100%', height: '150px', padding: '10px', boxSizing: 'border-box' , marginTop:'-10px'}}
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
                                    {isSubmitting
                                        ? '제출 중...'
                                        : isEditing
                                            ? '수정 완료'
                                            : '관람평 작성'}
                                </button>
                            </div>

                            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                                <option value="최신순">최신순</option>
                                <option value="오래된순">오래된순</option>
                            </select>

                            <div className="jyreview-list">
                                {sortedReviews.length > 0 ? (
                                    sortedReviews.map((review) => (
                                        <div key={review.reviewId} className="jyreview-item">
                                            {isEditing && editingReviewId === review.reviewId ? (
                                                <>
                                                </>
                                            ) : (
                                                <>
                                                    <h5>{review.nickname}</h5>
                                                    <p>{review.reviewText}</p>
                                                    <p>{formatDate(review.createdAt)}</p>
                                                    <button onClick={() => handleEditReview(review)}>수정</button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteReview(review.reviewId)}
                                                    >
                                                        삭제
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <p>작성된 리뷰가 없습니다.</p>
                                )}
                            </div>

                            <div className="jylist_bdr_box">
                                <h3 className="jytitle jytxt_caution2">유의사항</h3>
                                <ul className="jylist_txt">
                                    <li>관람평 작성에 대한 L.POINT는 익일 적립되며, 관람 후 초기 1회에 대해서만 적립됩니다.</li>
                                    <li>수정/삭제 후 재등록 시에는 포인트 적립이 되지 않습니다.</li>
                                    <li>관람평은 관람 내역당 1회만 작성 가능하며, 상영종료된 영화의 관람평은 작성 불가합니다.</li>
                                    <li>작성하신 관람평은 마이페이지 &gt; MY무비로그 &gt; 내가 본 영화에서 확인하실 수 있습니다.</li>
                                    <li>관람 평점은 롯데시네마에서 실제 관람한 회원의 평점 입니다.</li>
                                </ul>
                            </div>
                        </div>
                    </form>
                )}

                {isActorModalOpen && selectedActor && (
                    <div id="jycrewDetailModal" className="jylayer_wrap jycrew_modal">
                        <div className="jylayer_header_crew">
                            <button type="button" className="jybtn_close jybtnCloseLayer" onClick={closeActorModal}>팝업 닫기</button>
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
                                    <p style={{ fontSize: '21px' }}>{selectedActor.birthday}</p>
                                    <p>{selectedActor.place_of_birth}</p>
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

                {isDirectorModalOpen && selectedDirector && (
                    <div id="jycrewDetailModal" className="jylayer_wrap jycrew_modal">
                        <div className="jylayer_header_crew">
                            <button type="button" className="jybtn_close jybtnCloseLayer" onClick={closeDirectorModal}>팝업 닫기</button>
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

                {isImageModalOpen && (
                    <div id="jyimageModal" className="jylayer_wrap jyimage_modal active">
                        <div className="jylayer_header">
                            <button type="button" className="jybtn_close" onClick={() => setIsImageModalOpen(false)}>
                                <IoClose size={30} />
                            </button>
                        </div>
                        <div className="jylayer_contents" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <button type="button" className="jybtn_prev" onClick={handlePrevImage} style={{ marginLeft: '20px', background: 'white', border: 'none', outline: 'none' }}>
                                <FaCaretLeft size={40} />
                            </button>

                            <img
                                src={`https://image.tmdb.org/t/p/w500${images[selectedImageIndex].file_path}`}
                                alt="스틸컷"
                                className="jymodal-image"
                                style={{ width: '70%', height: 'auto' }}
                            />

                            <button type="button" className="jybtn_next" onClick={handleNextImage} style={{ marginLeft: '20px', background: 'white', border: 'none', outline: 'none' }}>
                                <FaCaretRight size={40} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieDetail;
