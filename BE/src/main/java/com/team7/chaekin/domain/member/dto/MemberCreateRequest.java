package com.team7.chaekin.domain.member.dto;

import com.team7.chaekin.domain.member.entity.Gender;
import com.team7.chaekin.domain.member.entity.Member;
import lombok.Data;

import javax.validation.constraints.*;

@Data
public class MemberCreateRequest {
    @Email(message = "Must email format.")
    private String identifier;
    @NotBlank
    @Size(min = 1, max = 255)
    private String nickname;
    @NotBlank
    @Size(min = 1, max = 45)
    private String job;
    @Min(1)
    private int age;
    @NotBlank
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
