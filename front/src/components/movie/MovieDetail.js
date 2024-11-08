import React, { useState, useEffect, useRef } from 'react';
import '../../css/movie/moviedetail.css'; // CSS 파일 import
import axios from 'axios';
import { PiStarFill } from "react-icons/pi";
import { SlArrowLeft, SlArrowRight  } from "react-icons/sl"; // 다음/이전 버튼 아이콘
import { IoClose } from "react-icons/io5"; // 닫기 버튼 아이콘
import { useSearchParams } from 'react-router-dom';
import { BiSort } from "react-icons/bi";
import { useNavigate } from 'react-router-dom'; // navigate 추가
const API_KEY = 'c1fe680d16ac165e297b9bf72e80e897';

const MovieDetail = ({ movie_id }) => {
    const [activeTab, setActiveTab] = useState('details'); // 활성화된 탭 상태
    const [movieDetails, setMovieDetails] = useState({});
    const [credits, setCredits] = useState({});
    const [trailers, setTrailers] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [sortOrder, setSortOrder] = useState('true'); // 정렬 기준 상태 추가-관람평
    const [images, setImages] = useState([]);
    const [selectedActor, setSelectedActor] = useState(null);
    const [selectedDirector, setSelectedDirector] = useState(null);
    const [isActorModalOpen, setIsActorModalOpen] = useState(false);
    const [isDirectorModalOpen, setIsDirectorModalOpen] = useState(false);
    const [comment, setComment] = useState(''); // comment 상태와 setComment 함수 선언
    const [visibleReviews, setVisibleReviews] = useState(10); // 초기에 10개만 표시

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
    const [showExistingReview, setShowExistingReview] = useState(true);

    // 한 번에 보여줄 이미지 개수를 정의합니다. (수정!!!)
    const initialImageCount = 6;
    const [visibleImageCount, setVisibleImageCount] = useState(initialImageCount); // 수정!!!

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
                const trailersRes = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US`);
                const trailersData = await trailersRes.json();

                    // "Teaser"와 "Trailer" 각각 하나씩 가져오기
                    const teaser = trailersData.results.find(video => video.type === "Teaser");
                    const trailer = trailersData.results.find(video => video.type === "Trailer");
                    // teaser와 trailer 중 존재하는 항목만 배열로 만들어서 저장
                    setTrailers([teaser, trailer].filter(Boolean));

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
        if (sortOrder) {
            return new Date(b.createdAt) - new Date(a.createdAt); // 최신순
        } else {
            return new Date(a.createdAt) - new Date(b.createdAt); // 오래된순
        }
    });

    const toggleSortOrder = () => {
        setSortOrder(!sortOrder);
    };

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
                // 수정 요청 보내기
                const response = await axios.put(`http://localhost:8085/sallybox/movies/${movie_id}/reviews/${editingReviewId}`, {
                    reviewText: reviewContent,
                    user_id: 1,
                    rating: rating,
                    nickname: nickname,
                });
    
                // 전체 리뷰 목록 재요청 - 수정 후 createdAt 포함
                const reviewsRes = await axios.get(`http://localhost:8085/sallybox/movies/${movie_id}/reviews`);
                setReviews(reviewsRes.data);
    
                // 수정 완료된 리뷰로 스크롤 이동 - 수정!!!!!!!!!!
                setTimeout(() => {
                    const editedReviewElement = document.getElementById(`review-${editingReviewId}`);
                    if (editedReviewElement) {
                        editedReviewElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 100); // 수정!!!!!!!!!!
            } else {
                // 새로운 리뷰 작성
                const response = await axios.post(`http://localhost:8085/sallybox/movies/${movie_id}/reviews`, {
                    movie_id: movie_id,
                    reviewText: reviewContent,
                    user_id: 1,
                    rating: rating,
                    nickname: nickname,
                });
    
                // 전체 리뷰 목록 재요청 - 신규 리뷰 포함
                const reviewsRes = await axios.get(`http://localhost:8085/sallybox/movies/${movie_id}/reviews`);
                setReviews(reviewsRes.data);
            }
    
            setReviewContent('');
            setNickname('');
            setRating(5);
            setIsEditing(false);
            setEditingReviewId(null);
            setShowExistingReview(true); // 기존 내용 표시
    
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

    // 입력창을 참조할 useRef 훅 추가
    const reviewInputRef = useRef(null);


    // "더보기" 버튼 클릭 시 더 많은 리뷰를 로드
    const handleShowMoreReviews = (e) => {
        e.preventDefault(); // 기본 동작 방지
        e.stopPropagation(); // 이벤트 버블링 방지
        setVisibleReviews((prevVisibleReviews) => prevVisibleReviews + 10);
    };


    // 리뷰 수정 시 입력창으로 스크롤 이동
    const handleEditReview = (review) => {
        setReviewContent(review.reviewText);
        setRating(review.rating);
        setIsEditing(true);
        setEditingReviewId(review.reviewId);
        setShowExistingReview(false);

        // DOM 업데이트 후 입력창으로 스크롤 이동
        setTimeout(() => {
            reviewInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 0);
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

    // "더보기" 버튼 클릭 시 더 많은 이미지를 로드 (수정!!!)
    const handleLoadMoreImages = () => {
        setVisibleImageCount(prevCount => prevCount + initialImageCount);
    };

    return (
        <div>
            <div>
                <ul className='jytab_wrap jyouter jymoviedetailbar jynew22 jyactionmovingbar' style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                    <li>
                        <button type='button' className={`jytab_tit ${activeTab === 'details' ? 'active' : ''}`} onClick={() => handleTabClick('details')} style={{ width: '485px',backgroundColor: activeTab === 'details' ? '#333' : '#ddd', color: activeTab === 'details' ? '#fff' : '#000'}}>
                            <span>상세정보</span>
                        </button>
                    </li>
                    <li>
                        <button type='button' className={`jytab_tit ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => handleTabClick('reviews')} style={{ width: '485px',backgroundColor: activeTab === 'reviews' ? '#333' : '#ddd', color: activeTab === 'reviews' ? '#fff' : '#000'}}>
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
                                    <div id="jylayerMovieTrailer" className="jylayer_wrap jytrailer_modal active" style={{width:'970px', height:'580px'}}>
                                        <div className="jylayer_contents">
                                        <button type="button" className="jybtn_close" onClick={closeModal}><IoClose  size={30}/></button>
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
                                    <h5 className="jytit_info jytype1" style={{marginTop:'50px'}}>스틸컷</h5>
                                    <div className='jyslide_wrap jyslide_movie_detail_images' style={{
                                            display: 'grid', 
                                            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
                                            gap: '10px', 
                                            padding: '0',
                                            margin: '0',
                                        }}>
                                        {images && images.length > 0 ? (
                                            images.slice(0, visibleImageCount).map((image, index) => ( // 수정!!!
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
                                        ref={reviewInputRef}
                                        id="jyreviewContent"
                                        value={reviewContent}
                                        onChange={(e) => {
                                            if (e.target.value.length <= 220) {
                                                setReviewContent(e.target.value);
                                            }
                                        }}
                                        style={{ width: '100%', height: '150px', padding: '10px', boxSizing: 'border-box' , marginTop:'-10px',fontSize:'17px'}}
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
                        

                            

                            <div className="jyreview-list">
                                {/* 정렬 버튼 추가 */}
                            <button type="button" onClick={toggleSortOrder} className="jy-sort-button">
                                <BiSort />{sortOrder ? '최신순' : '오래된순'}
                            </button>

                            
                            {sortedReviews.length > 0 ? (
                                sortedReviews.slice(0, visibleReviews).map((review) => (
                                    <div key={review.reviewId} id={`review-${review.reviewId}`} className={`jyreview-item ${!showExistingReview && editingReviewId === review.reviewId ? 'jyhidden' : ''}`}> 
                                        {isEditing && editingReviewId === review.reviewId ? null : (
                                            <>
                                            
                                            <p style={{ fontWeight: 'bold' }}>{review.nickname}</p>
                                            <p>{review.reviewText}</p>
                                            <p>{formatDate(review.createdAt)}</p>
                    
                                            
                                            <button onClick={() => handleEditReview(review)}>수정</button>
                                            <button type="button" onClick={() => handleDeleteReview(review.reviewId)}>삭제</button>
                                        </>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p>작성된 리뷰가 없습니다.</p>
                            )}

                            {/* 리뷰가 10개 이상일 때만 "더보기" 버튼 표시 */}
                            {sortedReviews.length > visibleReviews && sortedReviews.length > 10 && (
                                <button type="button" onClick={handleShowMoreReviews} className="jyshow-more-button">
                                    더보기
                                </button>
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

                {isActorModalOpen && <div className="jyoverlay" onClick={closeModal}></div>}
                {isActorModalOpen && selectedActor && (
                    <div id="jycrewDetailModal" className="jylayer_wrap jycrew_modal">
                        <div className="jylayer_header_crew">
                            <button type="button" className="jybtn_close jybtnCloseLayer" onClick={closeActorModal}
                            style={{ background: 'none', 
                                border: 'none', 
                                cursor: 'pointer',
                                padding: '5px'}}><IoClose  size={30}/></button>
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
                                    <p style={{ fontSize : '11px'}}>{selectedActor.place_of_birth}</p>
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
                            <button type="button" className="jybtn_close jybtnCloseLayer" onClick={closeDirectorModal}><IoClose  size={30}/></button>
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
                                    color:'white',
                                }}>
                                <IoClose size={60} />
                            </button>
                            <button type="button" className="jybtn_prev" onClick={handlePrevImage} style={{ marginRight: '30px', backgroundColor: 'rgba(0, 0, 0, 0)', border: 'none', outline: 'none', color:'white' }}>
                                <SlArrowLeft size={50} />
                            </button>

                            <img
                                src={`https://image.tmdb.org/t/p/w500${images[selectedImageIndex].file_path}`}
                                alt="스틸컷"
                                className="jymodal-image"
                                style={{ width: '100%', height: 'auto' }}
                            />

                            <button type="button" className="jybtn_next" onClick={handleNextImage} style={{ marginLeft: '30px',  backgroundColor: 'rgba(0, 0, 0, 0)', border: 'none', outline: 'none', color:'white' }}>
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
