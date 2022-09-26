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
    @Size(min = 1, max = 255, message = "Nickname's length is not valid.")
    private String nickname;
    @NotBlank
    @Size(min = 1, max = 45, message = "Job's length is not valid.")
    private String job;
    @Min(value = 1, message = "Age Value is not valid.")
    private int age;
    @NotNull(message = "Gender Can not be null.")
    private Gender gender;
}
