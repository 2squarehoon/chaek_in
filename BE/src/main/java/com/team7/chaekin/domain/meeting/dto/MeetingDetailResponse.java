package com.team7.chaekin.domain.meeting.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class MeetingDetailResponse {
    private long meetingId;
    private String bookTitle;
    private String cover;
    private String meetingTitle;
    private String description;
    private int currentMember;
    private int maxCapacity;
    private String createdAt;
}
