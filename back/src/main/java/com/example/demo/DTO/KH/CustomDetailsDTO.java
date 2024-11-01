package com.example.demo.DTO.KH;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class CustomDetailsDTO implements UserDetails {

    private final int userid;
    private final String email;
    private final String password;
    private final String name;
    private final List<GrantedAuthority> authorities;

    public CustomDetailsDTO(CustomDTO dto) {
        this.userid = dto.getUserid();
        this.email = dto.getEmail();
        this.password = dto.getPassword();
        this.name = dto.getName();
        // 권한 정보 설정 (예시)
        this.authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
    }

     @Override
    public String getUsername() {
        return name;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false; // 계정 만료 여부 설정 (필요에 따라 로직 변경)
    }

    @Override
    public boolean isAccountNonLocked() {
        return false; // 계정 잠금 여부 설정 (필요에 따라 로직 변경)
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false; // 비밀번호 만료 여부 설정 (필요에 따라 로직 변경)
    }

    @Override
    public boolean isEnabled() {
        return false; // 계정 활성화 여부 설정 (필요에 따라 로직 변경)
    }

}
