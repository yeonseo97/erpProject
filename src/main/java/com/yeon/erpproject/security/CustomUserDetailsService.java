package com.yeon.erpproject.security;

import com.yeon.erpproject.entity.Employee;
import com.yeon.erpproject.repository.EmployeeRepository;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    /**
     * Spring Security 표준 인터페이스 UserDetailsService 구현체
     * DB(Employee 테이블)에서 사용자 정보(아이디, 암호, 권한)를 가져와서 Security에서 인식할 수 있는 UserDetails 객체로 변환
     * 인증(Authentication) 과정에서 DB 사용자 → Security 사용자 매핑
     * 👉 ERP 포인트: 예를 들어 직원이 로그인하면, DB의 직원 정보(username, password, role)를 Spring Security 인증체계에 맞게 변환.
    * */
    private final EmployeeRepository employeeRepository;

    public CustomUserDetailsService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Employee emp = employeeRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return User.builder()
                .username(emp.getUsername())
                .password(emp.getPassword()) // 반드시 암호화된 패스워드
                .roles(emp.getRole())       // 예: "ADMIN" or "USER"
                .build();
    }
}