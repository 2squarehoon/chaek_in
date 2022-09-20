package com.team7.chaekin.domain.meeting.controller;

import com.team7.chaekin.domain.meeting.dto.*;
import com.team7.chaekin.domain.meeting.service.MeetingService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/api/v1/meetings")
@RestController
public class MeetingController {

    private final MeetingService meetingService;

    @GetMapping
    public ResponseEntity<MeetingListResponse> getMeetings(@PageableDefault(size=24) Pageable pageable,
                                                           MeetingListRequest meetingListRequest) {
        MeetingListResponse response = meetingService.getMeetings(meetingListRequest, pageable);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{meetingId}")
    public ResponseEntity<MeetingDetailResponse> getMeetingDetail(@PathVariable long meetingId) {
        MeetingDetailResponse response = meetingService.getMeetingDetail(meetingId);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<MeetingIdResponse> createMeeting(@RequestBody MeetingCreateRequest meetingCreateRequest) {
        int memberId = 1;

        long meetingId = meetingService.createMeeting(memberId, meetingCreateRequest);
        return ResponseEntity.ok(new MeetingIdResponse(meetingId));
    }

    @PatchMapping("/{meetingId}")
    public ResponseEntity<MeetingIdResponse> updateMeeting(@PathVariable long meetingId,
                                           @RequestBody MeetingUpdateRequest meetingUpdateRequest) {
        meetingService.updateMeeting(meetingId, meetingUpdateRequest);
        return ResponseEntity.ok(new MeetingIdResponse(meetingId));
    }

    @DeleteMapping("/{meetingId}")
    public ResponseEntity<Void> deleteMeeting(@PathVariable long meetingId) {
        meetingService.deleteMeeting(meetingId);
        return ResponseEntity.noContent().build();
    }
}
