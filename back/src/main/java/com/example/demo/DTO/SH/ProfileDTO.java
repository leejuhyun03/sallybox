package com.example.demo.DTO.SH;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor  // 모든 필드를 파라미터로 받는 생성자 생성
@NoArgsConstructor   // 파라미터 없는 기본 생성자 생성
public class ProfileDTO {
    public int userId;
    public String nickname;
}
