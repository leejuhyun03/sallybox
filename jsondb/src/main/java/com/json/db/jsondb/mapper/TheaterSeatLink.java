package com.json.db.jsondb.mapper;

import org.apache.ibatis.annotations.Mapper;
import com.json.db.jsondb.dto.TheaterSeatLinkDTO;

@Mapper
public interface TheaterSeatLink {
    public void insertLink(TheaterSeatLinkDTO theaterSeatLinkDTO);
}
