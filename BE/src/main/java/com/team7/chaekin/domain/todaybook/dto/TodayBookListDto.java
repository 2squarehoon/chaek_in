package com.team7.chaekin.domain.todaybook.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class TodayBookListDto {
    private long TodayBookId;
    private String readDate;
    private long bookId;
    private String cover;
}
