package com.json.db.jsondb.service;


import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.json.db.jsondb.dto.CinemaDTO;
import com.json.db.jsondb.mapper.CinemaMapper;

@Service
public class CinemaService {

    @Autowired
    private CinemaMapper cinemaMapper;

    public void insertCinemasFromJson() {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            InputStream inputStream =  getClass().getClassLoader().getResourceAsStream("data/Cinema.json");
            if (inputStream == null) {
                throw new IOException("Resource not found: data/Cinema.json");
            }
            List<CinemaDTO> cinemas = objectMapper.readValue(inputStream, new TypeReference<List<CinemaDTO>>() {});
            for (CinemaDTO cinema : cinemas) {
                cinemaMapper.insertCinema(cinema);
            }
            System.out.println("데이터가 성공적으로 삽입되었습니다.");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
}
