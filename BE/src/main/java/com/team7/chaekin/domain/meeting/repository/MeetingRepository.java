package com.team7.chaekin.domain.meeting.repository;

import com.team7.chaekin.domain.meeting.entity.Meeting;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MeetingRepository extends JpaRepository<Meeting, Long> {
    Page<Meeting> findByTitleContaining(String title, Pageable pageable);
}
