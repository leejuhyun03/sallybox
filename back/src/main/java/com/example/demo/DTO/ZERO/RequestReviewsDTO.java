package com.example.demo.DTO.ZERO;

import lombok.Data;

@Data
public class RequestReviewsDTO {
    private int movie_id;
    private String reviewContent;
    private int userId;
    private int rating;
    private String userNickName;

}
