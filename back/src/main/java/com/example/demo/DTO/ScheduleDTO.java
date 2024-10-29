package com.example.demo.DTO;

import lombok.Getter;
import lombok.Setter;
import java.sql.Date;

@Getter
@Setter
public class ScheduleDTO { //영화 스케쥴 데이터 전송 객체
    
    private int scheduleId; //일정 고유 식별자
    private int cinemaId; //영화관 외래 키
    private int theaterId; //상영관 외래 키
    private int movieId; //영화 외래 키
    private Date startTime; //일정 시작 시간
    private Date endTime; //일정 종료 시간
    private Date created; //일정 생성 날짜
    
}
