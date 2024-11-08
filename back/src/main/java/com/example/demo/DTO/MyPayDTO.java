package com.example.demo.DTO;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MyPayDTO {

    private int paymentId;
    private Long bookingNum;
    private String paymentMethod;
    private int  price;
    private Date paymentDate;
    private int pointUsage;
    private int  totalPayment;

}
