package com.example.demo.DTO.JY;

import lombok.Data;

import java.sql.Timestamp;


@Data
public class WishlistDTO {
    private int userId;   // 유저 ID (임시로 설정, 로그인 기능 추가 시 대체)
    private int movieId;  // 영화 ID
    private String genreIds;
    private Timestamp createdAt;  // 영화가 위시리스트에 추가된 시간
}