package com.json.db.jsondb.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CinemaDTO {
    
    private Integer cinema_id;
    private String name;
    private String location;
    private Integer theater;
    private Integer seats;
    private char parking; 

}
