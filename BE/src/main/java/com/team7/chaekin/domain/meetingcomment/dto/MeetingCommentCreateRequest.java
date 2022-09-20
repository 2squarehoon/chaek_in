package com.team7.chaekin.domain.meetingcomment.dto;

import lombok.Data;

@Data
public class MeetingCommentCreateRequest {
    private long parentId;
    private String content;
}
