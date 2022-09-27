package com.team7.chaekin.domain.review.controller;

import com.team7.chaekin.domain.review.dto.ReviewFirstRequest;
import com.team7.chaekin.domain.review.dto.ReviewIdResponse;
import com.team7.chaekin.domain.review.dto.ReviewListResponse;
import com.team7.chaekin.domain.review.dto.ReviewRequest;
import com.team7.chaekin.domain.review.service.ReviewService;
import com.team7.chaekin.global.oauth.config.LoginMemberId;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1")
@RestController
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/books/{bookId}/reviews")
    public ResponseEntity<ReviewListResponse> getReviewList(@PathVariable long bookId, Pageable pageable,
                                                            @LoginMemberId long memberId) {
        return ResponseEntity.ok(reviewService.getReviewList(bookId, memberId, pageable));
    }

    @PostMapping("/reviews/me")
    public ResponseEntity<Void> firstRatings(@RequestBody @Valid ReviewFirstRequest reviewFirstRequest,
                                          @LoginMemberId long memberId) {
        reviewService.saveFirstRatings(memberId, reviewFirstRequest);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/books/{bookId}/reviews")
    public ResponseEntity<?> writeReview(@PathVariable long bookId, @RequestBody @Valid ReviewRequest reviewRequest,
                                         @LoginMemberId long memberId) {
        long reviewId = reviewService.writeReview(bookId, memberId, reviewRequest);
        return ResponseEntity.ok(new ReviewIdResponse(reviewId));
    }

    @PatchMapping("/books/{bookId}/reviews/{reviewId}")
    public ResponseEntity<?> updateReview(@PathVariable long bookId, @PathVariable long reviewId,
                                          @RequestBody @Valid ReviewRequest reviewRequest,
                                          @LoginMemberId long memberId) {
        reviewService.updateReview(bookId, reviewId, memberId, reviewRequest);
        return ResponseEntity.ok(new ReviewIdResponse(reviewId));
    }

    @DeleteMapping("/books/{bookId}/reviews/{reviewId}")
    public ResponseEntity<?> deleteReview(@PathVariable long bookId, @PathVariable long reviewId,
                                          @LoginMemberId long memberId) {
        reviewService.deleteReview(bookId, reviewId, memberId);
        return ResponseEntity.noContent().build();
    }

}
