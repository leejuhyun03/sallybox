import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import twelve from '../../../image/grade_12.png'
import fifteen from '../../../image/grade_15.png'
import nineteen from '../../../image/pc_grade_19.png'
import all from '../../../image/grade_all.png'
 
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import '../../../css/main/body/body.css';

import '../../../css/main/body/bodyswiper.css'

// import required modules
import { Autoplay, EffectCoverflow, Keyboard, Mousewheel, Navigation, Pagination } from 'swiper/modules';
import axios from 'axios';

const Body = ({userId, userNickName, isAuthenticated}) => {

    const [now, setNow] = useState(new Date());
    const [movies, setMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [genres, setGenres] = useState([]); // 기본 장르
    const [selectedGenre, setSelectedGenre] = useState('28'); // 기본 장르
    const [recommendedMovies, setRecommendedMovies] = useState([]);
    const [topRecentMovies, setTopRecentMovies] = useState([]);
    const [error, setError] = useState(null);
    const [hoveredMovieId, setHoveredMovieId] = useState(null);
    const [hoveredMovieId2, setHoveredMovieId2] = useState(null);
    const [hoveredMovieId3, setHoveredMovieId3] = useState(null);

    const onOpen = (id) => {
        setHoveredMovieId(id);
    };

    const onClose = () => {
        setHoveredMovieId(null);
    };

    const onOpen2 = (id) => {
        setHoveredMovieId2(id);
    };

    const onClose2 = () => {
        setHoveredMovieId2(null);
    };

    const onOpen3 = (id) => {
        setHoveredMovieId3(id);
    };

    const onClose3 = () => {
        setHoveredMovieId3(null);
    };



    useEffect(() => {
    const intervalId = setInterval(() => {
        setNow(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
    }, []);
    
    const getDate = () => {
        const year = now.getFullYear()
        const month = now.getMonth() + 1
        const day = now.getDate()
        const hour = now.getHours()
        const min = now.getMinutes().toString().padStart(2, '0');
        const date = `${month}.${day} ${hour}:${min}`
        return date
    }

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/movies');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const moviesArray = data.map(item => ({
                    movieId: item[0],
                    genreIds: item[1],
                    posterPath: item[2],
                    title: item[3],
                    voteAverage: parseFloat(item[4]).toFixed(1), // 평균 평점을 소수점 첫째 자리까지 표시
                    certification: item[5],
                    ageRatingImg: getAgeRatingImg(item[5]),
                }));
                setMovies(moviesArray);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);

    useEffect(() => {
        const fetchTopRatedMovies = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/movies/top-rated');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
    
                // 데이터가 배열인지 확인하고, 맵핑
                if (Array.isArray(data)) {
                    const topRatedArray = data.map(item => ({
                        movieId: item[0], // movieId
                        genreIds: item[1], // genreIds
                        posterPath: item[2], // posterPath
                        title: item[3], // title
                        voteAverage: parseFloat(item[4]).toFixed(1), // 평균 평점을 소수점 첫째 자리까지 표시
                        certification: item[5], // certification
                        releaseDate: item[6],
                        runtime: item[7],
                        ageRatingImg: getAgeRatingImg(item[5]),
                    }));
                    setTopRatedMovies(topRatedArray);
                } else {
                    console.error('Data is not an array:', data);
                }
            } catch (error) {
                console.error('Error fetching top-rated movies:', error);
            }
        };
    
        fetchTopRatedMovies();
    }, []);
    

    const getAgeRatingImg = (certification) => {
        switch(certification){
            // case '전체연령가' : return '../image/grade_all.png'
            case '12세 관람가' : return twelve;
            case '15세 관람가' : return fifteen;
            case '19세 관람가' : return nineteen ;
            default : return all;
        }
    };

    const fetchRecommendedMovies = async () => {
        if (!userId) return; // userid가 없으면 함수 종료

        try {
            const response = await axios.get(
                `http://localhost:5000/api/movies/recommend`,
                {
                    params: {
                        userId: userId,
                        genre: selectedGenre,
                    },
                }
            );
            const data = response.data
            // 데이터가 배열인지 확인하고, 맵핑
            if (Array.isArray(data)) {
                const topRatedArray = data.map(item => ({
                    movieId: item[0], // movieId
                    genreIds: item[1], // genreIds
                    posterPath: item[2], // posterPath
                    title: item[3], // title
                    voteAverage: parseFloat(item[4]).toFixed(1), // 평균 평점을 소수점 첫째 자리까지 표시
                    certification: item[5], // certification
                    releaseDate: item[6],
                    runtime: item[7],
                    ageRatingImg: getAgeRatingImg(item[5]),
                }));
                setRecommendedMovies(topRatedArray);
            } else {
                console.error('Data is not an array:', data);
            }
            
        } catch (err) {
            setError('Failed to fetch recommended movies.');
            console.error(err);
        }
    };

    const fetchRecommendedGenre = async () => {
        if (!userId) return; // userid가 없으면 함수 종료

        try {
            const response = await axios.get(
                `http://localhost:5000/api/movies/genre`,
                {
                    params: {
                        userId: userId
                    },
                }
            );
            const data = response.data

            // 데이터가 배열인지 확인하고, 맵핑
            if (Array.isArray(data)) {
                const topRatedArray = data.map(item => ({
                    genreId: item[0], // genreIds
                    genreText: getGenreText(item[0]),
                }));
                setGenres(topRatedArray);
            } else {
                console.error('Data is not an array:', data);
            }
            
        } catch (err) {
            setError('Failed to fetch recommended movies.');
            console.error(err);
        }
    };

    const getGenreText = (genreId) => {
        switch (genreId) {
            case '28': return '액션'; // 액션
            case '12': return '모험'; // 모험
            case '16': return '애니메이션'; // 애니메이션
            case '35': return '코미디'; // 코미디
            case '80': return '범죄'; // 범죄
            case '18': return '드라마'; // 드라마
            case '14': return '판타지'; // 판타지
            case '27': return '공포'; // 공포
            case '10402': return '음악'; // 음악
            case '9648': return '미스터리'; // 미스터리
            case '878': return 'SF'; // SF
            case '10749': return '로맨스'; // 로맨스
            case '53': return '스릴러'; // 스릴러
            case '10752': return '전쟁'; // 전쟁
            case '37': return '서부'; // 서부
            case '99': return '다큐멘터리'; // 다큐멘터리
            case '10770': return 'TV 영화'; // TV 영화
            case '10751': return '가족'; // 가족
            case '10769': return '예능'; // 예능
            case '10758': return '공상과학'; // 공상과학
            default: return '기본'; // 기본 장르
        }
    };

    useEffect(() => {
        fetchRecommendedMovies();
        fetchRecommendedGenre();
    }, [userId, selectedGenre]); // userId 또는 selectedGenre가 변경될 때마다 호출

    const handleSelectChange = (event) => {
        setSelectedGenre(event.target.value); // 선택한 장르로 상태 업데이트
    };

    useEffect(() => {
        const fetchTopRatedMovies = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/movies/recent');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
    
                // 데이터가 배열인지 확인하고, 맵핑
                if (Array.isArray(data)) {
                    const topRecentArray = data.map(item => ({
                        movieId: item[0],                    // 영화 고유 ID
                        genreIds: item[1],                   // 장르 ID
                        posterPath: item[2],                  // 포스터 이미지 경로
                        title: item[3],                       // 영화 제목
                        voteAverage: parseFloat(item[4]).toFixed(1), // 평균 평점을 소수점 첫째 자리까지 표시
                        certification: item[5],               // 관람 연령
                        releaseDate: item[6],                 // 개봉일
                        runtime: item[7],                     // 영화 런타임
                        genreText: getGenreText(item[1]),
                        ageRatingImg: getAgeRatingImg(item[5]), // 연령 등급 이미지
                    }));
                    setTopRecentMovies(topRecentArray);
                } else {
                    console.error('Data is not an array:', data);
                }
                
            } catch (error) {
                console.error('Error fetching top-rated movies:', error);
            }
        };
    
        fetchTopRatedMovies();
    }, []);
    
    return (
        <>
        <div id='contents' className='contents_main'>
            <div className='movi_current_list'>
                <span className='movi_info_txt'>
                    <a href='https://www.lottecinema.co.kr/NLCHS/Movie/List?flag=1'>
                        <em>{getDate()}</em>
                        &nbsp;기준</a>
                </span>
                
                <Swiper
                    effect={'coverflow'}
                    // cssMode={true}
                    // navigation={true}
                    pagination={{
                        clickable: true,
                    }}
                    mousewheel={true}
                    keyboard={true}
                    loop={true}
                    speed={1000}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true }}
                    autoplay={{
                        delay: 3000, // 3초마다 다음 슬라이드로 이동
                        disableOnInteraction: false
                    }}
                        
                    modules={[EffectCoverflow, Pagination, Mousewheel, Keyboard, Autoplay]}
                    className="myBodySwiper1"
                >
                {topRatedMovies.map(movie => (
                    <SwiperSlide key={movie.movieId} className='owl-stage' style={{ width: '184px', marginRight: '15px', background: '#000' }}
                    onMouseOver={() => onOpen(movie.movieId)} onMouseLeave={onClose}>
                        <div>
                            <img src={`https://image.tmdb.org/t/p/original/${movie.posterPath}`} alt={movie.title} style={{borderRadius: '4px'}}/>
                            <div className='titleInfo'>
                            <span className="ageRating">
                                <img src={movie.ageRatingImg} alt={movie.title}/>
                            </span>
                            {
                                hoveredMovieId === movie.movieId &&
                            <div className='test'>
                                <div className="in" style={{marginTop: '-33px'}}>
                                    <a href="#" className="btn_col3s ty3" title="화면이동" style={{marginTop: '0'}}>예매하기</a>
                                    <a href="#none" className="btn_col3s ty3" title="화면이동">상세정보</a>
                                </div>
                            </div>
                            }
                            <strong>{movie.title && <div className='movieTitle'>{movie.title}</div>}</strong>
                            </div>    
                        </div>
                    </SwiperSlide>
                ))}
                </Swiper>
            </div>
            <div id="main_specialCinema" className="main_cont_wrap special">
                <div className="sec_tit">스페셜관</div>
                <ul className="special_wrap2">
                    <li style={{paddingLeft: '13px'}}>
                        <a href="#none" title="화면이동">
                            <img src="https://cf.lottecinema.co.kr//Media/WebAdmin/cd746f8b4a544f33988d6810ba2934cd.png" alt="샤롯데바로가기"/>
                        </a>
                    </li>
                    <li style={{paddingLeft: '28px'}}>
                        <a href="#none" title="화면이동">
                            <img src="https://cf.lottecinema.co.kr//Media/WebAdmin/0df5043330d7485b8081dc2d1bebaa3a.png" alt="수퍼플렉스 바로가기"/>
                        </a>
                    </li>
                    <li style={{paddingLeft: '28px'}}>
                        <a href="#none" title="화면이동">
                            <img src="https://cf.lottecinema.co.kr//Media/WebAdmin/5463e8ccf61b47eba99b9f43250a29e7.png" alt="수퍼MX4D 바로가기"/>
                        </a>
                    </li>
                    <li style={{paddingLeft: '28px'}}>
                        <a href="#none" title="화면이동">
                            <img src="https://cf.lottecinema.co.kr//Media/WebAdmin/1ea3eb09cb8e44d2b18f4f0a8fb6bbfa.png" alt="수퍼4D 바로가기"/>
                        </a>
                    </li>
                    <li style={{paddingLeft: '28px'}}>
                        <a href="#none" title="화면이동">
                            <img src="https://cf.lottecinema.co.kr//Media/WebAdmin/da5ec3722eed429f99f5da61aab82e9e.png" alt="수퍼LED"/>
                        </a>
                    </li>
                    <li style={{paddingLeft: '28px'}}>
                        <a href="#none" title="화면이동">
                            <img src="https://cf.lottecinema.co.kr//Media/WebAdmin/57ae75fb348f428d9013ccf78a90bb26.png" alt="광음시네마 바로가기"/>
                        </a>
                    </li>
                    <li style={{paddingLeft: '28px'}}>
                        <a href="#none" title="화면이동">
                            <img src="https://cf.lottecinema.co.kr//Media/WebAdmin/83bec017eebe447dbff1b3786e739ce6.png" alt="씨네컴포트"/>
                        </a>
                    </li>
                    <li style={{paddingLeft: '28px'}}>
                        <a href="#none" title="화면이동">
                            <img src="https://cf.lottecinema.co.kr//Media/WebAdmin/85b66189642e4a78af74e2fb7da75d29.png" alt="씨네패밀리 바로가기"/>
                        </a>
                    </li>
                    <li style={{paddingLeft: '28px'}}>
                        <a href="#none" title="화면이동">
                            <img src="https://cf.lottecinema.co.kr//Media/WebAdmin/615a9be3c6ae432888a9ca8631ede4d9.png" alt=""/>
                        </a>
                    </li>
                </ul>
                <button type="button" className="btn_txt_more ty2">더보기</button>
            </div>            
            
            <div style={{marginTop: '70px', marginBottom: '70px'}}>
            <h3 className="tit_type1">현재 상영작&nbsp;
                <strong className="ty2 eng">TOP 5</strong>
            </h3>
            
            <Swiper
                slidesPerView={5}
                slidesPerGroup={1}
                spaceBetween={10}
                cssMode={true}
                navigation={{
                    prevEl: '.sw3',
                    nextEl: '.sw4',
                }}
                pagination={false}
                loop={true}
                mousewheel={true}
                keyboard={true}
                
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                className="myBodySwiper3"
                >
                <div className="swiper-button-prev sw3"></div>
                <div className="swiper-button-next sw4"></div>
                <div className='movi_current_list'>
                    <ul className='movie_list'>
                        <div className='item'>
                        {topRecentMovies.map(movie => (
                            <SwiperSlide key={movie.movieId} onMouseOver={() => onOpen2(movie.movieId)} onMouseLeave={onClose2}>
                                <li style={{float: 'left', position: 'relative', width: '100%', margin: '0 0  ', textAlign: 'center', height: '326px'}}>
                                <img style={{width:'100%', height:'262px', position: 'relative', borderRadius: '4px'}}
                                src={`https://image.tmdb.org/t/p/original/${movie.posterPath}`} alt={movie.title}/>
                                {
                                        hoveredMovieId2 === movie.movieId &&
                                    <div className='test' style={{height: '95%'}}>
                                        <div className="in" style={{marginTop: '-33px'}}>
                                            <a href="#" className="btn_col3s ty3" title="화면이동" style={{marginTop: '0'}}>예매하기</a>
                                            <a href="#none" className="btn_col3s ty3" title="화면이동">상세정보</a>
                                        </div>
                                    </div>
                                    }
                                <div className="btm_info">
                                    <span className="ic_grade gr_12"><img src={movie.ageRatingImg} alt={movie.certification}/></span>
                                    <strong className="tit_info" style={{marginLeft: '7px'}}>{movie.title}</strong>
                                    <span className="sub_info1">
                                        <span className="time blacktype"><span className="roboto">{movie.runtime}</span>분</span>
                                        <span className="star_info">{movie.voteAverage}</span>
                                    </span>
                                </div>
                                </li>
                            </SwiperSlide>
                        ))} 
                        </div>
                    </ul>
                </div>
            </Swiper>
            </div>   

            {
                isAuthenticated && (
                <div id="main_specialCinema" className="main_cont_wrap special">
                <div className="sec_tit">{userNickName}님의 취향저격 베스트 영화</div>
                <Swiper
                    slidesPerView={5}
                    slidesPerGroup={1}
                    spaceBetween={10}
                    cssMode={true}
                    navigation= {{
                        prevEl: '.sw1',
                        nextEl: '.sw2'
                    }}
                    pagination={false}
                    loop={true}
                    mousewheel={true}
                    keyboard={true}
                    modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                    className="myBodySwiper2"
                    >
                    <div className="swiper-button-prev sw1"></div>
                    <div className="swiper-button-next sw2"></div>
                    <div className='movi_current_list'>
                        <ul className='movie_list'>
                            <div className='item'>
                            {recommendedMovies.map(movie => (
                                <SwiperSlide key={movie.movieId} onMouseOver={() => onOpen3(movie.movieId)} onMouseLeave={onClose3}>
                                    <li style={{float: 'left', position: 'relative', width: '100%', margin: '0 0  ', textAlign: 'center', height: '326px'}}>
                                    <img style={{width:'100%', height:'262px', position: 'relative'}} 
                                    src={`https://image.tmdb.org/t/p/original/${movie.posterPath}`} alt={movie.title}/>
                                    {
                                        hoveredMovieId3 === movie.movieId &&
                                    <div className='test' style={{height: '95%'}}>
                                        <div className="in" style={{marginTop: '-33px'}}>
                                            <a href="#" className="btn_col3s ty3" title="화면이동" style={{marginTop: '0'}}>예매하기</a>
                                            <a href="#none" className="btn_col3s ty3" title="화면이동">상세정보</a>
                                        </div>
                                    </div>
                                    }
                                    <div className="btm_info">
                                        <span className="ic_grade gr_12"><img src={movie.ageRatingImg} alt={movie.certification}/></span>
                                        <strong className="tit_info" style={{marginLeft: '7px'}}>{movie.title}</strong>
                                        <span className="sub_info1">
                                            <span className="time blacktype"><span className="roboto">{movie.runtime}</span>분</span>
                                            <span className="star_info">{movie.voteAverage}</span>
                                        </span>
                                    </div>
                                    </li>
                                </SwiperSlide>
                            ))} 
                            </div>
                        </ul>
                    </div>
                    </Swiper>
                        <select className="btn_txt_more ty2" style={{ background: '0' }} value={selectedGenre} onChange={handleSelectChange}>
                            {genres.map((genre, index) => (
                                <option key={index} value={genre.genreId}>{genre.genreText}</option>
                            ))}
                        </select>
                    </div>
                )}  

            <div className='main_cont_wrap premiere'>
                <div className="sec_tit">시사회/무대인사</div>
                <ul className='premiere_wrap' style={{display: 'flex', padding: '0'}}>
                <li>
                    <a href="#none" title="화면이동"><img src="https://cf.lottecinema.co.kr//Media/Event/734a05e708544327a851302da3a2c40c.jpg" alt="<수 분간의 응원을> 광음시네마 앵콜 광야(夜)상영회 WooferWave - Sound Pass"/></a>
                </li>
                <li>
                    <a href="#none" title="화면이동"><img src="https://cf.lottecinema.co.kr//Media/Event/30fc9aaa4fdd4e15a4d7d3ce546ca1b2.jpg" alt="롯데시네마와 함께하는 <안녕, 할부지> 스페셜 상영회"/></a>
                </li>
                <li>
                    <a href="#none" title="화면이동"><img src="https://cf.lottecinema.co.kr//Media/Event/1ada120cf28142ef8bc52707c0b6ccc7.jpg" alt="롯데시네마(로고)와 함께하는 보통의 가족(로고) 송중기 배우 GV"/></a>
                </li>
                </ul>
            </div>

            <div className="mid_menu_wrap">
                <a href="#none" className="mid_itm" title="화면이동">
                    <img src="https://cf.lottecinema.co.kr//Media/WebAdmin/3423e358b74d49d5b12867c7d9c6f6a8.png" alt="할인안내"/>
                </a>
                <a href="#none" className="mid_itm" title="화면이동">
                    <img src="https://cf.lottecinema.co.kr//Media/WebAdmin/16b056e5e6a04c609b94a5c21e786d3b.png" alt="포인트"/>
                </a>
                <a href="#none" className="mid_itm" title="화면이동">
                    <img src="https://cf.lottecinema.co.kr//Media/WebAdmin/9fd4a77cd6a44a39aa35d07e5bb8a010.png" alt="멤버십"/>
                </a>
                <a href="#none" className="mid_itm" title="화면이동">
                    <img src="https://cf.lottecinema.co.kr//Media/WebAdmin/3633088df0644062b53cd88b34067895.png" alt="틴틴클럽"/>
                </a>
                <a href="#none" className="mid_itm" title="화면이동">
                    <img src="https://cf.lottecinema.co.kr//Media/WebAdmin/9c4e2721ecdd488d86df6d27e3c2a000.png" alt="bravo 브라보클럽"/>
                </a>
            </div>

            <div className="main_cont_wrap notice">
                <div className="sec_tit">공지사항</div>
                <div className="rolling_menu_wrap">
                    <ul className="rolling_menu" style={{top: '-15px'}}>
                        <li><a href="#none" title="회사 사칭 피싱 사기 주의">회사 사칭 피싱 사기 주의</a></li>
                        <li><a href="#none" title="롯데시네마 영상정보처리기기 운영 및 관리방침 개정 안내">롯데시네마 영상정보처리기기 운영 및 관리방침 개정 안내</a></li>
                    </ul>
                </div>
                <button type="button" className="btn_txt_more ty2">더보기</button>
            </div>
        </div>
        
        </>
    );
};

export default Body;