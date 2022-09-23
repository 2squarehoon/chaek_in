package com.team7.chaekin.domain.meeting.repository;

import com.team7.chaekin.domain.meeting.entity.Meeting;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MeetingRepository extends JpaRepository<Meeting, Long> {
    Page<Meeting> findByTitleContainingAndIsRemovedIsFalse(String title, Pageable pageable);

    Optional<Meeting> findByIdAndIsRemovedIsFalse(long id);
}
