<<<<<<< HEAD
package com.example.demo.service;

import java.util.*;

import org.apache.ibatis.annotations.Param;

import com.example.demo.DTO.JH.CinemaDTO;
import com.example.demo.DTO.JH.SchedulesTheaterDTO;
import com.example.demo.DTO.JH.SeatsDTO;
import com.example.demo.DTO.JY.InquiryRequest;
import com.example.demo.DTO.KH.CustomDTO;

public interface SqlService {
    
    public CinemaDTO getCinemaInfo(int cinemaId) throws Exception;
    // public List<ScheduleDTO> getSchedules(int cinemaId) throws Exception;
    
    public List<SchedulesTheaterDTO> getSchedulesTheater(int cinema_id) throws Exception;

    public Map<String,List<SchedulesTheaterDTO>> groupCinemaSchedules(List<SchedulesTheaterDTO> schedules) throws Exception;
    
    public List<SeatsDTO> getSeatsbyTheaterId(int theater_id,int schedule_id) throws Exception;

    // 강현 service
    CustomDTO findByEmail(String email);
    CustomDTO findByName(String name);
    String maskEmail(String email);
    String login(String email, String password); // 로그인 메서드 추가
    void sendSms(String to, String cerNum); // 인증번호
    void updatePassword(@Param("email") String email, @Param("password") String password); // 새로운 비밀번호

    // 주용 service
    void saveInquiry(InquiryRequest inquiryRequest);
    List<InquiryRequest> getAllInquiries();
    void deleteInquiryByTitle(String title); // 제목으로 삭제 메서드 추가
    void updateInquiry(InquiryRequest inquiryRequest); // 수정 메서드 추가
}
=======
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
    CustomDTO findByEmail(String email);
    CustomDTO findByName(String name);
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
}
>>>>>>> 994e26a085e7990e950add20e7965335133f8c85
