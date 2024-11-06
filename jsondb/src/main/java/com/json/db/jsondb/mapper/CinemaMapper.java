package com.json.db.jsondb.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.json.db.jsondb.dto.CinemaDTO;

@Mapper
public interface CinemaMapper {
    
    public void insertCinema(CinemaDTO cinemaDTO);

}
