package com.example.demo.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.request.auth.EmailCertificationRequestDto;
import com.example.demo.dto.request.auth.IdCheckRequestDto;
import com.example.demo.dto.request.auth.CheckCertificationRequestDto;
import com.example.demo.dto.request.auth.SignUpRequestDto;
import com.example.demo.dto.response.auth.IdCheckResponseDto;
import com.example.demo.dto.response.auth.CheckCertificationResponseDto;
import com.example.demo.dto.response.auth.EmailCertificationResponseDto;
import com.example.demo.dto.response.auth.SignUpResponseDto;
import com.example.demo.service.AuthService;

import lombok.RequiredArgsConstructor;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController//requestbody 반환가능
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    
    private final AuthService authService;

    @PostMapping("/id-check")
    public ResponseEntity<? super IdCheckResponseDto> idCheck(
        @RequestBody @Valid IdCheckRequestDto requestBody) {
        
        ResponseEntity<? super IdCheckResponseDto> response = authService.idCheck(requestBody);

        return response ;
    }

    @PostMapping("/email-certification")
    public ResponseEntity<? super EmailCertificationResponseDto> emailCertification(@RequestBody @Valid EmailCertificationRequestDto requestBody) {
        
        ResponseEntity<? super EmailCertificationResponseDto> response = authService.emailCertification(requestBody);
        return response;
    }

    @PostMapping("/check-certification")
    public ResponseEntity<? super CheckCertificationResponseDto> checkCertification(@RequestBody @Valid CheckCertificationRequestDto requestBody) {
        ResponseEntity<? super CheckCertificationResponseDto> response = authService.checkCertification(requestBody);
        return response;
    }

    @PostMapping("/sign-up")
    public ResponseEntity<? super SignUpResponseDto> signUp(
        @RequestBody @Valid SignUpRequestDto requestBody) {
        
            ResponseEntity<? super SignUpResponseDto> response = authService.signUp(requestBody);
        return response;
    }
    
    
    
    
}
