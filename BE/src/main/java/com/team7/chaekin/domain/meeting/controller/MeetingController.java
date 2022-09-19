package com.team7.chaekin.domain.meeting.controller;

import com.team7.chaekin.domain.meeting.dto.*;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/v1/meetings")
@RestController
public class MeetingController {

    @GetMapping
    public ResponseEntity<MeetingListResponse> getMeetings(@PageableDefault(size=24) Pageable pageable,
                                                           MeetingListRequest meetingListRequest) {
        return ResponseEntity.ok(new MeetingListResponse());
    }

    @GetMapping("/{meetingId}")
    public ResponseEntity<MeetingDetailResponse> getMeetingDetail(@PathVariable long meetingId) {
        return ResponseEntity.ok(new MeetingDetailResponse());
    }

    @PostMapping
    public ResponseEntity<MeetingIdResponse> createMeeting(@RequestBody MeetingCreateRequest meetingCreateRequest) {
        return ResponseEntity.ok(new MeetingIdResponse());
    }

    @PatchMapping("/{meetingId}")
    public ResponseEntity<MeetingIdResponse> updateMeeting(@PathVariable long meetingId,
                                           @RequestBody MeetingUpdateRequest meetingUpdateRequest) {
        return ResponseEntity.ok(new MeetingIdResponse());
    }

    @DeleteMapping("/{meetingId}")
    public ResponseEntity<Void> deleteMeeting(@PathVariable long meetingId) {
        return ResponseEntity.noContent().build();
    }
}
