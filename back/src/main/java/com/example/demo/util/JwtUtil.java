package com.example.demo.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {
    
    @Value("${jwt.secret}") // application.properties에서 jwt.secret 값을 주입받음
    private String SECRET_KEY; // 비밀 키

    private final long EXPIRATION_TIME = 1000 * 60 * 60; // 1시간
    
    // JWT 생성 (user_id 추가)
    public String generateToken(String email, int userId, String nickName, String name) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("user_id", userId); // user_id 추가
        claims.put("user_nickname", nickName); // user_nickname 추가
        claims.put("user_name", name); // user_nickname 추가
        return createToken(claims, email);
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    // user_id 추출
    // public Long extractUserId(String token) {
    //     Claims claims = extractAllClaims(token);
    //     return (Long) claims.get("user_id"); // user_id 반환
    // }

    public boolean validateToken(String token, String username) {
        final String extractedUsername = extractUsername(token);
        return (extractedUsername.equals(username) && !isTokenExpired(token));
    }

    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    private boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }
}
