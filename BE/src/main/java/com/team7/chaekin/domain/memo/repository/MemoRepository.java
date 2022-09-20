package com.team7.chaekin.domain.memo.repository;

import com.team7.chaekin.domain.memo.entity.Memo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemoRepository extends JpaRepository<Memo, Long> {
}
