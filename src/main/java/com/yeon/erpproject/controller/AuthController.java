package com.yeon.erpproject.controller;

import com.yeon.erpproject.dto.LoginRequest;
import com.yeon.erpproject.dto.SignupRequest;
import com.yeon.erpproject.entity.Employee;
import com.yeon.erpproject.repository.EmployeeRepository;
import com.yeon.erpproject.security.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    /**
     * 로그인 API 담당
     * 사용자가 아이디/비밀번호를 입력하면 Security의 AuthenticationManager가 인증 시도
     * 인증 성공 → JwtUtil로 JWT 발급해서 클라이언트로 반환
     * 인증 실패 → 401 Unauthorized 에러 반환
     * 👉 ERP 포인트: React 로그인 페이지에서 /auth/login을 호출 → JWT 토큰을 받아서 ERP 대시보드 접근 가능.
     * */
    private final EmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;

    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        if (employeeRepository.findByUsername(request.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("이미 존재하는 사용자입니다.");
        }

        Employee emp = Employee.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role("ROLE_USER")
                .build();

        employeeRepository.save(emp);
        return ResponseEntity.ok("회원가입 성공");
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        String token = jwtProvider.createToken(authentication);
        return ResponseEntity.ok(Map.of("token", token));
    }

    // 로그아웃 (JWT 기반이므로 클라이언트가 토큰 삭제하면 됨)
    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        return ResponseEntity.ok("로그아웃 성공");
    }
}
