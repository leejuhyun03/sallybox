package com.example.demo.service;

import java.util.*;

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
import com.example.demo.DTO.SH.UserUpdateDTO;

public interface SqlService {
    
    public CinemaDTO getCinemaInfo(int cinemaId) throws Exception;
    // public List<ScheduleDTO> getSchedules(int cinemaId) throws Exception;
    
    public List<SchedulesTheaterDTO> getSchedulesTheater(int cinema_id) throws Exception;

    public Map<String,List<SchedulesTheaterDTO>> groupCinemaSchedules(List<SchedulesTheaterDTO> schedules) throws Exception;
    
    public List<SeatsDTO> getSeatsbyTheaterId(int theater_id,int schedule_id) throws Exception;

    public Integer getPoints(int user_id) throws Exception;

    public void insertBooking(BookingDTO bookingDTO);

    public double getGrade(int userId);

    public void updatePoints(int userId,int pointUsage,int totalPrice);

    public void insertPayment(PaymentDTO paymentDTO);

    // 강현 service
    boolean findPassword(String email, String name);
    CustomDTO findByEmail(String email);
    CustomDTO findByName(String name, String phoneNumber);
    String maskEmail(String email);
    String login(String email, String password); // 로그인 메서드 추가
    void sendSms(String to, String cerNum); // 인증번호
    void updatePassword(@Param("email") String email, @Param("password") String password); // 새로운 비밀번호
    List<NowMoviesDTO> getNowMovies();
    List<NowMoviesDTO> getReccommendMovies();
    List<NowMoviesDTO> getClassicMovies();

    // 주용 service
    void saveInquiry(InquiryRequest inquiryRequest);
    List<InquiryRequest> getAllInquiries();
    void deleteInquiryByTitle(String title); // 제목으로 삭제 메서드 추가
    void updateInquiry(InquiryRequest inquiryRequest); // 수정 메서드 추가

    // 선호 service
    public CustomerDTO getCustomerInfo(int userId) throws Exception;
    public List<MyMovieDTO> getWishlistMovies(int userId) throws Exception;

    public boolean removeFromWishlist(int userId, int movieId) throws Exception;

    public boolean deactivateUser(int userId);

    public ProfileDTO updateNickname(int userId, String nickname);

    public boolean updateCustomer(UserUpdateDTO userUpdateDto);

    public List<MyBookingDTO> getBookingsByUserId(int userId);

    public List<MyPayDTO> getPaymentsByUserId(int userId);

    //결제취소
    public void cancelBooking(int userId, Long bookingNum, int pointUsage) throws Exception;
}
