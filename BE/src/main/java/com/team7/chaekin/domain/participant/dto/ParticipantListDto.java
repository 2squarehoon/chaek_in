package com.team7.chaekin.domain.participant.dto;

import lombok.Data;

@Data
public class ParticipantListDto {
    private long participantId;
    private String name;
    private String gender;
    private int age;
    private boolean isLeader;
}
