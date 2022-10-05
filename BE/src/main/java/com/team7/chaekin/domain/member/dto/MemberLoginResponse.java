package com.team7.chaekin.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
public class MemberLoginResponse {
    private Boolean isFirst;
    private String accessToken;
    private String refreshToken;
    private String nickname;
    private long memberId;
}
