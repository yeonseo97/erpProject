package com.yeon.erpproject.dto;

import lombok.Data;

@Data
public class SignupRequest {
    // 회원가입용
    private String username;
    private String password;
}