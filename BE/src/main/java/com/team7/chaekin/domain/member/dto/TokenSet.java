package com.team7.chaekin.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class TokenSet {
    private String access;
    private String refresh;
}