package com.json.db.jsondb.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.json.db.jsondb.dto.SeatsDTO;

@Mapper
public interface SeatsMapper {
    
    public void insertSeats(SeatsDTO seatsDTO);

}
