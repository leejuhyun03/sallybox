package com.example.demo.entity;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class CustomOAuth2User implements OAuth2User{

    private int userId;
    private String email;
    private String name;
    private String nickname;
    private BigDecimal points;

    private Map<String, Object> attributes;

    @Override
    public Map<String, Object> getAttributes() {
        return this.attributes;
    }

    public CustomOAuth2User(int userId, String email, String name, String nickname, BigDecimal points) {
        this.userId = userId;
        this.email = email;
        this.name = name;
        this.nickname = nickname;
        this.points = points;
        this.attributes = null;  // or Collections.emptyMap() if you prefer
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }
    
}
