package com.team7.chaekin.domain.meetingcomment.dto;

import lombok.Data;

import java.util.List;

@Data
public class MeetingCommentListDto {
    private MeetingCommentDto parent;
    private List<MeetingCommentDto> children;
}
