package com.example.demo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.example.demo.filter.JwtRequestFilter;
import com.example.demo.service.CustomSecurityService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity// 모든 클라이언트의 요청(URL)을 Spring Security가 관리하겠다는 뜻 / 즉 반드시 여기를 거친다는 뜻
@EnableGlobalMethodSecurity(prePostEnabled = true) // 메소드를 사용할 때 마다 인증 여부를 판단하게 하는 어노테이션 / 인증이 되어야만 메소드를 사용할 수 있게 하는 것
public class SecurityConfig {

    @Configuration
    public class CorsConfig implements WebMvcConfigurer {
    
        @Override
        public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000") // React 앱의 URL
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
        }
    }

    @Bean// 이 메소드를 클래스처럼 객체를 생성 함 / 클래스는 위 두개의 어노테이션이 필요하기 때문에 사용하는 껍데기 일뿐 중요한 것은 메소드이기 때문에 메소드를 객체화 시킨 것
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {// 사용자가 입력한 'http'는 다 http로 옴 그것을 관리하는 애가 SecurityFilterChain임
        http.csrf().disable()
            .authorizeRequests()
            // .antMatchers("/api/login", "/api/findEmail","/api/allfindEmail").permitAll() // 로그인 엔드포인트 허용
            .antMatchers("/**").permitAll() // 로그인 엔드포인트 허용
            .anyRequest().authenticated() // 나머지 요청은 인증 필요
            .and()
            .addFilterBefore(jwtRequestFilter(), UsernamePasswordAuthenticationFilter.class); // JWT 필터 추가

        return http.build(); // 위의 조건에 일치하면 build를 통해 다시 서버로 돌려줌
    }

    @Autowired
    private CustomSecurityService customSecurityService;
	
    @Bean
    public JwtRequestFilter jwtRequestFilter() { // JWT 필터 빈 생성
        return new JwtRequestFilter();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // BCrypt 해시 알고리즘 사용
    }

    
	//AuthenticationManager는 스프링 시큐리티의 인증을 담당
	//UserSecurityService와 PasswordEncoder(암호화)가 자동으로 설정돼서 비교를 함
	@Bean
	public AuthenticationManager authenticationManager(
			AuthenticationConfiguration authenticationConfiguration) 
					throws Exception {
		
		return authenticationConfiguration.getAuthenticationManager(); // 사용자가 입력한 아이디와 암호화 되어있는 패스워드를 저장되어있는 아이디와 암호화된 패스워드를 비교해서 로그인 해줌 / 공식임
	}
}
