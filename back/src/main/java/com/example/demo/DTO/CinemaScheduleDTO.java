package com.example.demo.DTO;

import lombok.Getter;
import lombok.Setter;
import java.util.*;

@Getter
@Setter
public class CinemaScheduleDTO {
    
    private CinemaDTO cinemaDTO;
    private Map<String,List<SchedulesTheaterDTO>> schedules;

    public CinemaScheduleDTO(CinemaDTO cinema, Map<String, List<SchedulesTheaterDTO>> schedules) {
        this.cinemaDTO = cinema;
        this.schedules = schedules;
    }

}
