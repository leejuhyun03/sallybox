package com.example.demo.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.demo.DTO.JH.CinemaDTO;
import com.example.demo.DTO.JH.SchedulesTheaterDTO;
import com.example.demo.DTO.JH.SeatsDTO;
import com.example.demo.DTO.JY.InquiryRequest;
import com.example.demo.DTO.KH.CustomDTO;

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

    // 주용 Mapper 

       void insertInquiry(InquiryRequest inquiry);
    List<InquiryRequest> selectAllInquiries();
    void deleteInquiryByTitle(String title); // 제목으로 삭제 메서드 추가
    void updateInquiry(InquiryRequest inquiryRequest); // 수정 메서드 추가

}
