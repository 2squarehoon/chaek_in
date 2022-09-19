package com.team7.chaekin.domain.meeting.dto;

import lombok.Data;

@Data
public class MeetingDetailResponse {
    private long id;
    private String bookName;
    private String image;
    private String title;
    private String description;
    private int currentMember;
    private int maxCapacity;
    private String createdAt;
}
