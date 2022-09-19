package com.team7.chaekin.domain.member.dto;

import com.team7.chaekin.domain.member.entity.Gender;
import lombok.Data;

@Data
public class MemberInfoRequest {
    private String nickname;
    private String job;
    private int age;
    private Gender gender;
    private String area;
}
