package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;

import com.example.demo.DTO.CinemaDTO;
import com.example.demo.DTO.CinemaScheduleDTO;
import com.example.demo.DTO.SchedulesTheaterDTO;
import com.example.demo.service.SqlService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
public class AllController {
    
    @Autowired
    private SqlService sqlService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/sallybox/cinema/{id}")
    public CinemaScheduleDTO getSchedules(@PathVariable("id") int cinema_id) throws Exception{

        CinemaDTO cinemaDTO = sqlService.getCinemaInfo(cinema_id);

        List<SchedulesTheaterDTO> schedules = sqlService.getSchedulesTheater(cinema_id);     

        Map<String,List<SchedulesTheaterDTO>> scheduleMap = sqlService.groupCinemaSchedules(schedules);

        // null 값 검사
        if (cinemaDTO == null) {
            throw new IllegalStateException("cinemaDTO is null for cinema ID: " + cinema_id);
        }
        
        if (scheduleMap == null) {
            throw new IllegalStateException("scheduleMap is null for cinema ID: " + cinema_id);
        }

        return new CinemaScheduleDTO(cinemaDTO,scheduleMap);
    }
    
}
