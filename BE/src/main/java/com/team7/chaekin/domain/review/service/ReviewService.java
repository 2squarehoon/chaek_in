package com.team7.chaekin.domain.review.service;

import com.team7.chaekin.domain.book.entity.Book;
import com.team7.chaekin.domain.book.repository.BookRepository;
import com.team7.chaekin.domain.booklog.entity.BookLog;
import com.team7.chaekin.domain.booklog.entity.ReadStatus;
import com.team7.chaekin.domain.booklog.repository.BookLogRepository;
import com.team7.chaekin.domain.member.entity.Member;
import com.team7.chaekin.domain.member.repository.MemberRepository;
import com.team7.chaekin.domain.review.dto.*;
import com.team7.chaekin.domain.review.entity.Review;
import com.team7.chaekin.domain.review.repository.ReviewRepository;
import com.team7.chaekin.global.error.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.team7.chaekin.global.error.errorcode.DomainErrorCode.*;

@RequiredArgsConstructor
@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final BookLogRepository bookLogRepository;
    private final BookRepository bookRepository;
    private final MemberRepository memberRepository;

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
    public void saveFirstRatings(long memberId, ReviewFirstRequest reviewFirstRequest) {
        Member member = getMember(memberId);
        List<ReviewFirstDto> ratings = getRatings(reviewFirstRequest);

        List<Book> books = findBooksOrderByIdAsc(ratings);

        List<BookLog> bookLogs = new ArrayList<>();
        for (int i = 0, j = 0; i < books.size() && j < ratings.size(); i++, j++) {
            Book book = books.get(i);
            ReviewFirstDto dto = ratings.get(j);
            while (isNotBookRating(book, dto) && ++j < ratings.size()) {
                dto = ratings.get(j);
            }
            if (isNotBookRating(book, dto)) {
                continue;
            }

            book.addScore(dto.getScore());
            bookLogs.add(BookLog.builder()
                            .book(book)
                            .member(member)
                            .readStatus(ReadStatus.COMPLETE).build());
        }
        bookLogRepository.saveAll(bookLogs);
    }

    private List<ReviewFirstDto> getRatings(ReviewFirstRequest reviewFirstRequest) {
        List<ReviewFirstDto> ratings = reviewFirstRequest.getRatings();
        ratings.sort((o1, o2) -> compareTo(o1.getBookId(), o2.getBookId()));
        return ratings;
    }

    private boolean isNotBookRating(Book book, ReviewFirstDto reviewFirstDto) {
        return !book.getId().equals(reviewFirstDto.getBookId());
    }

    private Member getMember(long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(MEMBER_IS_NOT_EXIST));
        return member;
    }

    private List<Book> findBooksOrderByIdAsc(List<ReviewFirstDto> ratings) {
        List<Long> bookIds = ratings.stream()
                .map(dto -> dto.getBookId()).collect(Collectors.toList());
        List<Book> books = bookRepository.findByBookIds(bookIds);
        return books;
    }

    private int compareTo(long a, long b) {
        if (a > b) {
            return 1;
        } else if (a < b) {
            return -1;
        }
        return 0;
    }

    @Transactional
    public long writeReview(long bookId, long memberId, ReviewRequest reviewRequest) {
        BookLog bookLog = getBookLog(bookId, memberId);

        bookLog.getBook().addScore(reviewRequest.getScore());

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

        bookLog.getBook().updateScore(review.getScore(), reviewRequest.getScore());

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
        bookLog.getBook().deleteScore(review.getScore());

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
