package com.team7.chaekin.domain.report.dto;

import lombok.Data;

import java.util.List;
@Data
public class AllReportListResponse {
    private int totalPages;
    private List<ReportListResponse> reports;
}
