package com.json.db.jsondb.main;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import com.json.db.jsondb.service.CinemaService;
import com.json.db.jsondb.service.SeatsService;
import com.json.db.jsondb.service.TheaterSeatLinkService;
import com.json.db.jsondb.service.TheaterService;

@SpringBootApplication
@ComponentScan(basePackages = "com.json.db.jsondb")
@MapperScan("com.json.db.jsondb.mapper")
public class CinemaApplication implements CommandLineRunner{

    @Autowired
    private CinemaService cinemaService;
    // @Autowired
    // private SeatsService seatsService;
    // @Autowired
    // private TheaterService theaterService;
    // @Autowired
    // private TheaterSeatLinkService theaterSeatLinkService;


    public static void main(String[] args) {
        SpringApplication.run(CinemaApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        cinemaService.insertCinemasFromJson();
    }
    // @Override
    // public void run(String... args) throws Exception {
    //     seatsService.insertSeatsFromJson();
    // }
    // }
    // @Override
    // public void run(String... args) throws Exception {
    //     theaterService.insertTheatersFromJson();
    // }
    // @Override
    // public void run(String... args) throws Exception {
    //     theaterSeatLinkService.insertLinkFromJson();
    // }
    
}

