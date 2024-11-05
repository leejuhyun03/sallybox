package com.example.demo.DTO.JH;

import lombok.Getter;
import lombok.Setter;
import java.sql.Date;

@Getter
@Setter
public class MovieDTO {
    
    private int movieId;
    private String movieTitle;
    private String posterURL;
    private Date releaseDate;
    private int runtime;
    private String ageRating;
    private int viewCount;
    
}
