package com.example.demo.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.demo.DTO.JH.BookingDTO;
import com.example.demo.DTO.JH.CinemaDTO;
import com.example.demo.DTO.JH.PaymentDTO;
import com.example.demo.DTO.JH.SchedulesTheaterDTO;
import com.example.demo.DTO.JH.SeatsDTO;
import com.example.demo.DTO.JY.InquiryRequest;
import com.example.demo.DTO.KH.CustomDTO;
import com.example.demo.DTO.KH.NowMoviesDTO;
import com.example.demo.DTO.SH.CustomerDTO;
import com.example.demo.DTO.SH.MyBookingDTO;
import com.example.demo.DTO.SH.MyMovieDTO;
import com.example.demo.DTO.SH.MyPayDTO;
import com.example.demo.DTO.SH.ProfileDTO;
import com.example.demo.DTO.SH.UserDeactivationDTO;
import com.example.demo.DTO.SH.UserUpdateDTO;
import com.example.demo.DTO.ZERO.MovieDTO;
import com.example.demo.DTO.ZERO.NowMovieDTO;
import com.example.demo.DTO.ZERO.ReviewsDTO;

import java.util.*;

@Mapper
public interface SqlMapper {

    public CinemaDTO getCinemaInfo(int cinema_id) throws Exception;

    public List<SchedulesTheaterDTO> getSchedulesTheater(int cinema_id) throws Exception;

    public List<SeatsDTO> getSeatsbyTheaterId(Map<String, Object> params) throws Exception;

    public Integer getPoints(int user_id) throws Exception;

    public void insertBooking(BookingDTO bookingDTO);

    public String getGrade(int userId);

    public void updatePoints(Map<String,Object> params);

    public void insertPayment(PaymentDTO paymentDTO);

    // 강현 Mapper
    CustomDTO findPassword(@Param("email") String email, @Param("name") String name);
    CustomDTO findByEmail(String email);
    CustomDTO findByName(@Param("name") String name, @Param("phoneNumber") String phoneNumber);
    void updatePassword(@Param("email") String email, @Param("password") String password);
    List<NowMoviesDTO> getNowMovies();
    List<NowMoviesDTO> getReccommendMovies();
    List<NowMoviesDTO> getClassicMovies();

    // 주용 Mapper 
    void insertInquiry(InquiryRequest inquiry);
    List<InquiryRequest> selectAllInquiries();
    void deleteInquiryByTitle(String title); // 제목으로 삭제 메서드 추가
    void updateInquiry(InquiryRequest inquiryRequest); // 수정 메서드 추가

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

    /*1108 
    // 리뷰 관련 메서드
    void insertReview(ReviewsDTO reviewsDTO); // 리뷰 저장
    void updateReview(ReviewsDTO reviewsDTO); // 리뷰 수정
    void deleteReview(@Param("review_id") int reviewId, @Param("user_id") int userId); // 리뷰 삭제
    void deleteLikesByReviewId(@Param("review_id") int reviewId); // 리뷰에 대한 추천 삭제
    List<ReviewsDTO> findReviewsByMovieId(@Param("movieId") int movieId); // 영화 ID로 리뷰 목록 가져오기
    */
    // 리뷰 관련 메서드
    void saveReview(ReviewsDTO reviewsDTO); // 리뷰 저장
    void updateReview(ReviewsDTO reviewsDTO); // 리뷰 수정
    void deleteReview(@Param("review_id") int reviewId, @Param("user_id") int userId); // 리뷰 삭제
    List<ReviewsDTO> findReviewsByMovieId(@Param("movieId") int movieId); // 영화 ID로 리뷰 목록 가져오기
    int checkBookingExists(@Param("userId") int userId, @Param("movieId") int movieId);
    // 리뷰의 작성자(user_id)를 가져오는 메서드 추가 - 본인 리뷰인지 확인
    Integer getReviewOwner(@Param("review_id") int reviewId); // 수정했음!!


    //예매 관련 메서드
    CinemaDTO getCinemaInfojy(int cinema_id);
    List<SchedulesTheaterDTO> getSchedulesTheaterjy(int cinema_id);
    
    // 특정 지역의 영화관 목록을 가져오는 메서드
    List<CinemaDTO> getCinemasByRegion(@Param("region") String region);

    //상영작 20개
    NowMovieDTO findNowMovieById(int movieId);

    // movie_id가 nowmovies 테이블에 존재하는지 확인하는 메서드
    Integer existsByMovieId(int movieId); // XML에 정의된 쿼리를 사용하므로 어노테이션 불필요

    //선호 Mapper
    public CustomerDTO getCustomerInfo(int userId) throws Exception;

    public List<MyMovieDTO> getWishlistMovies(int userId) throws Exception;

    public int deleteFromWishlist(@Param("userId") int userId, @Param("movieId") int movieId);
    
    public int deactivateUser(UserDeactivationDTO dto);

    public int updateNickname(ProfileDTO profileDTO);

    //회원정보수정
    public int updateCustomer(UserUpdateDTO userUpdateDTO);

    //예매 내역 띄우기
    public List<MyBookingDTO> getBookingsByUserId(@Param("userId") int userId);

    public List<MyPayDTO> getPaymentsByUserId(int userId);

    public void deleteBooking(Long bookingNum);
    public void deletePayment(Long bookingNum);
    public void updateCustomerPoint(@Param("userId") int userId,@Param("pointUsage") int pointUsage);

}
