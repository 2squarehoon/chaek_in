package com.team7.chaekin.domain.review.controller;

import com.team7.chaekin.domain.report.dto.ReportIdResponse;
import com.team7.chaekin.domain.review.dto.AllReviewListResponse;
import com.team7.chaekin.domain.review.dto.ReviewRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/books")
@CrossOrigin(origins = "*")
public class RiviewController {

    @GetMapping("/{bookId}/reviews")
    public ResponseEntity<?> getAllReViewList(@PathVariable long bookId, Pageable pageable) throws Exception {
        return ResponseEntity.ok(new AllReviewListResponse());
    }

    @PostMapping("/{bookId}/reviews")
    public ResponseEntity<?> writeReview(@PathVariable long bookId, @RequestBody ReviewRequest reviewRequest) throws Exception {

        return ResponseEntity.ok(new ReportIdResponse());
    }

    @PatchMapping("/{bookId}/reviews/{reviewId}")
    public ResponseEntity<?> modifyReport(@PathVariable long bookId, @PathVariable Long reviewId, @RequestBody ReviewRequest reviewRequest) throws Exception {
        return ResponseEntity.ok(new ReportIdResponse());
    }

    @DeleteMapping("/{bookId}/reviews/{reviewId}")
    public ResponseEntity<?> deleteReview(@PathVariable long bookId, @PathVariable Long reviewId) throws Exception {
        return ResponseEntity.noContent().build();
    }

}
