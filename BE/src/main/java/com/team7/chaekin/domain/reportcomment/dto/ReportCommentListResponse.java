package com.team7.chaekin.domain.reportcomment.dto;

import lombok.Data;

import java.util.List;

@Data
public class ReportCommentListResponse {

    private int totalPages;
    private List<ReportCommentListDto> comments;

}
