package com.example.demo.DTO.JH;

import java.util.Date;

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
    private Date paymentDate; 
    private int pointUsage;
}
