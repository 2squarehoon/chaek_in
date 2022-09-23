package com.team7.chaekin.domain.memo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class MemberTokenResponse {
    private String accessToken;
    private String refreshToken;
}
