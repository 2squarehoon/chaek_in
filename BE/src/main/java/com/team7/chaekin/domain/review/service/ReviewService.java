package com.team7.chaekin.domain.review.service;

import com.team7.chaekin.domain.booklog.entity.BookLog;
import com.team7.chaekin.domain.booklog.repository.BookLogRepository;
import com.team7.chaekin.domain.review.dto.ReviewListDto;
import com.team7.chaekin.domain.review.dto.ReviewListResponse;
import com.team7.chaekin.domain.review.dto.ReviewRequest;
import com.team7.chaekin.domain.review.entity.Review;
import com.team7.chaekin.domain.review.repository.ReviewRepository;
import com.team7.chaekin.global.error.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

import static com.team7.chaekin.global.error.errorcode.DomainErrorCode.*;

@RequiredArgsConstructor
@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final BookLogRepository bookLogRepository;

    @Transactional
    public ReviewListResponse getReviewList(long bookId, long memberId, Pageable pageable) {
        BookLog bookLog = getBookLog(bookId, memberId);
        Page<Review> reviewPages = reviewRepository.findByBookLog(bookLog, pageable);

        int totalPages = reviewPages.getTotalPages();
        List<ReviewListDto> dtos = reviewPages.toList().stream()
                .map(r -> ReviewListDto.builder()
                        .reviewId(r.getId())
                        .writer(r.getBookLog().getMember().getNickname())
                        .comment(r.getComment())
                        .score(r.getScore())
                        .build()).collect(Collectors.toList());
        return new ReviewListResponse(totalPages, dtos);
    }

    @Transactional
    public long writeReview(long bookId, long memberId, ReviewRequest reviewRequest) {
        BookLog bookLog = getBookLog(bookId, memberId);

        return reviewRepository.save(Review.builder()
                        .bookLog(bookLog)
                        .comment(reviewRequest.getComment())
                        .score(reviewRequest.getScore()).build()).getId();
    }

    @Transactional
    public void updateReview(Long bookId, Long reviewId, Long memberId, ReviewRequest reviewRequest) {
        Review review = getReview(reviewId);
        BookLog bookLog = review.getBookLog();
        if (!bookId.equals(bookLog.getBook().getId())) {
            throw new CustomException(INVALID_BOOK_ID);
        }
        if (!memberId.equals(bookLog.getMember().getId())) {
            throw new CustomException(DO_NOT_HAVE_AUTHORIZATION);
        }

        review.update(reviewRequest.getScore(), reviewRequest.getComment());
    }

    @Transactional
    public void deleteReview(Long bookId, Long reviewId, Long memberId) {
        Review review = getReview(reviewId);
        BookLog bookLog = review.getBookLog();
        if (!bookId.equals(bookLog.getBook().getId())) {
            throw new CustomException(INVALID_BOOK_ID);
        }
        if (!memberId.equals(bookLog.getMember().getId())) {
            throw new CustomException(DO_NOT_HAVE_AUTHORIZATION);
        }
        reviewRepository.delete(review);
    }

    private Review getReview(Long reviewId) {
        return reviewRepository.findById(reviewId)
                .orElseThrow(() -> new CustomException(REVIEW_IS_NOT_EXIST));
    }

    private BookLog getBookLog(long bookId, long memberId) {
        return bookLogRepository.findBookLogByMemberIdAndBookId(memberId, bookId)
                .orElseThrow(() -> new CustomException(BOOKLOG_IS_NOT_EXIST));
    }
}
