package com.team7.chaekin.domain.memo.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MemoRequest {
    String color;
    String contents;
}
