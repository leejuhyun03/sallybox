package com.example.demo.provider;
//jwt:인증한 사람의 정보를 토큰 형태로 담아서 받아줌
//jwt.io
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
import java.nio.charset.StandardCharsets;

@Component//의존성 주입
public class JwtProvider {

    @Value("${secret-key}")
    private String secretKey;

    public String create(String email) {
        
        Date expiredDate = Date.from(Instant.now().plus(1,ChronoUnit.HOURS));
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

        String jwt = Jwts.builder()
        .signWith(key,SignatureAlgorithm.HS256)
        .setSubject(email).setIssuedAt(new Date()).setExpiration(expiredDate)
        .compact();

        return jwt;
    }

    public String validate(String jwt){

       String subject = null; 
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

        try{

            Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jwt)
                .getBody();

                subject = claims.getSubject();

        }catch(Exception exception){
            exception.printStackTrace();
            return null;
        }

        return "";
    }
    
}
