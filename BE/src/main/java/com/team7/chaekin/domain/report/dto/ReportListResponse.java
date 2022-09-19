package com.team7.chaekin.domain.report.dto;

import lombok.Data;

@Data
public class ReportListResponse {

    private long reportId;
    private String title;
    private String writer;
    private String bookName;
    private String image;
    private String contents;
    private String like;
    private String createdAt;
}
