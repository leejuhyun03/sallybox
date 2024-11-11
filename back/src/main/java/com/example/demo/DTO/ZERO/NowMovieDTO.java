package com.example.demo.DTO.ZERO;

import lombok.Data;
import java.util.List;

@Data
public class NowMovieDTO { // 현재 상영작 20개
    private int movieId;
    private String genreIdsString; // CSV 형식의 genre IDs를 저장하는 필드
    private List<Integer> genreIds; // 변환된 genre IDs 리스트
    private String originalLanguage;
    private String overview;
    private double popularity;
    private String posterPath;
    private String releaseDate;
    private String title;
    private double voteAverage;
    private String videos;
    private int runtime;
    private String certification;
}
