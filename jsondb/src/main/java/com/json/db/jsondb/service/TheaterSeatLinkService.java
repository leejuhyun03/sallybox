<<<<<<< HEAD
package com.json.db.jsondb.service;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.json.db.jsondb.dto.TheaterSeatLinkDTO;
import com.json.db.jsondb.mapper.TheaterSeatLink;

@Service
public class TheaterSeatLinkService {
    
    @Autowired
    private TheaterSeatLink theaterSeatLink;

    public void insertLinkFromJson() {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            InputStream inputStream =  getClass().getClassLoader().getResourceAsStream("data/Link.json");
            if (inputStream == null) {
                throw new IOException("Resource not found: data/Link.json");
            }
            List<TheaterSeatLinkDTO> links = objectMapper.readValue(inputStream, new TypeReference<List<TheaterSeatLinkDTO>>() {});
            for (TheaterSeatLinkDTO link : links) {
                theaterSeatLink.insertLink(link);
            }
            System.out.println("데이터가 성공적으로 삽입되었습니다.");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
=======
package com.json.db.jsondb.service;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.json.db.jsondb.dto.TheaterSeatLinkDTO;
import com.json.db.jsondb.mapper.TheaterSeatLink;

@Service
public class TheaterSeatLinkService {
    
    @Autowired
    private TheaterSeatLink theaterSeatLink;

    public void insertLinkFromJson() {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            InputStream inputStream =  getClass().getClassLoader().getResourceAsStream("data/Link.json");
            if (inputStream == null) {
                throw new IOException("Resource not found: data/Link.json");
            }
            List<TheaterSeatLinkDTO> links = objectMapper.readValue(inputStream, new TypeReference<List<TheaterSeatLinkDTO>>() {});
            for (TheaterSeatLinkDTO link : links) {
                theaterSeatLink.insertLink(link);
            }
            System.out.println("데이터가 성공적으로 삽입되었습니다.");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
>>>>>>> 963c018b77b364d1a5310fbcfa99d105fdfe1969
