package com.team7.chaekin.domain.report.dto;

import lombok.Data;

@Data
public class ReportCreateRequest {
    private String title;
    private long bookId;
    private String contents;
}
