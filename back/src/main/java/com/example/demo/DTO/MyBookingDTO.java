package com.example.demo.DTO;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MyBookingDTO {

    private int bookingId;
    private Timestamp bookingDate;
    private Long bookingNum;

    private String movieTitle;
    private String posterPath;

    private String cinemaName;
    private int screenNo;

    private Timestamp startTime;
    private Timestamp endTime;
    private String peopleDetails;// "성인3, 청소년2" 형식의 문자열
    private String seatNumbers; // "H15, H16" 형식의 문자열
}
