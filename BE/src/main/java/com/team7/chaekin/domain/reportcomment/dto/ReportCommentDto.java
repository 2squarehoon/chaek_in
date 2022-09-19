package com.team7.chaekin.domain.reportcomment.dto;

import lombok.Data;

@Data
public class ReportCommentDto {
    private long reportCommentId;
    private String writer;
    private String contents;
    private String updatedAt;
}
