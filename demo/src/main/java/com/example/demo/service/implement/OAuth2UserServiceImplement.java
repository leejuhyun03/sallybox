package com.example.demo.service.implement;

import java.math.BigDecimal;
import java.nio.ByteBuffer;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Map;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.example.demo.entity.CustomOAuth2User;
import com.example.demo.entity.UserEntity;
import com.example.demo.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OAuth2UserServiceImplement extends DefaultOAuth2UserService{
    

    private final UserRepository userRepository;

    

    @Override
    public OAuth2User loadUser(OAuth2UserRequest request) throws OAuth2AuthenticationException {
        
        OAuth2User oAuth2User = super.loadUser(request);
        String oauthClientName = request.getClientRegistration().getClientName();//클라이언트 이름 받아오기


        try {
            System.out.println(new ObjectMapper().writeValueAsString(oAuth2User.getAttributes()));
        } catch (Exception e) {
            e.printStackTrace();
        }

        UserEntity userEntity = null;
        int userId = 0;
        String email = null;
        String name= null;
        String nickname= null;
        BigDecimal points = new BigDecimal("100.00"); // 기본 포인트 설정


        if (oauthClientName.equals("kakao")) {
            Long id = (Long) oAuth2User.getAttributes().get("id");
            userId = id.intValue();
            email = "kakao@" + id + ".com";
            Map<String, Object> properties = (Map<String, Object>) oAuth2User.getAttributes().get("properties");
            name = (String) properties.get("nickname");
            nickname = name; // 카카오의 경우 닉네임을 이름으로 사용

            userEntity = userRepository.findByEmail(email);
            if (userEntity == null) {
                userEntity = new UserEntity(userId, email, name,nickname,"kakao");
                userRepository.save(userEntity);
            }
        } else if (oauthClientName.equals("naver")) {
            Map<String, String> responseMap = (Map<String, String>) oAuth2User.getAttributes().get("response");
            String id = responseMap.get("id");
            userId = hashString(id);
            email = responseMap.get("email");
            name = responseMap.get("name");
            nickname = responseMap.get("nickname");
            String phoneNumber = responseMap.get("mobile");

            userEntity = userRepository.findByEmail(email);
            if (userEntity == null) {
                userEntity = new UserEntity(userId, email, name, nickname, phoneNumber, "naver");
                userRepository.save(userEntity);
            }
        }

        // userEntity가 null이 아닌 경우에만 값을 가져옵니다.
        if (userEntity != null) {
            
            userId = userEntity.getUserId();
            System.out.println("userId:"+userId);
            email = userEntity.getEmail();
            name = userEntity.getName();
            nickname = userEntity.getNickname();
            points = userEntity.getPoints();
        }

        return new CustomOAuth2User(userId, email, name, nickname, points);
    }

    public static int hashString(String input) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] messageDigest = md.digest(input.getBytes());
            return ByteBuffer.wrap(messageDigest).getInt();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    
}
