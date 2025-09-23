package com.yeon.erpproject.security;

import com.yeon.erpproject.entity.Employee;
import com.yeon.erpproject.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
/**
 * Spring Security가 로그인 시 호출
 * Spring Security 표준 인터페이스 UserDetailsService 구현체
 * DB(Employee 테이블)에서 사용자 정보(아이디, 암호, 권한)를 가져와서 Security에서 인식할 수 있는 UserDetails 객체로 변환
 * 인증(Authentication) 과정에서 DB 사용자 → Security 사용자 매핑
 * 👉 ERP 포인트: 예를 들어 직원이 로그인하면, DB의 직원 정보(username, password, role)를 Spring Security 인증체계에 맞게 변환.
 * */
    private final EmployeeRepository employeeRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // DB에서 username으로 Employee 조회
        Employee emp = employeeRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다."));

        // Spring Security User 객체로 변환
        return org.springframework.security.core.userdetails.User.builder()
                .username(emp.getUsername())
                .password(emp.getPassword()) // DB에 저장된 암호화된 비밀번호
                .roles(emp.getRole().replace("ROLE_", "")) // ROLE_ADMIN → ADMIN
                .build();
    }
}
