package com.team7.chaekin.domain.review.controller;

import com.team7.chaekin.domain.review.dto.ReviewIdResponse;
import com.team7.chaekin.domain.review.dto.ReviewRequest;
import com.team7.chaekin.domain.review.service.ReviewService;
import com.team7.chaekin.global.oauth.config.LoginMemberId;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/books")
@RestController
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/{bookId}/reviews")
    public ResponseEntity<?> getReviewList(@PathVariable long bookId, Pageable pageable,
                                           @LoginMemberId long memberId) {
        return ResponseEntity.ok(reviewService.getReviewList(bookId, memberId, pageable));
    }

    @PostMapping("/{bookId}/reviews")
    public ResponseEntity<?> writeReview(@PathVariable long bookId, @RequestBody ReviewRequest reviewRequest,
                                         @LoginMemberId long memberId) {
        long reviewId = reviewService.writeReview(bookId, memberId, reviewRequest);
        return ResponseEntity.ok(new ReviewIdResponse(reviewId));
    }

    @PatchMapping("/{bookId}/reviews/{reviewId}")
    public ResponseEntity<?> updateReview(@PathVariable long bookId, @PathVariable long reviewId,
                                          @RequestBody ReviewRequest reviewRequest,
                                          @LoginMemberId long memberId) {
        reviewService.updateReview(bookId, reviewId, memberId, reviewRequest);
        return ResponseEntity.ok(new ReviewIdResponse(reviewId));
    }

    @DeleteMapping("/{bookId}/reviews/{reviewId}")
    public ResponseEntity<?> deleteReview(@PathVariable long bookId, @PathVariable long reviewId,
                                          @LoginMemberId long memberId) {
        reviewService.deleteReview(bookId, reviewId, memberId);
        return ResponseEntity.noContent().build();
    }

}
