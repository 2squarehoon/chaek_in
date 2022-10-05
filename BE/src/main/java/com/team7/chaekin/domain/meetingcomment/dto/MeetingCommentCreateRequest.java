package com.team7.chaekin.domain.meetingcomment.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.PositiveOrZero;
import javax.validation.constraints.Size;

@Data
public class MeetingCommentCreateRequest {
    @PositiveOrZero(message = "ParentId can not be minus value.")
    private long parentId;
    @NotBlank
    @Size(min = 1, max = 500, message = "Content's length is not valid.")
    private String content;
}
