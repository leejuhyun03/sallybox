package com.example.demo.DTO;

import lombok.Getter;
import lombok.Setter;
import java.sql.Date;

@Getter
@Setter
public class ScheduleDTO {
    
    private int scheduleId;
    private int cinemaId;
    private int theaterId;
    private int movieId;
    private Date startTime;
    private Date endTime;
    private Date created;
    
}
