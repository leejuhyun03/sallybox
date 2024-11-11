package com.example.demo.service;

import org.springframework.http.ResponseEntity;

import com.example.demo.dto.response.auth.IdCheckResponseDto;
import com.example.demo.dto.response.auth.EmailCertificationResponseDto;
import com.example.demo.dto.response.auth.CheckCertificationResponseDto;
import com.example.demo.dto.response.auth.SignUpResponseDto;
import com.example.demo.dto.request.auth.IdCheckRequestDto;
import com.example.demo.dto.request.auth.SignUpRequestDto;
import com.example.demo.dto.request.auth.CheckCertificationRequestDto;
import com.example.demo.dto.request.auth.EmailCertificationRequestDto;


public interface AuthService {
    
    ResponseEntity<? super IdCheckResponseDto> idCheck(IdCheckRequestDto dto);
    ResponseEntity<? super EmailCertificationResponseDto> emailCertification(EmailCertificationRequestDto dto);
    ResponseEntity<? super CheckCertificationResponseDto> checkCertification(CheckCertificationRequestDto dto);
    ResponseEntity<? super SignUpResponseDto> signUp (SignUpRequestDto dto);
    
}