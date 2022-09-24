package com.team7.chaekin.domain.meetingcomment.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.PositiveOrZero;
import javax.validation.constraints.Size;

@Data
public class MeetingCommentCreateRequest {
    @PositiveOrZero
    private long parentId;
    @NotBlank
    @Size(max = 500)
    private String content;
}
