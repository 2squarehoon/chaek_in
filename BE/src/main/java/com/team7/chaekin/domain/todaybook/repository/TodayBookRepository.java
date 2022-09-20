package com.team7.chaekin.domain.todaybook.repository;

import com.team7.chaekin.domain.member.entity.Member;
import com.team7.chaekin.domain.todaybook.entity.TodayBook;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface TodayBookRepository extends JpaRepository<TodayBook, Long> {
    Optional<List<TodayBook>> findByMemberAndCreatedAtBetween(Member member, LocalDateTime start, LocalDateTime end);
}
