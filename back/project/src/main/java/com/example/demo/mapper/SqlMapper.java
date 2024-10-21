package com.example.demo.mapper;

import org.apache.ibatis.annotations.Mapper;
import java.util.*;

import com.example.demo.DTO.CinemaDTO;
import com.example.demo.DTO.SchedulesTheaterDTO;

@Mapper
public interface SqlMapper {

    public CinemaDTO getCinemaInfo(int cinema_id) throws Exception;

    // public List<ScheduleDTO> getSchedules(int cinemaId) throws Exception;

    public List<SchedulesTheaterDTO> getSchedulesTheater(int cinema_id) throws Exception;

}
