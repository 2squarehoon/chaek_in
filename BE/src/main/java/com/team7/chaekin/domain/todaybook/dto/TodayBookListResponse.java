package com.team7.chaekin.domain.todaybook.dto;

import lombok.Data;

import java.util.List;

@Data
public class TodayBookListResponse {
    private List<TodayBookListDto> todaybooks;
}
