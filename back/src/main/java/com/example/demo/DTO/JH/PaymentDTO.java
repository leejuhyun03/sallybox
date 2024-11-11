package com.example.demo.DTO.JH;

import java.sql.Timestamp;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentDTO {
    private int paymentId;
    private int userId;
    private long bookingNum;
    private String paymentMethod;
    private int price;
    private String paymentDate; 
    private int pointUsage;
}
