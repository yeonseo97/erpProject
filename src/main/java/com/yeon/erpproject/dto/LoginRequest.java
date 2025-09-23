package com.yeon.erpproject.dto;

import lombok.Data;

@Data
public class LoginRequest {
    // 로그인용
    private String username;
    private String password;
}