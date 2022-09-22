package com.team7.chaekin.domain.meetingcomment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Data
public class MeetingCommentListResponse {
    private int totalPages;
    private List<MeetingCommentListDto> comments;
}
