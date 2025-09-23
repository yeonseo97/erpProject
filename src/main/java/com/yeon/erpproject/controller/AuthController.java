package com.yeon.erpproject.controller;

import com.yeon.erpproject.security.CustomUserDetailsService;
import com.yeon.erpproject.security.JwtUtil;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    /**
     * 로그인 API 담당
     * 사용자가 아이디/비밀번호를 입력하면 Security의 AuthenticationManager가 인증 시도
     * 인증 성공 → JwtUtil로 JWT 발급해서 클라이언트로 반환
     * 인증 실패 → 401 Unauthorized 에러 반환
     * 👉 ERP 포인트: React 로그인 페이지에서 /auth/login을 호출 → JWT 토큰을 받아서 ERP 대시보드 접근 가능.
     * */

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService;

    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil, CustomUserDetailsService userDetailsService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    @PostMapping("/login")
    public String login(@RequestParam String username, @RequestParam String password) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        return jwtUtil.generateToken(userDetails.getUsername(), userDetails.getAuthorities().iterator().next().getAuthority());
    }
}