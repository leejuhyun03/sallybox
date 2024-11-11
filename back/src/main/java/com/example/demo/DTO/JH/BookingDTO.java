package com.example.demo.DTO.JH;

import lombok.Getter;
import lombok.Setter;
import java.sql.Date;

@Getter
@Setter
public class BookingDTO {
    
    private int bookingId;
    private int userId;
    private int scheduleId;
    private int seatId;
    private Date bookingDate;
    private String peopleType; 
    private Long bookingNum;
    private Integer movieId;
    
}
