<<<<<<< HEAD
import React, { useEffect, useState } from 'react';

import '../../css/movies/movies.css'
import axios from 'axios';

const Movied = () => {

    const [movies, setMovies] = useState([]);
    const [visible, setVisible] = useState(true)
    const [visible2, setVisible2] = useState(false)
    const [hoveredMovieId, setHoveredMovieId] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Spring Boot API로 영화 데이터를 요청하는 함수
        const fetchMovies = async () => {
          try {
            const response = await axios.get('/api/nowmovies');
            const data = response.data
            console.log("잘 오나?: " + data)
            if (Array.isArray(data)) {
                const nowMoviesArray = data.map(item => ({
                    movieId: item[0],                    // 영화 고유 ID
                    posterPath: item[1],                   // 장르 ID
                    title: item[2],                       // 영화 제목
                    voteAverage: parseFloat(item[3]).toFixed(1), // 평균 평점을 소수점 첫째 자리까지 표시
                    certification: item[4]                   // 영화 런타임
                }));
                console.log("잘 들어갔다: " + nowMoviesArray)
                setMovies(nowMoviesArray);
            } else {
                console.error('Data is not an array:', data);
            }
          } catch (err) {
            setError(err);
          }
        };
    
        fetchMovies();
      }, []); // 빈 배열을 넣어 한 번만 실행되게 함
    
      if (error) {
        return <div>Error: {error.message}</div>;
      }

=======
import React, { useEffect, useRef, useState } from 'react';

import '../../css/movied/movied.css' 
import NowMovies from './NowMovies';
import RecommendMovies from './RecommendMovies';
import { useParams } from 'react-router-dom';

const Movied = () => {

    const {on} = useParams();
    
    const [visible, setVisible] = useState(true);
    const [hoveredMovieId, setHoveredMovieId] = useState(null);

    useEffect(() => {
        if (on === '1') {
            setVisible(true);  // 'on'이 1이면 visible을 true로 설정
        } else if (on === '2') {
            setVisible(false); // 그 외의 값이면 false로 설정
        }
    }, [on]);

    const onNow = () => {
        setVisible(true)
    }

    const onRec = () => {
        setVisible(false)
    }
    
>>>>>>> 963c018b77b364d1a5310fbcfa99d105fdfe1969
    const onOpen = (id) => {
        setHoveredMovieId(id);
    };

    const onClose = () => {
        setHoveredMovieId(null);
    };

    return (
        <div id='contentse' className='contents_movie_liste'>
            <h2 className='hiddene'>영화목록</h2>
            <div className='movie_screen_boxe'>
                <ul className='tab_btn_type1e'>
                    <li className={`${visible ? 'actives' : 'activef'}`}>
<<<<<<< HEAD
                    <button type="button" className='buttone' onClick={() => setVisible(true)}>
=======
                    <button type="button" className='buttone' onClick={onNow}>
>>>>>>> 963c018b77b364d1a5310fbcfa99d105fdfe1969
                        <span>현재 상영작</span>
                    </button>
                    </li>
                    <li className={`${visible ? 'activef' : 'actives'}`}>
<<<<<<< HEAD
                    <button type="button" className='buttone' onClick={() => setVisible(false)}>
=======
                    <button type="button" className='buttone' onClick={onRec}>
>>>>>>> 963c018b77b364d1a5310fbcfa99d105fdfe1969
                            <span>Sally 추천작</span>
                        </button>
                    </li>
                </ul>
<<<<<<< HEAD
                <ul className='movie_liste type2e' onMouseOver={() => setVisible2(true)} onMouseLeave={() => setVisible2(false)}>
                    <li className={`screen_add_boxe ${visible2 ? 'actives' : ''}`}> {/*여기가 map onMouseOver={() => onOpen(movie.movieId)} onMouseLeave={onClose}*/}
                        <div className="top_infoe">
                            <div className="box__tagse">
                                <ul className="wrap__tage"></ul>
                            </div>
                            <span className="poster_infoe">
                                <img src="https://cf.lottecinema.co.kr//Media/MovieFile/MovieImg/202410/21457_103_1.jpg" alt="베놈: 라스트 댄스"/>
                                <em className="num_infoe">1</em>
                            </span>
                            {/* {
                                hoveredMovieId === movie.movieId && */}
                                <div className="over_boxe">
                                <div className="innere" style={{marginTop: '-33px'}}>
                                    <a href="https://www.lottecinema.co.kr/NLCHS/ticketing?movieCd=21457&amp;movieName=베놈%3A 라스트 댄스" className="btn_col3e ty3e" style={{marginTop: '0'}}>예매하기</a>
                                    <a href="https://www.lottecinema.co.kr/NLCHS/Movie/MovieDetailView?movie=21457" className="btn_col3e ty3e">상세정보</a>
                                </div>
                            </div>
                            {/* } */}
                        </div>
                        <div className="btm_infoe">
                            <strong className="tit_infoe"><span className="ic_gradee gr_15e"></span>베놈: 라스트 댄스</strong>
                            <span className="sub_info1e"><span className="timee blacktypee" style={{marginLeft: '0'}}><span className="robotoe">108</span>분</span></span>
                        </div>
                    </li>
                </ul>
=======
                {
                    visible ? 
                        <NowMovies
                            hoveredMovieId={hoveredMovieId}
                            onOpen={onOpen}
                            onClose={onClose}
                        /> :
                        <RecommendMovies
                            hoveredMovieId={hoveredMovieId}
                            onOpen={onOpen}
                            onClose={onClose}
                        />
                }
>>>>>>> 963c018b77b364d1a5310fbcfa99d105fdfe1969
            </div>
        </div>
    );
};

export default Movied;