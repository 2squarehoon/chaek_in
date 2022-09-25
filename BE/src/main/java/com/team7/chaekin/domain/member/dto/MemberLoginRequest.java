package com.team7.chaekin.domain.member.dto;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
public class MemberLoginRequest {
    @Email(message = "Must email format.")
    @NotBlank
    private String identifier;
}
