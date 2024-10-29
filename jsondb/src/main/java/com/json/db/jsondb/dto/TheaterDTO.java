package com.json.db.jsondb.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TheaterDTO {
    
    private Integer theater_id;
    private Integer cinema_id;
    private Integer screen_no;
    private String theater_type;
    private Integer seats;
    private Integer link_id;

}
