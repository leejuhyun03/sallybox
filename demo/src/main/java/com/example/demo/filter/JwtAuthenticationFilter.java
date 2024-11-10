package com.example.demo.filter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.demo.entity.UserEntity;
import com.example.demo.provider.JwtProvider;
import com.example.demo.repository.UserRepository;


import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
            try {
                
                String token = parseBearerToken(request);
                if(token ==null){
                    filterChain.doFilter(request, response);
                    return;
                }

                String email = jwtProvider.validate(token);
                if(email ==null){
                    filterChain.doFilter(request, response);
                    return;
                }

                UserEntity userEntity = userRepository.findByEmail(email);
                String role = userEntity.getRole(); //role :ROLE_USER, ROLE_ADMIN

                // ROLE_DEVELOPER , ROLE_BOSS
                List<GrantedAuthority> authorities = new ArrayList<>();
                authorities.add(new SimpleGrantedAuthority(role));

                //빈 context생성 filter와 servlet연결 과정
                SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
                AbstractAuthenticationToken authenticationToken = 
                    new UsernamePasswordAuthenticationToken(email, null,authorities);

                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                securityContext.setAuthentication(authenticationToken);
                SecurityContextHolder.setContext(securityContext);

            } catch (Exception e) {
                e.printStackTrace();
            }
            filterChain.doFilter(request, response);
    }

   private String parseBearerToken(HttpServletRequest request){//토큰값가져오기

        String authorization = request.getHeader("Authorization");

        boolean hasAuthorization = StringUtils.hasText(authorization);
        if (!hasAuthorization) return null;

        boolean isBearer = authorization.startsWith("Bearer ");
        if(!isBearer) return null;

        String token = authorization.substring(7);
        return token;

   } 
}
