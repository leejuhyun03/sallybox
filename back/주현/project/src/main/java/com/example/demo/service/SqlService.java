package com.example.demo.service;

import com.example.demo.DTO.CinemaDTO;
import com.example.demo.DTO.SchedulesTheaterDTO;

import java.util.*;

public interface SqlService {
    
    public CinemaDTO getCinemaInfo(int cinemaId) throws Exception;
    // public List<ScheduleDTO> getSchedules(int cinemaId) throws Exception;
    
    public List<SchedulesTheaterDTO> getSchedulesTheater(int cinema_id) throws Exception;

    public Map<String,List<SchedulesTheaterDTO>> groupCinemaSchedules(List<SchedulesTheaterDTO> schedules) throws Exception;
    
    
}
