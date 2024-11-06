package com.example.demo.DTO.JY;

import lombok.Data;
import java.time.ZonedDateTime;

@Data
public class ReviewsDTO {
    private int reviewId;          // 리뷰 번호
    private int movieId;           // 영화 번호
    private int userId;            // 회원 번호
    private String nickname;        // 회원 닉네임
    private int rating;             // 리뷰 별점
    private String reviewText;      // 리뷰 내용
    private ZonedDateTime createdAt;    // 작성 날짜 --1103
    private int liked;              // 리뷰 추천 수
}
