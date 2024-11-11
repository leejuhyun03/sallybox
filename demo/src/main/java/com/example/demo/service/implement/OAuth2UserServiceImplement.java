package com.example.demo.service.implement;

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

        if(oauthClientName.equals("kakao")){
             //String id = (String) oAuth2User.getAttributes().get("id");
            // try{
            //     userId = Integer.parseInt(id);
            //     System.out.println("변환된 숫자: " + userId);
            // } catch (NumberFormatException e) {
            //     System.out.println("유효하지 않은 입력: " + id);
            // }
            Long id = (Long)oAuth2User.getAttributes().get("id");
            userId = id.intValue();
            email = "kakao@"+ oAuth2User.getAttributes().get("id")+".com";

            
            //email = (String)oAuth2User.getAttributes().get("id");

            userEntity = new UserEntity(userId,email,"kakao");
        }

        if(oauthClientName.equals("naver")){
            Map<String,String> responseMap = (Map<String,String>) oAuth2User.getAttributes().get("response");
            String id = responseMap.get("id");
            int hashedId = hashString(id);

            System.out.println("Hashed ID: " + hashedId);

            email = responseMap.get("email");
            String nickname = responseMap.get("nickname");
            String phoneNumber = responseMap.get("mobile");
            String name = responseMap.get("name");
            userEntity = new UserEntity(hashedId,email,nickname,phoneNumber,name,"naver");

        }

        userRepository.save(userEntity);

        return new CustomOAuth2User(email);
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
