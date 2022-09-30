package com.team7.chaekin.domain.meeting.repository;

import com.team7.chaekin.domain.meeting.entity.Meeting;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MeetingRepository extends JpaRepository<Meeting, Long>, MeetingRepositoryCustom {
    Page<Meeting> findByTitleContainingAndIsRemovedIsFalse(String title, Pageable pageable);

    List<Meeting> findAllByIsRemovedIsFalse();

    Optional<Meeting> findByIdAndIsRemovedIsFalse(long id);

}
