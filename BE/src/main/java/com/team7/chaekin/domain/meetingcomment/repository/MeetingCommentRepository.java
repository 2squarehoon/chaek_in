package com.team7.chaekin.domain.meetingcomment.repository;

import com.team7.chaekin.domain.meetingcomment.entity.MeetingComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MeetingCommentRepository extends JpaRepository<MeetingComment, Long> {
}
