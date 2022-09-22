package com.team7.chaekin.domain.memo.dto;

import lombok.Builder;
import lombok.Data;

@Data
public class MemoRequest {
    private String color;
    private String content;
}
