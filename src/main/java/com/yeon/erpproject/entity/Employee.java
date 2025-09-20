package com.yeon.erpproject.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username; // 로그인 계정

    @Column(nullable = false)
    private String password; // 암호화 필요

    @Column(nullable = false)
    private String role; // ROLE_ADMIN / ROLE_USER

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;

    private String name;     // 실제 이름
    private String email;    // 이메일
    private String phone;    // 전화번호
}
