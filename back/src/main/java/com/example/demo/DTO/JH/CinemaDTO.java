package com.example.demo.DTO.JH;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CinemaDTO {
    
    private int cinema_id; //영화관 고유 식별자
    private String name; //영화관 이름
    private String location; //영화관 위치
    private int theater; //영화관에 있는 상영관 수
    private int seats; //영화관의 총 좌석 수
    private char parking; //주차 가능 여부
    
    private String title;
    private String poster_path; //주현 - movie 정보 추가
}
