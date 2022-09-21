package com.team7.chaekin.domain.booklog.repository;

import com.team7.chaekin.domain.book.entity.Book;
import com.team7.chaekin.domain.booklog.entity.BookLog;
import com.team7.chaekin.domain.member.entity.Member;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookLogRepository extends JpaRepository<BookLog, Long> {
    Optional<BookLog> findByMemberAndBook(Member member, Book book);

    Optional<List<BookLog>> findByMember(Member member);

    @EntityGraph(attributePaths = {"todayBooks"})
    Optional<List<BookLog>> findWithTodayBooksByMember(Member member);
}
