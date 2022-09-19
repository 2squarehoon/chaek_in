package com.team7.chaekin.domain.participant.dto;

import lombok.Data;

import java.util.List;

@Data
public class ParticipantListResponse {
    private List<ParticipantListDto> participants;
}
