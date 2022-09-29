package com.team7.chaekin.domain.meeting.repository;

import com.team7.chaekin.domain.meeting.entity.Meeting;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface MeetingRepositoryCustom {
    Page<Meeting> searchMeetingList(String keyword, Pageable pageable);
}
