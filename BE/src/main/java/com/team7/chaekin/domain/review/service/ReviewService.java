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
import java.util.*;
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
                        .score(String.format("%.1f", r.getScore()))
                        .isMine(r.getBookLog().getMember().getId().equals(memberId))
                        .build()).collect(Collectors.toList());
        Boolean isWritten = checkWrittenReview(dtos);
        return new ReviewListResponse(totalPages, isWritten, dtos);
    }

    @Transactional
    public void saveFirstRatings(long memberId, ReviewFirstRequest reviewFirstRequest) {
        List<ReviewFirstDto> filtered = filteringDuplicatedRating(reviewFirstRequest.getRatings());
        filtered.sort((o1, o2) -> compareTo(o1.getBookId(), o2.getBookId()));

        List<Book> books = bookRepository.findByBookIds(filtered.stream()
                .map(dto -> dto.getBookId())
                .collect(Collectors.toList()));
        Member member = getMember(memberId);

        List<BookLog> bookLogs = new ArrayList<>();
        for (int i = 0, j = 0; i < books.size() && j < filtered.size(); i++, j++) {
            Book book = books.get(i);
            ReviewFirstDto dto = filtered.get(j);
            while (isNotBookRating(book, dto) && ++j < filtered.size()) {
                dto = filtered.get(j);
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

    private Boolean checkWrittenReview(List<ReviewListDto> dtos) {
        return dtos.stream().filter(reviewListDto -> reviewListDto.getIsMine()).count() > 0;
    }

    private List<ReviewFirstDto> filteringDuplicatedRating(List<ReviewFirstDto> ratings) {
        Collections.reverse(ratings);
        Set<Long> bookIdSet = new HashSet<>();
        List<ReviewFirstDto> filtered = ratings.stream()
                .filter(reviewFirstDto -> bookIdSet.add(reviewFirstDto.getBookId()))
                .collect(Collectors.toList());
        return filtered;
    }

    private boolean isNotBookRating(Book book, ReviewFirstDto reviewFirstDto) {
        return !book.getId().equals(reviewFirstDto.getBookId());
    }

    private Member getMember(long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(MEMBER_IS_NOT_EXIST));
        return member;
    }

    private int compareTo(long a, long b) {
        if (a > b) {
            return 1;
        } else if (a < b) {
            return -1;
        }
        return 0;
    }
}
