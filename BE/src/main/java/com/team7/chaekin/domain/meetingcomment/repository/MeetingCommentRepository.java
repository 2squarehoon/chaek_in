package com.team7.chaekin.domain.meetingcomment.repository;

import com.team7.chaekin.domain.meeting.entity.Meeting;
import com.team7.chaekin.domain.meetingcomment.entity.MeetingComment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MeetingCommentRepository extends JpaRepository<MeetingComment, Long> {

    @EntityGraph(attributePaths = {"meeting", "member"})
    Page<MeetingComment> findByMeeting(Meeting meeting, Pageable pageable);
}
