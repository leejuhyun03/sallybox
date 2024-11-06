package com.json.db.jsondb.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.json.db.jsondb.dto.TheaterDTO;

@Mapper
public interface TheaterMapper {
    public void insertTheater(TheaterDTO theaterDTO);
    
}
