package com.team7.chaekin.domain.review.repository;

import com.team7.chaekin.domain.booklog.entity.BookLog;
import com.team7.chaekin.domain.review.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    @EntityGraph(attributePaths = {"bookLog"}) //, "bookLog.Member"
    Page<Review> findByBookLog(BookLog book, Pageable pageable);
}
