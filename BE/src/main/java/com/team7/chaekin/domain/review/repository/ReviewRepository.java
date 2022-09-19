package com.team7.chaekin.domain.review.repository;

import com.team7.chaekin.domain.review.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
