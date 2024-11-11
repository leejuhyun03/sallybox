package com.example.demo.handler;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.example.demo.entity.CustomOAuth2User;
import com.example.demo.provider.JwtProvider;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler{
    
    private final JwtProvider jwtProvider;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {
        
        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

        String token = jwtProvider.create(
            oAuth2User.getUserId(),
            oAuth2User.getEmail(),
            oAuth2User.getName(),
            oAuth2User.getNickname(),
            oAuth2User.getPoints()
        );

        String encodedToken = URLEncoder.encode(token, StandardCharsets.UTF_8.toString());

        response.sendRedirect("http://localhost:3000/sallybox/oauth-response/"+encodedToken);
        
    }

}
