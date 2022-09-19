package com.team7.chaekin.domain.memo.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MemoResponse {
    long memoId;
    String color;
    String contents;
}
