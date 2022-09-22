package com.team7.chaekin.domain.participant.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ParticipantListDto {
    private long participantId;
    private String name;
    private String gender;
    private int age;
    private Boolean isLeader;
}
