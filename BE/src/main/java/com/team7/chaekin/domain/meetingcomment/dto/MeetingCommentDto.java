package com.team7.chaekin.domain.meetingcomment.dto;

import lombok.Data;

@Data
public class MeetingCommentDto {
    private long meetingCommentId;
    private String writer;
    private String content;
    private String createdAt;
}
