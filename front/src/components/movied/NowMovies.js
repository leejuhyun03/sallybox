import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

import twelve from '../../image/grade_12.png'
import fifteen from '../../image/grade_15.png'
import nineteen from '../../image/pc_grade_19.png'
import all from '../../image/grade_all.png'
import { Link } from 'react-router-dom';

const NowMovies = ({hoveredMovieId, onOpen, onClose}) => {

    const countRef = useRef(1);

    const [visible2, setVisible2] = useState(false);
    const [movies, setMovies] = useState([]);
    const [ageRating, setAgeRating] = useState([]);
    const [movieId, setMovieId] = useState();
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
          try {
            const response = await axios.get('/api/nowmovies');
            setMovies(response.data);
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

    const onMoveMovie = (id) => {
        setMovieId(id);
        
    }
    
    return (
        <>
        {
            error &&
            <div>Error: {error.message}</div>
        }
            <ul className='movie_liste type2e' onMouseOver={() => setVisible2(true)} onMouseLeave={() => setVisible2(false)}>
                {movies.map((movie, index) => (
                    <li key={movie.movieId} className={`screen_add_boxe ${visible2 ? 'actives' : ''}`} onMouseOver={() => onOpen(movie.movieId)} onMouseLeave={onClose}> {/*여기가 map onMouseOver={() => onOpen(movie.movieId)} onMouseLeave={onClose}*/}
                        <div className="top_infoe">
                            <div className="box__tagse">
                                <ul className="wrap__tage"></ul>
                            </div>
                            <span className="poster_infoe">
                                <img src={`https://image.tmdb.org/t/p/original/${movie.posterPath}`} alt={movie.title}/>
                                <em className="num_infoe">{index + 1}</em>
                            </span>
                            {
                            hoveredMovieId === movie.movieId &&
                            <div className="over_boxe">
                                <div className="innere" style={{marginTop: '-33px'}}>
                                    <a href="" className="btn_col3e ty3" style={{marginTop: '0'}}>예매하기</a>
                                    <Link to={`sallybox/movies/${movie.movieId}`} className="btn_col3e ty3">상세정보</Link>
                                </div>
                            </div>
                            }
                        </div>
                        <div className="btm_infoe">
                            <strong className="tit_infoe">
                                <span className="ageRating">
                                    <img src={getAgeRatingImg(movie.certification)} alt={movie.certification}/>
                                </span>
                            {movie.title}</strong>
                            <span className="sub_info1e"><span className="timee blacktypee" style={{marginLeft: '0'}}><span className="robotoe">{movie.runtime}</span>분</span></span>
                        </div>
                    </li>
                    ))};   
            </ul>   
        </>
    );
};

export default NowMovies;