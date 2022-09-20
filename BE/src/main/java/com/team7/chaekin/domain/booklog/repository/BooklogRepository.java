package com.team7.chaekin.domain.booklog.repository;

import com.team7.chaekin.domain.booklog.entity.BookLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BooklogRepository extends JpaRepository<BookLog, Long> {
}
