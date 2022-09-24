package com.team7.chaekin.domain.member.dto;

import lombok.Data;

import javax.validation.constraints.Email;

@Data
public class MemberLoginRequest {
    @Email(message = "Must email format.")
    private String identifier;
}
