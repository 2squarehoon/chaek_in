package com.team7.chaekin.domain.review.repository;

import com.team7.chaekin.domain.booklog.entity.BookLog;
import com.team7.chaekin.domain.review.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("SELECT r FROM Review r " +
            "WHERE r.bookLog IN :bookLogs")
    Page<Review> findByBookLogs(@Param("bookLogs") List<BookLog> bookLogs, Pageable pageable);
}
