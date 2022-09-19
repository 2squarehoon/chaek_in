package com.team7.chaekin.domain.meetingcomment.controller;

import com.team7.chaekin.domain.meetingcomment.dto.MeetingCommentCreateRequest;
import com.team7.chaekin.domain.meetingcomment.dto.MeetingCommentIdResponse;
import com.team7.chaekin.domain.meetingcomment.dto.MeetingCommentListResponse;
import com.team7.chaekin.domain.meetingcomment.dto.MeetingCommentUpdateRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/v1/meetings")
@RestController
public class MeetingCommentController {

    @GetMapping("/{meetingId}/comments")
    public ResponseEntity<MeetingCommentListResponse> getMeetingComments(@PathVariable long meetingId) {
        return ResponseEntity.ok(new MeetingCommentListResponse());
    }

    @PostMapping("/{meetingId}/comments")
    public ResponseEntity<MeetingCommentIdResponse> createMeetingComment(@PathVariable long meetingId,
                                                @RequestBody MeetingCommentCreateRequest CommentCreateRequest) {
        return ResponseEntity.ok(new MeetingCommentIdResponse());
    }

    @PatchMapping("/{meetingId}/comments/{meetingCommentId}")
    public ResponseEntity<MeetingCommentIdResponse> updateMeetingComment(@PathVariable long meetingId,
                                                @RequestBody MeetingCommentUpdateRequest commentUpdateRequest) {
        return ResponseEntity.ok(new MeetingCommentIdResponse());
    }

    @DeleteMapping("/{meetingId}/comments/{meetingCommentId}")
    public ResponseEntity<Void> deleteMeetingComment(@PathVariable long meetingId) {
        return ResponseEntity.noContent().build();
    }

}
