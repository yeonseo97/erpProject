package com.yeon.erpproject.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.*;
import org.springframework.security.authentication.*;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
    /**
     * Spring Security 전반 설정
     * URL별 접근 권한 정의
     * /auth/** → 누구나 접근 가능 (로그인, 회원가입)
     * /admin/** → 관리자만 접근 가능
     * /employee/** → 로그인한 사용자만 접근 가능
     * 세션 대신 JWT를 사용하도록 Stateless 설정
     * JwtFilter를 Security Filter Chain에 등록
     * 👉 ERP 포인트: ERP는 메뉴마다 권한이 다름 (예: 관리자만 부서관리 가능). 이걸 SecurityConfig에서 설정 가능.
     * */
    private final JwtFilter jwtFilter;
    private final CustomUserDetailsService userDetailsService;

    // 비밀번호 암호화 Bean
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // AuthenticationManager Bean 생성
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    // 보안 필터 체인 설정
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable) // CSRF 비활성화
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // JWT 사용, 세션 X
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**").permitAll() // 로그인/회원가입 허용
                        .requestMatchers("/admin/**").hasRole("ADMIN") // 관리자 권한
                        .anyRequest().authenticated() // 나머지는 인증 필요
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class); // JWT 필터 추가
        return http.build();
    }
}
