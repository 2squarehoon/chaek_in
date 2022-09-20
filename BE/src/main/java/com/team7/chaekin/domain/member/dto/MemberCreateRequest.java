package com.team7.chaekin.domain.member.dto;

import com.team7.chaekin.domain.member.entity.Gender;
import com.team7.chaekin.domain.member.entity.Member;
import lombok.Data;

@Data
public class MemberCreateRequest {
    private String identifier;
    private String nickname;
    private String job;
    private int age;
    private Gender gender;

    public Member toEntity() {
        return Member.builder()
                .identifier(identifier)
                .nickname(nickname)
                .job(job)
                .age(age)
                .gender(gender)
                .build();
    }
}
