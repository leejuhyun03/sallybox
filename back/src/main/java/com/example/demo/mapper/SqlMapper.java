package com.example.demo.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.demo.DTO.JH.CinemaDTO;
import com.example.demo.DTO.JH.SchedulesTheaterDTO;
import com.example.demo.DTO.JH.SeatsDTO;
import com.example.demo.DTO.KH.CustomDTO;
import com.example.demo.DTO.KH.NowMoviesDTO;

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
}
