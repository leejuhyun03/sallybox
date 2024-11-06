package com.example.demo.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.demo.DTO.JH.CinemaDTO;
import com.example.demo.DTO.JH.SchedulesTheaterDTO;
import com.example.demo.DTO.JH.SeatsDTO;
import com.example.demo.DTO.KH.CustomDTO;
import com.example.demo.DTO.KH.NowMoviesDTO;
import com.example.demo.DTO.ZERO.MovieDTO;
import com.example.demo.DTO.ZERO.NowMovieDTO;
import com.example.demo.DTO.ZERO.ReviewsDTO;

import java.util.*;

@Mapper
public interface SqlMapper {

    public CinemaDTO getCinemaInfo(int cinema_id) throws Exception;

    // public List<ScheduleDTO> getSchedules(int cinemaId) throws Exception;

    public List<SchedulesTheaterDTO> getSchedulesTheater(int cinema_id) throws Exception;

    public List<SeatsDTO> getSeatsbyTheaterId(Map<String, Object> params) throws Exception;

    // 강현 Mapper
    CustomDTO findByEmail(String email);
    CustomDTO findByName(String name);
    void updatePassword(@Param("email") String email, @Param("password") String password);
    List<NowMoviesDTO> getNowMovies();
    List<NowMoviesDTO> getReccommendMovies();
    List<NowMoviesDTO> getClassicMovies();

    //지영 Mapper
    // 시간대 설정 메서드 추가
    void setSessionTimeZone();
  
    // Movie 데이터를 삽입하는 메서드
    void insertMovie(MovieDTO movie);

    // ID로 영화를 검색하는 메서드
    MovieDTO findById(int movieId);

    // 제목으로 영화를 검색하는 메서드
    List<MovieDTO> findMoviesByTitle(String title);

    MovieDTO findMovieById(int movieId);

    // 위시리스트 관련 메서드
    int checkWishlist(@Param("userId") int userId, @Param("movieId") int movieId);  
    void insertWishlist(@Param("userId") int userId, @Param("movieId") int movieId, @Param("genreIds") String genreIds); 
    void deleteWishlist(@Param("userId") int userId, @Param("movieId") int movieId); 

    
    // 리뷰 관련 메서드
    void insertReview(ReviewsDTO reviewsDTO); // 리뷰 저장
    void updateReview(ReviewsDTO reviewsDTO); // 리뷰 수정
    void deleteReview(@Param("review_id") int reviewId, @Param("user_id") int userId); // 리뷰 삭제
    void deleteLikesByReviewId(@Param("review_id") int reviewId); // 리뷰에 대한 추천 삭제
    List<ReviewsDTO> findReviewsByMovieId(@Param("movieId") int movieId); // 영화 ID로 리뷰 목록 가져오기

   

    // 추천 관련 메서드
    int isReviewLiked(@Param("review_id") int reviewId, @Param("user_id") int userId); // 추천 여부 확인
    void addLike(@Param("review_id") int reviewId, @Param("user_id") int userId); // 추천 추가
    void removeLike(@Param("review_id") int reviewId, @Param("user_id") int userId); // 추천 삭제
    int countReviewLikes(@Param("review_id") int reviewId); // 추천수 가져오기


    //예매 관련 메서드
    CinemaDTO getCinemaInfojy(int cinema_id);
    List<SchedulesTheaterDTO> getSchedulesTheaterjy(int cinema_id);
    
    // 특정 지역의 영화관 목록을 가져오는 메서드
    List<CinemaDTO> getCinemasByRegion(@Param("region") String region);

    //상영작 20개
    NowMovieDTO findNowMovieById(int movieId);

    // movie_id가 nowmovies 테이블에 존재하는지 확인하는 메서드
    Integer existsByMovieId(int movieId); // XML에 정의된 쿼리를 사용하므로 어노테이션 불필요
}
