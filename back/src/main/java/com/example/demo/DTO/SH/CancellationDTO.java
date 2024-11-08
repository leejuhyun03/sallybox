package com.example.demo.DTO.SH;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CancellationDTO {
    private int userId;
    private Long bookingNum;
    private int pointUsage;
}
