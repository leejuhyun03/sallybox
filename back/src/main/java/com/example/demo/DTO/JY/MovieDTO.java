package com.example.demo.DTO.JY;


import java.util.List;
import lombok.Data;

@Data
public class MovieDTO {
    private List<Integer> genreIds; // JSON에서 받아오는 장르 ID 리스트  
    private String genreIdsString;  // CSV 형식의 장르 ID 문자열
    private int movieId;//이거 바꿈
    private String originalLanguage;    
    private String overview;
    private Double popularity;
    private String posterPath;
    private String releaseDate;
    private String title;   
    private Double voteAverage;

    //추가
    private String videos; 
    private String runtime;  //int table에 number
    private String certification; 
}

