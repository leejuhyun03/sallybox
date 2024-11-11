import React, { useEffect, useMemo, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import axios from 'axios';
import '../../css/ticketing/TicketingMovie.css';

import all from '../../image/grade_all.png';
import tweleve from '../../image/grade_12.png';
import fifteen from '../../image/grade_15.png';
import nineteen from '../../image/pc_grade_19.png';
import TheaterTime from '../theater/TheaterTime';
import TicketingNothing from './TicketingNothing';
import { useLocation } from 'react-router-dom';

const TicketingMovie = ({ cinemaId, onMovieSelect, onScheduleSelect, scheduleMap }) => {
    const [sortMethod, setSortMethod] = useState('A');
    const [movies, setMovies] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [activeButton, setActiveButton] = useState('jybtn_screen_time');
    const { fullDates, dates, months, weekdays } = DateList();
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [isGraySelected, setIsGraySelected] = useState(false);
    const [filter, setFilter] = useState('전체');
    const [currentTime, setCurrentTime] = useState(new Date());
    const [fetchedMovies, setFetchedMovies] = useState([]);
    const [filteredSchedules, setFilteredSchedules] = useState([]);
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const [startIndex, setStartIndex] = useState(0); 
    const visibleDatesCount = 8; // 추가!!!!!! 화면에 표시할 날짜 수

    const location = useLocation();
    const movieId = location.state; // Access the movie_id from the state
    console.log('TicketingMovie: ', movieId)
  
    useEffect(() => {
        if (movieId) {
          setSelectedMovieId(movieId);
          applyFilter(fetchedMovies, filter, movieId);
          onMovieSelect(movieId);
          console.log('들어감?')
        }
    }, [movieId]);
    console.log('허강현: ', selectedMovieId)
      
    const handlePrevDate = () => {
        setStartIndex(prev => Math.max(prev - visibleDatesCount, 0));
    };

    const handleNextDate = () => { 
        setStartIndex(prev => Math.min(prev + visibleDatesCount, fullDates.length - visibleDatesCount));
    };

    
    const certification = (certification) => {
        switch (certification) {
            case '12세 관람가': return tweleve;
            case '15세 관람가': return fifteen;
            case '19세 관람가': return nineteen;
            default: return all;
        }
    };

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setSelectedDate(today);
    }, []);

    const fetchMovieDetailsById = async (movieId) => {
        try {
            const response = await axios.get(`http://192.168.16.4:8085/sallybox/movies/${movieId}`);
            const movieDetails = response.data;
            return {
                voteAverage: movieDetails.voteAverage,
                popularity: movieDetails.popularity,
                releaseDate: movieDetails.releaseDate,
            };
        } catch (error) {
            console.error(`Failed to fetch details for movie ID ${movieId}:`, error);
            return null;
        }
    };
    //1110 지영 첫 추가
    const fetchCinemaAndSchedules = async () => {
        try {
            const response = await axios.get(`http://192.168.16.4:8085/sallybox/cinemajy/${cinemaId}`, {
                params: { selected_date: selectedDate }
            });
            const fetchedMovies = response.data.schedules[selectedDate] || [];
            const moviesWithDetails = await Promise.all(//영화세부정보
                fetchedMovies.map(async (movie) => {
                    const details = await fetchMovieDetailsById(movie.movie_id);
                    return details ? { ...movie, ...details } : movie;
                })
            );
             // 중복된 영화 제거: `movie_id`로 고유한 영화만 남김 --1110 추가된 코드(fetchedMovies,moviewithDetails둘다 상관없음 기본정보/상세정보임)
            const uniqueMovies = Array.from(new Map(fetchedMovies.map(movie => [movie.movie_id, movie])).values());

            //1101 -주석이 원래코드
            //setFetchedMovies(moviesWithDetails);
            //setMovies(moviesWithDetails);
            // sortMovies(sortMethod, moviesWithDetails); 
            //applyFilter(moviesWithDetails, '전체');

            // 중복이 제거된 `uniqueMovies`를 모든 관련 함수에 적용 --추가된 코드
            setFetchedMovies(uniqueMovies);
            setMovies(uniqueMovies);
            sortMovies(sortMethod, uniqueMovies);
            applyFilter(uniqueMovies, '전체');

            // console.log("moviesWithDetails:", JSON.stringify(moviesWithDetails, null, 2));
            // console.log("fetchedMovies:", JSON.stringify(fetchedMovies, null, 2));
        } catch (error) {
            console.error("영화 목록을 불러오는데 실패했습니다:", error);
        }
    };

   
    useEffect(() => {
        if (cinemaId && selectedDate) {
            setFilter('전체');
            fetchCinemaAndSchedules();
        }
    }, [cinemaId, selectedDate]);

    const filteredSchedulesMap = new Map();

    if (scheduleMap && scheduleMap instanceof Map) {
        scheduleMap.forEach((schedules, created) => {
            if (created === date) {
                filteredSchedulesMap.set(date, schedules);
            }
        });
    } else {
        console.log("scheduleMap이 map이 아니야");
    }

    const handleDate = (selectedDate) => {
        const hasSchedules = Array.from(scheduleMap.keys()).some(created => created === selectedDate);
        setIsGraySelected(!hasSchedules);
        setDate(selectedDate);
        setSelectedDate(selectedDate);
    };

    const handleMovieClick = (movie) => {
        setSelectedMovieId(movie.movie_id);
        applyFilter(fetchedMovies, filter, movie.movie_id);
        onMovieSelect(movie);
    };

    const handleFilter = (selectedFilter) => setFilter(selectedFilter);

    const handleChange = (event) => {
        const selectedSortMethod = event.target.value;
        setSortMethod(selectedSortMethod);
        sortMovies(selectedSortMethod, movies);
    };

    const sortMovies = (method, moviesToSort) => {
        const sortedMovies = [...moviesToSort];
        if (method === 'A') {
            sortedMovies.sort((a, b) => b.popularity - a.popularity);
        } else if (method === 'B') {
            sortedMovies.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
        } else if (method === 'C') {
            sortedMovies.sort((a, b) => b.voteAverage - a.voteAverage);
        }
        setMovies(sortedMovies);
    };

    function DateList() {
        const today = new Date();
        const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

        const result = Array.from({ length: 60 }, (_, i) => { // 최대 30일간 날짜 생성
            const date = new Date(today);
            date.setDate(today.getDate() + i);

            return {
                fullDate: date.toISOString().split('T')[0],
                date: String(date.getDate()),
                month: String(date.getMonth() + 1),
                weekday: daysOfWeek[date.getDay()],
            };
        });

        return {
            fullDates: result.map(item => item.fullDate),
            dates: result.map(item => item.date),
            months: result.map(item => item.month),
            weekdays: result.map(item => item.weekday),
        };
    }
    

    const groupedData = {};

    scheduleMap.forEach((schedules) => {
        schedules.forEach(schedule => {
            const { movie_id } = schedule;
            if (!groupedData[movie_id]) {
                groupedData[movie_id] = [];
            }
            groupedData[movie_id].push(schedule);
        });
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 600000);
        return () => clearInterval(timer);
    }, []);

    const applyFilter = (schedules, selectedFilter, movieId) => {
        let filtered = schedules;

        if (selectedFilter === '스페셜관') {
            filtered = schedules.filter(schedule => [7, 10, 28].includes(schedule.theater_id));
        } else if (selectedFilter === '13시 이후') {
            filtered = schedules.filter(schedule => new Date(`1970-01-01T${schedule.start_time}`).getHours() >= 13);
        } else if (selectedFilter === '19시 이후') {
            filtered = schedules.filter(schedule => new Date(`1970-01-01T${schedule.start_time}`).getHours() >= 19);
        } else if (selectedFilter === '심야') {
            filtered = schedules.filter(schedule => new Date(`1970-01-01T${schedule.start_time}`).getHours() >= 23);
        }

        if (movieId) {
            filtered = filtered.filter(schedule => schedule.movie_id === movieId);
        }

        setFilteredSchedules(filtered);
    };

    const handleFilterChange = (selectedFilter) => {
        setFilter(selectedFilter);
        applyFilter(movies, selectedFilter);
    };

    const formatTime = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    };

    //theaater_tyype별로 그룹화 하고, 현재 시간 이후의 상영 스케줄만 필터링하여 theaterTypeData라는 객체로 저장하는 로직
    const theaterTypeData = useMemo(() => {
        const data = {};
        if (fetchedMovies) { // fetchedMovies 배열이 존재하는 경우에만 실행
            fetchedMovies.forEach(schedule => {
                const { theater_type } = schedule; // `theater_type`을 사용하여 그룹화
                if (!data[theater_type]) {
                    data[theater_type] = []; // theater_type이 처음 나올 때 빈 배열 생성
                }
                const scheduleTime = new Date(schedule.start_time); // start_time을 Date 객체로 변환
                if (scheduleTime > currentTime) { // 현재 시간 이후의 스케줄만 추가
                    data[theater_type].push(schedule); // theater_type 키에 해당하는 배열에 스케줄 추가
                }
            });
        }
        return data; // 그룹화된 데이터 반환
    }, [fetchedMovies, currentTime]);
   // console.log("theaterTypeDatatheaterTypeData:", JSON.stringify(theaterTypeData, null, 2));

    return (
        <div className="jycinema_movie_schedule" style={{ display: 'flex', width: '851px', height: '870px' }}>
            <div className="jycinema_movies" style={{ width: '351px', height: '870px', margin: '0px',backgroundColor:'#dddddd' }}>
                <div className="jygroup_top">
                    <h4 className="jycinema_title" style={{textAlign:'center'}}>영화 선택</h4>
                </div>
                <div className="jyMovie_inner" style={{backgroundColor: '#dddddd',width: '351px', height: '805px'}}>
                    <div className="jylist_filter">
                        <select id="jysortSelect" value={sortMethod} onChange={handleChange}>
                            <option value="A">예매순</option>
                            <option value="B">개봉일순</option>
                            <option value="C">평점순</option>
                        </select>
                    </div>
                    <div className="jymovieSelect_list" style={{ width: '351px', height: '755px' }}>
                        {movies.map((movie) => (
                            
                            <div
                                key={movie.movie_id}
                                className={`jymovie_item ${selectedMovieId === movie.movie_id ? 'selected' : ''}`}
                                onClick={() => handleMovieClick(movie)}
                            >
                                <img
                                    src={certification(movie.certification)}
                                    alt={`${movie.certification} 아이콘`}
                                    className="jymovie_certification"
                                />
                                <p className="jymovie_title">{movie.title}</p>
                                <p style={{ display: 'none' }} className="jymovie_details">
                                    평점: {movie.voteAverage}, 인기: {movie.popularity}, 개봉일: {movie.releaseDate}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="jycinema_day" style={{ width: '500px', height: '870px', backgroundColor: 'black' }}>
                <div className="jygroup_top">
                    <h4 className="jycinema_title">{selectedDate}</h4>
                </div>
                <div className="jyschedule_inner">
                    <div className="jyticketing_schedule_bottom_wrap">
                        <div className={`jytime_table_wrap ${activeButton === 'jybtn_screen_time' ? 'jyactive' : ''}`}>
                            <div className="jydate_select" style={{ backgroundColor: '#f5f5f5', width: '496px', height: '100%', margin: '0px' }}>
                                <div className="jydate_slide">
                                <button onClick={handlePrevDate} disabled={startIndex === 0} className="jydate_arrow_button"> 
                                    <IoIosArrowBack size={24} /> 
                                </button>
                                {fullDates.slice(startIndex, startIndex + visibleDatesCount).map((fullDate, index) => ( 
                                    <button
                                        key={index}
                                        className={`jydate_item ${selectedDate === fullDate ? 'jyselected' : ''}`}
                                        onClick={() => handleDate(fullDate)}
                                    >
                                        <span style={{ color: index === 0 ? 'black' : 'transparent', fontSize: '12px' }}>{months[startIndex + index]}월</span> 
                                        <span style={{ color: weekdays[startIndex + index] === '토' ? 'blue' : weekdays[startIndex + index] === '일' ? 'red' : 'black' }}>
                                            {dates[startIndex + index]}
                                        </span>
                                        <span style={{
                                            color: weekdays[startIndex + index] === '토' ? 'blue' : weekdays[startIndex + index] === '일' ? 'red' : 'black',
                                            fontSize: '12px'
                                        }}>
                                            {weekdays[startIndex + index]}
                                        </span>
                                    </button>
                                ))}
                                <button onClick={handleNextDate} disabled={startIndex + visibleDatesCount >= fullDates.length} className="jydate_arrow_button"> 
                                    <IoIosArrowForward size={24} /> 
                                </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ backgroundColor: '#f5f5f5', width: '496px', height: '676px' }}>
                        <div style={{ backgroundColor: '#f5f5f5', width: '496px', height: '50px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                            {['전체', '스페셜관', '13시 이후', '19시 이후', '심야'].map((filterOption) => (
                                <button
                                    key={filterOption}
                                    onClick={() => handleFilterChange(filterOption)}
                                    style={{
                                        backgroundColor: filter === filterOption ? 'black' : 'transparent',
                                        color: filter === filterOption ? 'white' : 'black',
                                        border: '1px solid black',
                                        borderRadius: '4px',
                                        padding: '5px 10px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {filterOption}
                                </button>
                            ))}
                        </div>

                        <div className="jyTicketingTime" style={{ backgroundColor: '#f5f5f5', width: '496px', height: '676px', display: 'flex', flexDirection: 'column' }}>
                            {filteredSchedules.length > 0 ? (
                                Object.entries(
                                    filteredSchedules.reduce((acc, schedule) => {
                                        const { movie_id } = schedule;
                                        if (!acc[movie_id]) acc[movie_id] = [];
                                        acc[movie_id].push(schedule);
                                        return acc;
                                    }, {})
                                ).map(([movie_id, schedules]) => (
                                    <div key={movie_id} className="jytime_scroll_select_wrap" style={{ marginBottom: '10px', borderBottom: '1px solid #ddd', paddingBottom: '30px' }}>
                                        {/* 지영 */}
                                        <div className="jytime_scroll_title" style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                            <img
                                                src={certification(schedules[0].certification)}
                                                alt="연령 사진"
                                                style={{ width: '30px', marginRight: '10px' }}
                                            />
                                            <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{schedules[0].title}</span>
                                        </div>
                                        
                                        {/* 영화별 theater_type 표시 */}
                                        <div className="jytheater_type_info">
                                            <span>{schedules[0].theater_type}</span>
                                        </div>
                                        
                                        
                                        <div className="jytime_scroll_select_buttons">
                                            {schedules.map(schedule => (
                                                <button
                                                    key={schedule.schedule_id}
                                                    onClick={() => onScheduleSelect(schedule)}
                                                    className="jytime_button"
                                                >
                                                
                                                    <span>{formatTime(schedule.start_time)}</span>
                                                    <span>{schedule.screen_no}관</span>
                                                </button>
                                            ))}
                                        </div>
                                       



                                    </div>
                                ))
                            ) : (
                                <div style={{ textAlign: 'center', padding: '20px', fontSize: '14px' }}>
                                    <TicketingNothing />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketingMovie;
