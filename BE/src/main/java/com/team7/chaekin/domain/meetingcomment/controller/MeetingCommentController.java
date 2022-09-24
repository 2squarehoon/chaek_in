package com.team7.chaekin.domain.meetingcomment.controller;

import com.team7.chaekin.domain.meetingcomment.dto.MeetingCommentCreateRequest;
import com.team7.chaekin.domain.meetingcomment.dto.MeetingCommentIdResponse;
import com.team7.chaekin.domain.meetingcomment.dto.MeetingCommentListResponse;
import com.team7.chaekin.domain.meetingcomment.dto.MeetingCommentUpdateRequest;
import com.team7.chaekin.domain.meetingcomment.service.MeetingCommentService;
import com.team7.chaekin.global.oauth.config.LoginMemberId;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequiredArgsConstructor
@RequestMapping("/api/v1/meetings")
@RestController
public class MeetingCommentController {

    private final MeetingCommentService meetingCommentService;

    @GetMapping("/{meetingId}/comments")
    public ResponseEntity<MeetingCommentListResponse> getMeetingComments(@PathVariable long meetingId, Pageable pageable) {
        return ResponseEntity.ok(meetingCommentService.getMeetingComments(meetingId, pageable));
    }

    @PostMapping("/{meetingId}/comments")
    public ResponseEntity<MeetingCommentIdResponse> createMeetingComment(@PathVariable long meetingId, @LoginMemberId long memberId,
                                                @RequestBody @Valid MeetingCommentCreateRequest meetingCommentCreateRequest) {
        long meetingCommentId = meetingCommentService.createComment(meetingId, memberId, meetingCommentCreateRequest);
        return ResponseEntity.ok(new MeetingCommentIdResponse(meetingCommentId));
    }

    @PatchMapping("/{meetingId}/comments/{meetingCommentId}")
    public ResponseEntity<MeetingCommentIdResponse> updateMeetingComment(@PathVariable long meetingId, @PathVariable long meetingCommentId,
                                                                         @LoginMemberId long memberId, @RequestBody @Valid MeetingCommentUpdateRequest meetingCommentUpdateRequest) {
        long id = meetingCommentService.updateMeetingComment(meetingId, meetingCommentId, memberId, meetingCommentUpdateRequest);
        return ResponseEntity.ok(new MeetingCommentIdResponse(id));
    }

    @DeleteMapping("/{meetingId}/comments/{meetingCommentId}")
    public ResponseEntity<Void> deleteMeetingComment(@PathVariable long meetingId, @PathVariable long meetingCommentId,
                                                     @LoginMemberId long memberId) {
        meetingCommentService.deleteMeetingComment(meetingId, memberId, meetingCommentId);
        return ResponseEntity.noContent().build();
    }

}
