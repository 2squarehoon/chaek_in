package com.team7.chaekin.domain.todaybook.repository;

import com.team7.chaekin.domain.todaybook.entity.TodayBook;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodayBookRepository extends JpaRepository<TodayBook, Long> {
}
