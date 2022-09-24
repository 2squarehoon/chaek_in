package com.team7.chaekin.domain.meetingcomment.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class MeetingCommentUpdateRequest {
    @NotBlank
    @Size(max = 500)
    private String content;
}
