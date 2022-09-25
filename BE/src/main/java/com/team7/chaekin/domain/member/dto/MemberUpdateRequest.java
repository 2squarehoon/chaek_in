package com.team7.chaekin.domain.member.dto;

import com.team7.chaekin.domain.member.entity.Gender;
import lombok.Data;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class MemberUpdateRequest {
    @NotBlank
    @Size(min = 1, max = 255)
    private String nickname;
    @NotBlank
    @Size(min = 1, max = 45)
    private String job;
    @Min(1)
    private int age;
    @NotNull
    private Gender gender;
}
