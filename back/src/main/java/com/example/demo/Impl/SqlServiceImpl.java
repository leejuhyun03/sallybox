package com.example.demo.Impl;

// import java.util.List;
// import java.util.Map;
import java.util.stream.Collectors;
import java.util.*;
import java.time.format.DateTimeFormatter;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.CinemaDTO;
import com.example.demo.DTO.SchedulesTheaterDTO;
import com.example.demo.DTO.SeatsDTO;
import com.example.demo.mapper.SqlMapper;
import com.example.demo.service.SqlService;

@Service
public class SqlServiceImpl implements SqlService{

    @Autowired
    private SqlMapper sqlMapper;

    @Override
    public CinemaDTO getCinemaInfo(int cinema_id) throws Exception {
        return sqlMapper.getCinemaInfo(cinema_id);
    }

    @Override
    public List<SchedulesTheaterDTO> getSchedulesTheater(int cinema_id) throws Exception {
        
        return sqlMapper.getSchedulesTheater(cinema_id);
    }

    @Override
    public Map<String, List<SchedulesTheaterDTO>> groupCinemaSchedules(List<SchedulesTheaterDTO> schedules)
            throws Exception {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        return schedules.stream().collect(Collectors.groupingBy(schedule -> {
            LocalDate localDate = schedule.getCreated().toInstant().atZone(
                java.time.ZoneId.systemDefault()).toLocalDate();
                return localDate.format(formatter);
        }));

    }//key는 created,value = created에 속하는 ScheduleDTO의 객체들의 List

    @Override
    public List<SeatsDTO> getSeatsbyTheaterId(int theater_id, int schedule_id) throws Exception {
        Map<String,Object> params = new HashMap<>();
        params.put("theater_id", theater_id);
        params.put("schedule_id", schedule_id);
        return sqlMapper.getSeatsbyTheaterId(params);
    }

    

    


}
