package com.example.demo.service;

import java.util.*;
import com.example.demo.DTO.JH.CinemaDTO;
import com.example.demo.DTO.JY.MovieDTO;
import com.example.demo.DTO.JY.NowMovieDTO;
import com.example.demo.DTO.JY.ReviewsDTO;
import com.example.demo.DTO.JH.SchedulesTheaterDTO;

public interface MovieService {
   
    // 영화 저장 메소드
    void saveMovies(MovieDTO movie);

    // 제목으로 영화 검색 메소드
    List<MovieDTO> searchMoviesByTitle(String title);
  
    //react에 json에 genreids가 null인거 해결하기 위해
    MovieDTO findMovieById(int movieId);

    // 위시리스트 기능 메서드 추가
    boolean isMovieInWishlist(int userId, int movieId);  // 위시리스트 상태 확인
    boolean toggleWishlist(int userId, int movieId, String genre_ids);     // 위시리스트 추가/삭제 토글

    // 리뷰 메소드
    void saveReview(ReviewsDTO reviewsDTO); // 리뷰 저장
    void updateReview(ReviewsDTO reviewsDTO); // 리뷰 수정
    void deleteReview(int reviewId, int userId); // 리뷰 삭제 (추천 삭제 포함)
    List<ReviewsDTO> getReviewsByMovieId(int movieId); // 영화 ID로 리뷰 목록 가져오기

    // 리뷰 추천 기능 메소드
    void toggleLikeReview(int reviewId, int userId); // 추천 토글 (추가/삭제)
    int getLikesCount(int reviewId); // 리뷰의 추천 수 계산

    // 예매 페이지 관련 메소드 추가
    CinemaDTO getCinemaInfojy(int cinema_id); // 영화관 정보 조회
    List<SchedulesTheaterDTO> getSchedulesTheaterjy(int cinema_id); // 상영 일정 조회
    Map<String, List<SchedulesTheaterDTO>> groupCinemaSchedules(List<SchedulesTheaterDTO> schedules); // 
    
    //상영 일정 그룹화
    List<CinemaDTO> getCinemasByRegion(String region); //특정 지역의 영화관 목록을 가져오는 메서드
    
    //현재 상영작 20개
    NowMovieDTO getNowMovieById(int movieId);

    //movieid 가 상영작에 있는지 없는지 존재 여부
    boolean checkIfMovieExists(int movieId);

}

