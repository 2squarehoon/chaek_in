package com.team7.chaekin.domain.booklog.repository;

import com.team7.chaekin.domain.booklog.entity.BookLog;
import lombok.RequiredArgsConstructor;

import javax.persistence.EntityManager;
import java.util.List;

@RequiredArgsConstructor
public class BookLogRepositoryImpl implements BookLogCustomRepository {

    private final EntityManager em;

    @Override
    public int bulkSaveAll(List<BookLog> bookLogs) {
        return 0;
    }
}
