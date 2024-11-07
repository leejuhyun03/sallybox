package com.example.demo.DTO.JY;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InquiryRequest {
    private String name;
    private String phone_Number;
    private String email;
    private String title;
    private String content;
    private Long id;
    
}
