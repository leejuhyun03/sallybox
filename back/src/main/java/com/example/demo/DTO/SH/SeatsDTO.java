package com.example.demo.DTO.SH;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SeatsDTO {
    
    private Integer seat_id;
    private Integer theater_id;
    private String seat_row;
    private Integer num;
    private String seat_type;
    private String status;
    
}
