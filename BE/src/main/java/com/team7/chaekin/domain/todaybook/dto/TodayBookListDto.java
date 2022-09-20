package com.team7.chaekin.domain.todaybook.dto;

import lombok.Data;

@Data
public class TodayBookListDto {
    private long TodayBookId;
    private String readDate;
    private long bookId;
    private String image;
}
