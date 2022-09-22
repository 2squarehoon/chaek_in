package com.team7.chaekin.domain.meeting.dto;

import lombok.Data;

@Data
public class MeetingUpdateRequest {
    private long bookId;
    private String title;
    private String description;
    private int maxCapacity;
}
