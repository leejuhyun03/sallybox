package com.example.demo.config;

import org.springframework.stereotype.Component;

import com.example.demo.mapper.SqlMapper;

import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;

@Component
public class TimeZoneInitializer {

    @Autowired
    private SqlMapper sqlMapper;

    @PostConstruct
    public void init() {
        sqlMapper.setSessionTimeZone();
    }
}
