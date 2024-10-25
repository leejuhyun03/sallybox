package com.example.demo.service;

import com.example.demo.DTO.CinemaDTO;
import com.example.demo.DTO.SchedulesTheaterDTO;
import com.example.demo.DTO.SeatsDTO;

import java.util.*;

public interface SqlService {
    
    public CinemaDTO getCinemaInfo(int cinemaId) throws Exception;
    // public List<ScheduleDTO> getSchedules(int cinemaId) throws Exception;
    
    public List<SchedulesTheaterDTO> getSchedulesTheater(int cinema_id) throws Exception;

    public Map<String,List<SchedulesTheaterDTO>> groupCinemaSchedules(List<SchedulesTheaterDTO> schedules) throws Exception;
    
    public List<SeatsDTO> getSeatsbyTheaterId(int theater_id,int schedule_id) throws Exception;

}
