package com.team7.chaekin.domain.meeting.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Data
public class MeetingMyResponse {
    private List<MeetingListDto> meetings;
}
