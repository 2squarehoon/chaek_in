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
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

    @Transactional(readOnly = true)
    public BookListResponse search(String keyword) {
        List<Book> books = bookRepository.findBookListBySearch(keyword);

        return new BookListResponse(books.stream()
                .map(book -> BookListDto.builder()
                        .bookId(book.getId())
                        .title(book.getTitle())
                        .author(book.getAuthor())
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
    public BookCalendarResponse getCalendarData(int month, long memberId) {
        Member member = getMember(memberId);

        LocalDate now = LocalDate.now();
        int lastDay = now.lengthOfMonth();
        int today = now.getDayOfMonth();

        LocalDate firstDate = LocalDate.of(now.getYear(), month, 1);
        LocalDate lastDate = firstDate.withDayOfMonth(lastDay);
        List<BookLog> bookLogs = bookLogRepository
                .findByMemberAndStartDateBetweenOrderByStartDate(member, firstDate, lastDate);

        BookCalendarListDto[] calenderList = new BookCalendarListDto[lastDay];
        for (int i = 0; i < lastDay; i++) {
            String day = makeDayString(i);
            calenderList[i] = BookCalendarListDto.builder()
                    .date(now.getYear() + "-" + month + "-" + day)
                    .books(new ArrayList<>()).build();
        }

        bookLogs.stream().forEach(bookLog -> {
            boolean startFlag = false;
            int startDay = bookLog.getStartDate().getDayOfMonth();
            if (bookLog.getStartDate().getMonthValue() != month) {
                startDay = 1;
                startFlag = true;
            }
            boolean endFlag = false;
            int endDay = 0;
            if (bookLog.getEndDate() != null && bookLog.getEndDate().getMonthValue() == month) {
                endDay = bookLog.getEndDate().getDayOfMonth();
            } else {
                endDay = today;
                endFlag = true;
            }

            boolean isStart = true;
            int index = 0;
            for (int i = startDay - 1; i < endDay; i++) {
                if (isStart) {
                    isStart = false;
                    index = findFirstIndex(calenderList[startDay - 1].getBooks());
                }

                List<BookCalendarDto> calendarDtos = calenderList[i].getBooks();
                while (calendarDtos.size() <= index) {
                    calendarDtos.add(BookCalendarDto.builder().build());
                }
                calendarDtos.add(index, BookCalendarDto.builder()
                        .bookId(bookLog.getBook().getId())
                        .title(bookLog.getBook().getTitle())
                        .isStartDay((i == startDay - 1) && !startFlag ? true : false)
                        .isEndDay((i == endDay - 1) && !endFlag ? true : false).build());
            }
        });
        return new BookCalendarResponse(calenderList);
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

    public BookPeopleResponse getReadingPeopleNumber(long bookId) {
        Book book = getBook(bookId);
        int numberOfPeople = bookLogRepository.findByBookAndReadStatusEquals(book, ReadStatus.READING).size();
        return new BookPeopleResponse(bookId, numberOfPeople);
    }

    private String makeDayString(int index) {
        return index < 9 ? "0" + (index + 1) : "" + (index + 1);
    }

    private int findFirstIndex(List<BookCalendarDto> books) {
        int index = 0;
        while (index < books.size() && !books.get(index).isEmpty()) {
            index++;
        }
        return index;
    }
}
