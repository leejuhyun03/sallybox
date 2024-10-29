package com.json.db.jsondb.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SeatsDTO {
    
    private Integer seat_id;
    private Integer link_id;
    private String seat_row;
    private Integer num;
    private String seat_type;
    
}
