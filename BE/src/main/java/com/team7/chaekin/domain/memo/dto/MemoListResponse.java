package com.team7.chaekin.domain.memo.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class MemoListResponse {
    List<MemoResponse> memos;
}
