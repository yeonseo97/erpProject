package com.yeon.erpproject.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {
    /**
     * JWT(토큰) 발급과 검증 담당
     * 로그인 성공 시 토큰을 만들어 클라이언트(React)에 전달
     * 클라이언트 요청 시 전달받은 JWT를 검증해서 사용자 정보 추출
     * 👉 ERP 포인트: React 프론트에서 로그인할 때, 서버가 토큰을 주고 이후 모든 API 호출은 이 토큰을 인증 수단으로 씀.
     * */
    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private final long expirationMs = 1000 * 60 * 60; // 1시간

    public String generateToken(String username, String role) {
        return Jwts.builder()
                .setSubject(username)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(key)
                .compact();
    }

    public Claims validateToken(String token) throws JwtException {
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
    }
}
