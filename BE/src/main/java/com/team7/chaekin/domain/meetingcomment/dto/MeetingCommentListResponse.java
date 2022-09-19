package com.team7.chaekin.domain.meetingcomment.dto;

import lombok.Data;

import java.util.List;

@Data
public class MeetingCommentListResponse {
    private int totalPages;
    private List<MeetingCommentListDto> comments;
}
