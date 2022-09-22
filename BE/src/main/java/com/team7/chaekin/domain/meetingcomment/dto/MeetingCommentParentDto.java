package com.team7.chaekin.domain.meetingcomment.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class MeetingCommentParentDto {
    private long meetingCommentId;
    private String writer;
    private String content;
    private String createdAt;
    private Boolean isRemoved;
}
