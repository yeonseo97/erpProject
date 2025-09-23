package com.yeon.erpproject.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtProvider {
    /**
     * JwtUtil을 이용해서 토큰 생성/검증을 제공하는 서비스 레이어 역할
     * 로그인 시 Authentication 정보를 받아 JWT 발급
     * 요청에서 JWT 추출 → 유저 검증 → SecurityContext 설정
     * 즉 실제 로그인/인증 과정에서 JwtUtil을 호출하는 “중간 관리자” 역할
     * */
    private final SecretKey SECRET_KEY = Keys.hmacShaKeyFor("mySecretKey12345mySecretKey12345".getBytes()); // 토큰 서명용 Key
    private final long EXPIRATION_MS = 1000 * 60 * 60; // 1시간

    // 토큰 생성: 로그인 성공 시 username을 기반으로 JWT 발급
    public String createToken(Authentication authentication) {
        String username = authentication.getName();
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_MS))
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();
    }

    // 토큰에서 username 추출
    public String getUsernameFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // 토큰 유효성 체크
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}