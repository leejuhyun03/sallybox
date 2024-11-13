package com.example.demo.provider;

import java.util.Date;
import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;

@Component
public class JwtProvider {

    @Value("${secret-key}")
    private String secretKey;

    public String create(int userId, String email, String name, String nickname, BigDecimal points) {
        
        Date expiredDate = Date.from(Instant.now().plus(1, ChronoUnit.HOURS));
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

        String jwt = Jwts.builder()
            .signWith(key, SignatureAlgorithm.HS256)
            .claim("user_id", userId)
            .claim("email", email)
            .claim("user_name", name)
            .claim("user_nickname", nickname)
            .claim("user_point", points)
            .setIssuedAt(new Date())
            .setExpiration(expiredDate)
            .compact();

        return jwt;
    }

    public Claims validate(String jwt) {
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

        try {
            Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jwt)
                .getBody();

            return claims;
        } catch (Exception exception) {
            exception.printStackTrace();
            return null;
        }
    }
}