package com.team7.chaekin.domain.review.service;

import com.team7.chaekin.domain.book.entity.Book;
import com.team7.chaekin.domain.book.repository.BookRepository;
import com.team7.chaekin.domain.booklog.entity.BookLog;
import com.team7.chaekin.domain.booklog.repository.BookLogRepository;
import com.team7.chaekin.domain.member.entity.Member;
import com.team7.chaekin.domain.member.repository.MemberRepository;
import com.team7.chaekin.domain.review.dto.ReviewListDto;
import com.team7.chaekin.domain.review.dto.ReviewListResponse;
import com.team7.chaekin.domain.review.dto.ReviewRequest;
import com.team7.chaekin.domain.review.entity.Review;
import com.team7.chaekin.domain.review.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final BookRepository bookRepository;
    private final BookLogRepository bookLogRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public ReviewListResponse getReviewList(long bookId, long memberId, Pageable pageable) {
        Book book = getBook(bookId);
        Member member = getMember(memberId);
        BookLog bookLog = getBookLog(book, member);

        Page<Review> reviewPages = reviewRepository.findByBookLog(bookLog, pageable);

        int totalPages = reviewPages.getTotalPages();
        List<ReviewListDto> listDtos = reviewPages.toList().stream()
                .map(r -> ReviewListDto.builder()
                        .reviewId(r.getId())
                        .writer(r.getBookLog().getMember().getNickname())
                        .comment(r.getComment())
                        .score(r.getScore())
                        .build()).collect(Collectors.toList());
        return new ReviewListResponse(totalPages, listDtos);
    }

    @Transactional
    public long writeReview(long bookId, long memberId, ReviewRequest reviewRequest) {
        Book book = getBook(bookId);
        Member member = getMember(memberId);
        BookLog bookLog = getBookLog(book, member);

        return reviewRepository.save(Review.builder()
                        .bookLog(bookLog)
                        .comment(reviewRequest.getComment())
                        .score(reviewRequest.getScore()).build()).getId();
    }

    private BookLog getBookLog(Book book, Member member) {
        return bookLogRepository.findByMemberAndBook(member, book)
                .orElseThrow(() -> new RuntimeException("책을 읽은 기록이 없습니다."));
    }

    @Transactional
    public void updateReview(Long bookId, Long reviewId, Long memberId, ReviewRequest reviewRequest) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("해당 리뷰가 존재하지 않습니다."));
        BookLog bookLog = review.getBookLog();
        if (!bookId.equals(bookLog.getBook().getId())) {
            throw new RuntimeException("해당 리뷰의 도서가 아닙니다.");
        }
        if (!memberId.equals(bookLog.getMember().getId())) {
            throw new RuntimeException("수정 권한이 없습니다");
        }

        review.update(reviewRequest.getScore(), reviewRequest.getComment());
    }

    @Transactional
    public void deleteReview(Long bookId, Long reviewId, Long memberId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("해당 리뷰가 존재하지 않습니다."));
        BookLog bookLog = review.getBookLog();
        if (!bookId.equals(bookLog.getBook().getId())) {
            throw new RuntimeException("해당 리뷰의 도서가 아닙니다.");
        }
        if (!memberId.equals(bookLog.getMember().getId())) {
            throw new RuntimeException("수정 권한이 없습니다");
        }
        reviewRepository.delete(review);
    }

    private Member getMember(long memberId) {
        return memberRepository.findById(memberId).orElseThrow(RuntimeException::new);
    }

    private Book getBook(long bookId) {
        return bookRepository.findById(bookId).orElseThrow(RuntimeException::new);
    }

}
