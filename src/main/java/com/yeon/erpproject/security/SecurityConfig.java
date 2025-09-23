package com.yeon.erpproject.security;

import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.context.annotation.Configuration;

@Configuration
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

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // ✅ CSRF 비활성화
                .csrf(AbstractHttpConfigurer::disable)

                // ✅ 세션을 쓰지 않고 JWT만 사용
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // ✅ 요청별 권한 설정
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**").permitAll()   // 로그인/회원가입은 모두 허용
                        .requestMatchers("/admin/**").hasRole("ADMIN") // ADMIN만 접근 가능
                        .anyRequest().authenticated()             // 그 외 요청은 인증 필요
                )

                // ✅ JWT 필터 추가
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}