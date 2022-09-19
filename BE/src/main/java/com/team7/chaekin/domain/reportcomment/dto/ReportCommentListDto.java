package com.team7.chaekin.domain.reportcomment.dto;

import lombok.Data;

import java.util.List;

@Data
public class ReportCommentListDto {
    private ReportCommentDto parent;
    private List<ReportCommentDto> children;
}
