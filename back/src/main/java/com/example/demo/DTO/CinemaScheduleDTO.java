package com.example.demo.DTO;

import lombok.Getter;
import lombok.Setter;
import java.util.*;

@Getter
@Setter
public class CinemaScheduleDTO {
    
    private CinemaDTO cinemaDTO; //영화관 데이터 전송 객체(DTO)
    private Map<String,List<SchedulesTheaterDTO>> schedules;
    /**
     * 영화관의 각 상영관 일정 맵
     * 키: 상영관 ID (String)
     * 값: SchedulesTheaterDTO 객체 목록
     */

    public CinemaScheduleDTO(CinemaDTO cinema, Map<String, List<SchedulesTheaterDTO>> schedules) {
        this.cinemaDTO = cinema;
        this.schedules = schedules;
    }
    /**
     * 영화관 일정 데이터 전송 객체(DTO) 생성자
     * @param cinema 영화관 데이터 전송 객체(DTO)
     * @param schedules 영화관의 각 상영관 일정 맵
     */

}
