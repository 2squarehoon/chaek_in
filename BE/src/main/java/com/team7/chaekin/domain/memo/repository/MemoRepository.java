package com.team7.chaekin.domain.memo.repository;

import com.team7.chaekin.domain.booklog.entity.BookLog;
import com.team7.chaekin.domain.memo.entity.Memo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemoRepository extends JpaRepository<Memo, Long> {
    List<Memo> findByBookLog(BookLog bookLog);
}
