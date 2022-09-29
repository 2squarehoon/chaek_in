package com.team7.chaekin.domain.booklog.repository;

import com.team7.chaekin.domain.book.entity.Book;
import com.team7.chaekin.domain.booklog.entity.BookLog;
import com.team7.chaekin.domain.booklog.entity.ReadStatus;
import com.team7.chaekin.domain.member.entity.Member;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface BookLogRepository extends JpaRepository<BookLog, Long> {
    Optional<BookLog> findByMemberAndBook(Member member, Book book);

    @Query("SELECT bl FROM BookLog bl " +
            "JOIN FETCH bl.book " +
            "WHERE bl.member.id = :memberId " +
            "AND bl.book.id = :bookId")
    Optional<BookLog> findBookLogByMemberIdAndBookId(@Param("memberId") long memberId, @Param("bookId") long bookId);

    List<BookLog> findByBookAndReadStatusEquals(Book book, ReadStatus readStatus);

    List<BookLog> findByMember(Member member);

    @EntityGraph(attributePaths = {"todayBooks"})
    List<BookLog> findWithTodayBooksByMember(Member member);

    @EntityGraph(attributePaths = {"book"})
    List<BookLog> findByMemberAndReadStatusEqualsOrderByStartDate(Member member, ReadStatus readStatus);

    @EntityGraph(attributePaths = {"book"})
    List<BookLog> findByMemberAndStartDateBetweenOrderByStartDate(Member member, LocalDate first, LocalDate last);

    @EntityGraph(attributePaths = {"member"})
    List<BookLog> findByEndDateNotNullAndStartDateBefore(LocalDate date);

}
