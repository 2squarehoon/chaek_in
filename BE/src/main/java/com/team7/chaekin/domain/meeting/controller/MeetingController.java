package com.team7.chaekin.domain.meeting.controller;

import com.team7.chaekin.domain.meeting.dto.*;
import com.team7.chaekin.domain.meeting.service.MeetingService;
import com.team7.chaekin.global.oauth.config.LoginMemberId;
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
        return ResponseEntity.ok(meetingService.getMeetings(meetingListRequest, pageable));
    }

    @GetMapping("/{meetingId}")
    public ResponseEntity<MeetingDetailResponse> getMeetingDetail(@PathVariable long meetingId) {
        return ResponseEntity.ok(meetingService.getMeetingDetail(meetingId));
    }

    @PostMapping
    public ResponseEntity<MeetingIdResponse> createMeeting(@RequestBody MeetingCreateRequest meetingCreateRequest,
                                                           @LoginMemberId long memberId) {
        long meetingId = meetingService.createMeeting(memberId, meetingCreateRequest);
        return ResponseEntity.ok(new MeetingIdResponse(meetingId));
    }

    @PatchMapping("/{meetingId}")
    public ResponseEntity<MeetingIdResponse> updateMeeting(@PathVariable long meetingId, @LoginMemberId long memberId,
                                           @RequestBody MeetingUpdateRequest meetingUpdateRequest) {
        meetingService.updateMeeting(meetingId, meetingUpdateRequest);
        return ResponseEntity.ok(new MeetingIdResponse(meetingId));
    }

    @DeleteMapping("/{meetingId}")
    public ResponseEntity<Void> deleteMeeting(@PathVariable long meetingId, @LoginMemberId long memberId) {
        meetingService.deleteMeeting(meetingId);
        return ResponseEntity.noContent().build();
    }
}
