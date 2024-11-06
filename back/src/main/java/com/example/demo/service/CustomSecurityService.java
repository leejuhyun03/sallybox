package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.KH.CustomDTO;
import com.example.demo.DTO.KH.CustomDetailsDTO;
import com.example.demo.mapper.SqlMapper;



@Service
public class CustomSecurityService implements UserDetailsService {

    private final SqlMapper sqlMapper ;

    @Autowired
    public CustomSecurityService (SqlMapper sqlMapper) {
        this.sqlMapper = sqlMapper;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        CustomDTO dto = sqlMapper.findByEmail(email);
        if (dto == null) {
            throw new UsernameNotFoundException("사용자를 찾을 수 없습니다.");
        }

        // 암호화된 비밀번호와 함께 UserDetails 객체 생성
        return new CustomDetailsDTO(dto);
    }

    
}
