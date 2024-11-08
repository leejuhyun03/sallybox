package com.example.demo.DTO.SH;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
//선호
@Getter
@Setter
@ToString(includeFieldNames = true)
public class MyMovieDTO {

    private int movie_id;
    private String overview;
    private String poster_path;
    private String title;
    private String certification;
    
    
}


