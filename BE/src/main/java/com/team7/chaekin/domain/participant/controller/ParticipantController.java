package com.team7.chaekin.domain.participant.controller;

import com.team7.chaekin.domain.participant.dto.ParticipantIdResponse;
import com.team7.chaekin.domain.participant.dto.ParticipantListResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/v1/meetings")
@RestController
public class ParticipantController {

    private static int memberid = 1;

    @GetMapping("/{meetingId}/participants")
    public ResponseEntity<ParticipantListResponse> getMeetingParticipants(@PathVariable long meetingId) {
        return ResponseEntity.ok(new ParticipantListResponse());
    }

    @PostMapping("/{meetingId}/participants")
    public ResponseEntity<ParticipantIdResponse> joinMeeting(@PathVariable long meetingId) {
        return ResponseEntity.ok(new ParticipantIdResponse());
    }

    @DeleteMapping("/{meetingId}/participants/{participantId}")
    public ResponseEntity<Void> getMeetingParticipants(@PathVariable long meetingId, @PathVariable long participantId) {
        return ResponseEntity.noContent().build();
    }

}
