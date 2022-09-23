package com.team7.chaekin.domain.member.dto;

import com.team7.chaekin.domain.member.entity.Gender;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class MemberInfoResponse {
    private String nickname;
    private String job;
    private int age;
    private Gender gender;
}
