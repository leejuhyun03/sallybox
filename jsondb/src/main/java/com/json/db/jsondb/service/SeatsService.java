package com.json.db.jsondb.service;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.json.db.jsondb.dto.SeatsDTO;
import com.json.db.jsondb.mapper.SeatsMapper;

@Service
public class SeatsService {
    
    @Autowired
    private SeatsMapper seatsMapper;

    public void insertSeatsFromJson() {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            InputStream inputStream =  getClass().getClassLoader().getResourceAsStream("data/Seats4.json");
            if (inputStream == null) {
                throw new IOException("Resource not found: data/Seats4.json");
            }
            List<SeatsDTO> seats = objectMapper.readValue(inputStream, new TypeReference<List<SeatsDTO>>() {});
            for (SeatsDTO seat : seats) {
                seatsMapper.insertSeats(seat);
            }
            System.out.println("데이터가 성공적으로 삽입되었습니다.");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
