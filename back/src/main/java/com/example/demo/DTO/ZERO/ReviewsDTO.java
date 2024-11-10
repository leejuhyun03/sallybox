package com.example.demo.DTO.ZERO;
import lombok.Data;
import java.time.ZonedDateTime;

@Data
public class ReviewsDTO {
    private int reviewId;          // 리뷰 번호
    private int movieId;           // 영화 번호
    private int userId;            // 회원 번호
    private String nickname; // nickname 필드 추가
    private int rating;             // 리뷰 별점
    private String reviewText;      // 리뷰 내용
    private ZonedDateTime createdAt;    // 작성 날짜 --1103
    //회원 닉네임 users테이블에서 참조하는걸로 할거임
}
