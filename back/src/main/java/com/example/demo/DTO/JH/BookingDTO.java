package com.example.demo.DTO.JH;

import lombok.Getter;
import lombok.Setter;
import java.sql.Date;

@Getter
@Setter
public class BookingDTO {
    
    private int bookingId;
    private int userId;
    private int movieId;
    private int cinemaId;
    private Date bookingDate;
    private Date showTime; //상영시간
    private String seats; //좌석 정보 = seatId

}
