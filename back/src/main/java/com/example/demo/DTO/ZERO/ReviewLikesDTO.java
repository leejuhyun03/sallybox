package com.example.demo.DTO.ZERO;
import lombok.Data;
import java.sql.Timestamp;

@Data
public class ReviewLikesDTO {
    private int likeId;          // 추천 고유 식별자
    private int reviewId;        // 리뷰 번호 (외래 키)
    private int userId;          // 사용자 번호 (외래 키)
    private Timestamp createdAt; // 추천 날짜
}
