import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import twelve from '../../image/grade_12.png'
import fifteen from '../../image/grade_15.png'
import nineteen from '../../image/pc_grade_19.png'
import all from '../../image/grade_all.png'

const ClassicMoviesPage = () => {

    const countRef = useRef(1);

    const [visible3, setVisible3] = useState(false);
    const [hoveredMovieId, setHoveredMovieId] = useState(null);
    const [classic, setClassic] = useState([]);
    const [page, setPage] = useState(15);
    const [ageRating, setAgeRating] = useState([]);
    const [error, setError] = useState(null);
 
    const onOpen = (id) => {
        setHoveredMovieId(id);
    };

    const onClose = () => {
        setHoveredMovieId(null);
    };

    useEffect(() => {
        const fetchMovies = async () => {
          try {
            const response = await axios.get('/api/classicmovies');
            setClassic(response.data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchMovies();
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

    return (
        <div id='contentse' className='contents_movie_liste'>
            <h2 className='hiddene'>영화목록</h2>
            <div className='movie_screen_boxe'>
            {
                error &&
                <div>Error: {error.message}</div>
            }
                <ul className='movie_liste type2e' onMouseOver={() => setVisible3(true)} onMouseLeave={() => setVisible3(false)}>
                    {classic.slice(0, page).map(movie => (
                        <li key={movie.movieId} className={`screen_add_boxe ${visible3 ? 'actives' : ''}`} onMouseOver={() => onOpen(movie.movieId)} onMouseLeave={onClose}> {/*여기가 map onMouseOver={() => onOpen(movie.movieId)} onMouseLeave={onClose}*/}
                            <div className="top_infoe">
                                <div className="box__tagse">
                                    <ul className="wrap__tage"></ul>
                                </div>
                                <span className="poster_infoe">
                                    <img src={`https://image.tmdb.org/t/p/original/${movie.posterPath}`} alt={movie.title}/>
                                </span>
                                {
                                hoveredMovieId === movie.movieId &&
                                <div className="over_boxe">
                                    <div className="innere" style={{marginTop: '-33px'}}>
                                        <a href="" className="btn_col3e ty3" style={{marginTop: '0'}}>예매하기</a>
                                        <Link to={`/sallybox/movies/${movie.movieId}`} className="btn_col3e ty3">상세정보</Link>
                                    </div>
                                </div>
                                }
                            </div>
                            <div className="btm_infoe" style={{marginTop: 0}}>
                                <span className="ic_gradee gr_12">
                                    <img src={getAgeRatingImg(movie.certification)} alt={movie.certification}/>
                                </span>
                                <strong className="tit_infoe" style={{marginLeft: '7px', display: 'inline-block'}}>{movie.title}</strong>
                                <span className="sub_info1e">
                                    <span className="timee blacktypef"><span className="robotof">{moment(movie.releaseDate).format('YYYY.MM.DD')}&nbsp;개봉</span></span>
                                    <span className="star_infof">{parseFloat(movie.voteAverage).toFixed(1)}</span>
                                </span>
                            </div>
                        </li>
                    ))}   
                </ul>
                {
                    (classic.length >= page) &&
                <button type="button" className="btn_txt_moree" onClick={() => setPage(page + 5)}><span>펼쳐보기</span></button>
                }
            </div>
        </div>
    );
};

export default ClassicMoviesPage;