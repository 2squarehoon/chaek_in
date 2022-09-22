package com.team7.chaekin.domain.participant.controller;

import com.team7.chaekin.domain.participant.dto.ParticipantIdResponse;
import com.team7.chaekin.domain.participant.dto.ParticipantListResponse;
import com.team7.chaekin.domain.participant.service.ParticipantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/api/v1/meetings")
@RestController
public class ParticipantController {

    private final ParticipantService participantService;
    private static int memberId = 1;

    @GetMapping("/{meetingId}/participants")
    public ResponseEntity<ParticipantListResponse> deleteParticipant(@PathVariable long meetingId) {
        ParticipantListResponse response = participantService.getParticipants(meetingId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{meetingId}/participants")
    public ResponseEntity<ParticipantIdResponse> joinMeeting(@PathVariable long meetingId) {
        long participantId = participantService.joinMeeting(memberId, meetingId);
        return ResponseEntity.ok(new ParticipantIdResponse(participantId));
    }

    @DeleteMapping("/{meetingId}/participants/{participantId}")
    public ResponseEntity<Void> deleteParticipant(@PathVariable long meetingId, @PathVariable long participantId) {
        participantService.leaveMeeting(meetingId, participantId);
        return ResponseEntity.noContent().build();
    }

}
