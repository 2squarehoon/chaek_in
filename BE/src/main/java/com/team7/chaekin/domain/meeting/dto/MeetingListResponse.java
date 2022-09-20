package com.team7.chaekin.domain.meeting.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class MeetingListResponse {
    private int totalPages;
    private List<MeetingListDto> meetings;
}
