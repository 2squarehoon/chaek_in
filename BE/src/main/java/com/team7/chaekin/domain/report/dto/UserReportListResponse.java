package com.team7.chaekin.domain.report.dto;

import lombok.Data;

import java.util.List;

@Data
public class UserReportListResponse {
    private List<ReportListResponse> reports;
}
