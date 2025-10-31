package com.yeon.erpproject.controller;

import com.yeon.erpproject.entity.Employee;
import com.yeon.erpproject.repository.EmployeeRepository;
import com.yeon.erpproject.security.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.util.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/auth/oauth")
@RequiredArgsConstructor
public class OAuthController {

    private final EmployeeRepository employeeRepository;
    private final JwtProvider jwtProvider;
    private final RestTemplate restTemplate = new RestTemplate(); // Access Token 요청
    @Value("${kakao.rest-api-key}")
    private String clientId;
    @Value("${kakao.redirect-uri}")
    private String redirectUri;

    @GetMapping("/kakao/url")
    public Map<String, String> getKakaoLoginUrl() {
        String url = "https://kauth.kakao.com/oauth/authorize"
                + "?client_id=" + clientId
                + "&redirect_uri=" + redirectUri
                + "&response_type=code";
        return Map.of("url", url);
    }

    @GetMapping("/kakao/callback")
    public ResponseEntity<?> kakaoCallback(@RequestParam String code) {
        // 1. 카카오 토큰 요청
        String tokenUrl = "https://kauth.kakao.com/oauth/token";
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", clientId);
        params.add("redirect_uri", redirectUri);
        params.add("code", code); // 인가코드

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
        ResponseEntity<Map> response = restTemplate.postForEntity(tokenUrl, request, Map.class);
        String accessToken = (String) response.getBody().get("access_token");

        // 2. 사용자 정보 조회
        HttpHeaders userHeaders = new HttpHeaders();
        userHeaders.setBearerAuth(accessToken);
        HttpEntity<String> userRequest = new HttpEntity<>(userHeaders);

        ResponseEntity<Map> userResponse = restTemplate.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.GET,
                userRequest,
                Map.class
        );

        Map kakaoAccount = (Map) ((Map) userResponse.getBody().get("kakao_account")).get("profile");
        String email = (String) ((Map) userResponse.getBody().get("kakao_account")).get("email");
        String name = (String) kakaoAccount.get("nickname");

        // 3. DB 확인 및 신규 생성
        Employee emp = employeeRepository.findByUsername(email)
                .orElseGet(() -> employeeRepository.save(Employee.builder()
                        .username(email)
                        .password(UUID.randomUUID().toString()) // OAuth용 임의 비밀번호
                        .name(name)
                        .email(email)
                        .role("ROLE_USER")
                        .createdAt(LocalDate.now())
                        .build()));

        // 4. JWT 토큰 발급 (username 기반)
        String jwtToken = jwtProvider.createToken(emp.getUsername());

        Map<String, Object> result = new HashMap<>();
        result.put("token", jwtToken);
        result.put("username", emp.getUsername());
        result.put("name", emp.getName());
        result.put("role", emp.getRole());

        return ResponseEntity.ok(result);
    }
}
