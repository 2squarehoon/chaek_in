package com.team7.chaekin.domain.booklog.repository;

import com.team7.chaekin.domain.booklog.entity.BookLog;

import java.util.List;

public interface BookLogCustomRepository {
    int bulkSaveAll(List<BookLog> bookLogs);
}
