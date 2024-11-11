import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import MovieDetail from './MovieDetail'; // 세부 영화 정보
import MoviePage from './MoviePage';

const Movies = () => {
  const { movie_id } = useParams(); // URL에서 movie_id 가져오기
  const [movieDetails, setMovieDetails] = useState(null); // 영화 기본 정보 저장
  const [credits, setCredits] = useState(null); // 출연진 정보 저장

  useEffect(() => {
    const loadMovieData = async () => {
      try {
        // 영화 상세 정보 가져오기
        const movieDetailsResponse = await axios.get(`http://localhost:8085/sallybox/movies/${movie_id}`);
        setMovieDetails(movieDetailsResponse.data);

        // // 출연진 정보 가져오기  -> 26없어도 되는지 확인할려고 함
        // const creditsResponse = await axios.get(`http://localhost:8085/sallybox/movies/${movie_id}/credits`);
        // setCredits(creditsResponse.data);
      } catch (error) {
        console.error("Error loading movie data:", error);
      }
    };

    if (movie_id) {
      loadMovieData(); // movie_id가 있을 때만 데이터 로드
    }
  }, [movie_id]);

  return (
    <div>

      {/* movieDetails가 있을 때만 MoviePage 또는 MovieDetail 렌더링 */}
      {movieDetails && (
        <>
          <div style={{display:'flex', justifyContent:'center', alignContent:'center'}}>
            <MoviePage movie={movieDetails} />
            {/* MovieDetail은 MoviePage 내에서 처리되거나 여기에 넣을 수 있음 */}
            {/* <MovieDetail movie_id={movie_id} credits={credits} /> */}
          </div>
        </>
      )}
    </div>
  );
};

export default Movies;
