package com.example.demo.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CinemaDTO {
    
    private int cinema_id;
    private String name;
    private String location;
    private int theater;
    private int seats;
    private char parking;
    
}
