package com.team7.chaekin.domain.book.service;

import com.team7.chaekin.domain.book.dto.*;
import com.team7.chaekin.domain.book.entity.Book;
import com.team7.chaekin.domain.book.repository.BookRepository;
import com.team7.chaekin.domain.booklog.entity.BookLog;
import com.team7.chaekin.domain.booklog.entity.ReadStatus;
import com.team7.chaekin.domain.booklog.repository.BookLogRepository;
import com.team7.chaekin.domain.member.entity.Member;
import com.team7.chaekin.domain.member.repository.MemberRepository;
import com.team7.chaekin.domain.wishlist.entity.WishList;
import com.team7.chaekin.domain.wishlist.repository.WishListRepository;
import com.team7.chaekin.global.error.exception.CustomException;
import com.team7.chaekin.global.notification.entity.FcmToken;
import com.team7.chaekin.global.notification.util.FCMUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.team7.chaekin.global.error.errorcode.DomainErrorCode.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class BookService {
    private final BookRepository bookRepository;

    private final BookLogRepository bookLogRepository;
    private final MemberRepository memberRepository;
    private final WishListRepository wishListRepository;
    private final FCMUtil fcmUtil;

    @Transactional
    @Scheduled(cron = "0 0 10 * * *") //TODO: 매일 몇 시에 보낼지 정하기
    protected void sendRemindNotification() {
        LocalDate date = LocalDate.now().minusMonths(1);
        List<BookLog> bookLogs = bookLogRepository.findByEndDateNotNullAndStartDateBefore(date);

        List<FcmToken> tokens = new ArrayList<>();
        bookLogs.stream().forEach(bookLog -> tokens.addAll(bookLog.getMember().getFcmTokens()));
        fcmUtil.sendMessage(tokens);
    }


    @Transactional(readOnly = true)
    public BookListResponse search(String keyword) {
        List<Book> books = bookRepository.findBookListBySearch(keyword);

        return new BookListResponse(books.stream()
                .map(book -> BookListDto.builder()
                        .bookId(book.getId())
                        .title(book.getTitle())
                        .cover(book.getCover())
                        .build()).collect(Collectors.toList()));
    }

    @Transactional
    public BookMyListResponse getMyBooks(long memberId, Boolean isReading) {
        Member member = getMember(memberId);
        ReadStatus readStatus = isReading ? ReadStatus.READING : ReadStatus.COMPLETE;

        List<BookLog> myBookLogList = bookLogRepository.findByMemberAndReadStatusEqualsOrderByStartDate(member, readStatus);

        List<BookMyDto> books = myBookLogList.stream().map(bookLog -> BookMyDto.builder()
                .bookId(bookLog.getBook().getId())
                .title(bookLog.getBook().getTitle())
                .author(bookLog.getBook().getAuthor())
                .cover(bookLog.getBook().getCover())
                .ratingScore(String.format("%.1f", bookLog.getBook().getRatingScore()))
                .build()).collect(Collectors.toList());
        return new BookMyListResponse(books);
    }

    @Transactional(readOnly = true)
    public BookDetailResponse detail(long bookId, long memberId) {
        Book book = getBook(bookId);
        Member member = getMember(memberId);

        WishList wishList = wishListRepository.findByMemberIdAndBookId(memberId, bookId)
                .orElse(null);
        BookLog bookLog = bookLogRepository.findByMemberAndBook(member, book)
                .orElse(null);

        return BookDetailResponse.builder()
                .bookId(book.getId())
                .isbn(book.getIsbn())
                .author(book.getAuthor())
                .description(book.getDescription())
                .cover(book.getCover())
                .title(book.getTitle())
                .ratingScore(String.format("%.1f", book.getRatingScore()))
                .isLiked(wishList != null && !wishList.isRemoved())
                .readStatus(bookLog != null ? bookLog.getReadStatus().name() : "NONE").build();
    }


    @Transactional
    public BookCalenderResponse getCalenderData(long memberId) {
        Member member = getMember(memberId);

        LocalDate now = LocalDate.now();
        int month = now.getMonthValue();
        int lastDay = now.lengthOfMonth();

        LocalDate firstDate = now.withDayOfMonth(1);
        LocalDate lastDate = now.withDayOfMonth(lastDay);
        List<BookLog> bookLogs = bookLogRepository
                .findByMemberAndStartDateBetweenOrderByStartDate(member, firstDate, lastDate);

        BookCalenderListDto[] calenderList = new BookCalenderListDto[lastDay];
        for (int i = 0, j = 0; i < lastDay; i++, j++) {
            int day = i + 1;
            List<BookCalenderDto> books = new ArrayList<>();
            while (j < bookLogs.size() && bookLogs.get(j).getStartDate().getDayOfMonth() == day) {
                books.add(BookCalenderDto.builder()
                                        .bookId(bookLogs.get(j).getBook().getId())
                                        .title(bookLogs.get(j++).getBook().getTitle()).build());
            }

            calenderList[i] = BookCalenderListDto.builder()
                    .day(i + 1)
                    .isExist(false)
                    .books(books).build();
        }
        return new BookCalenderResponse(month, calenderList);
    }

    @Transactional
    public BookReadResponse registerBook(String isbn, long memberId) {
        Book book = bookRepository.findByIsbn(isbn)
                .orElseThrow(() -> new CustomException(BOOK_IS_NOT_EXIST));
        Member member = getMember(memberId);

        BookReadResponse response = BookReadResponse.builder()
                .bookId(book.getId())
                .title(book.getTitle())
                .readStatus(ReadStatus.READING.name()).build();
        bookLogRepository.findByMemberAndBook(member, book)
                .ifPresentOrElse(bookLog -> {
                    bookLog.completeReadBook();
                    response.setReadStatus(ReadStatus.COMPLETE.name());
                }, () -> {
                    bookLogRepository.save(BookLog.builder()
                            .book(book)
                            .member(member)
                            .readStatus(ReadStatus.READING).build());
                    wishListRepository.findByMemberIdAndBookId(member.getId(), book.getId())
                            .ifPresent(wishList -> wishList.delete());

                    fcmUtil.sendMessage(member.getFcmTokens());
                });
        return response;
    }

    @Transactional
    public void endRead(long memberId, long bookId) {
        BookLog bookLog = bookLogRepository.findBookLogByMemberIdAndBookId(memberId, bookId)
                .orElseThrow(() -> new CustomException(BOOKLOG_IS_NOT_EXIST));
        bookLog.completeReadBook();
    }

    private Book getBook(long bookId) {
        return bookRepository.findById(bookId)
                .orElseThrow(() -> new CustomException(BOOK_IS_NOT_EXIST));
    }

    private Member getMember(long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(MEMBER_IS_NOT_EXIST));
    }

}
