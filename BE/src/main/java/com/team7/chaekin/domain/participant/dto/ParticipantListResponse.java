package com.team7.chaekin.domain.participant.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Data
public class ParticipantListResponse {
    private List<ParticipantListDto> participants;
}
