package com.example.demo.dto.request.auth;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CheckCertificationRequestDto {

    @NotNull
    private int id;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String certificationNumber;
    
}
