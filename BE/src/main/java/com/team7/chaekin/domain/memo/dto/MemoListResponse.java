package com.team7.chaekin.domain.memo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Data
public class MemoListResponse {
    private List<MemoListDto> memos;
}
