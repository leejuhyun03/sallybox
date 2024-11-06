package com.example.demo.DTO.KH;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NowMoviesDTO {
    
    private int movieId;
    private String posterPath;
    private String title;
    private String voteAverage;
    private String certification;
}
