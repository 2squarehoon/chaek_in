package com.team7.chaekin.domain.book.service;

import com.team7.chaekin.domain.book.dto.*;
import com.team7.chaekin.domain.book.entity.Book;
import com.team7.chaekin.domain.book.repository.BookRepository;
import com.team7.chaekin.domain.booklog.entity.BookLog;
import com.team7.chaekin.domain.booklog.entity.ReadStatus;
import com.team7.chaekin.domain.booklog.repository.BookLogRepository;
import com.team7.chaekin.domain.member.entity.Member;
import com.team7.chaekin.domain.member.repository.MemberRepository;
import com.team7.chaekin.global.error.exception.CustomException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional(readOnly = true)
    public BookListResponse search(BookSearchRequest bookSearchRequest, Pageable pageable) {
        Page<Book> page = bookRepository.findByTitleContaining(bookSearchRequest.getKeyword(), pageable);

        return new BookListResponse(page.toList().stream()
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
    public BookDetailResponse detail(long bookId) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new CustomException(BOOK_IS_NOT_EXIST));

        return BookDetailResponse.builder()
                .bookId(book.getId())
                .isbn(book.getIsbn())
                .author(book.getAuthor())
                .description(book.getDescription())
                .cover(book.getCover())
                .title(book.getTitle())
                .ratingScore(String.format("%.1f", book.getRatingScore())).build();
    }

    @Transactional
    public void startReadBook(long bookId, long memberId) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new CustomException(BOOK_IS_NOT_EXIST));
        Member member = getMember(memberId);
        bookLogRepository.findByMemberAndBook(member, book)
                .ifPresent(bookLog -> {
                    throw new CustomException(ALREADY_REGIST_MEMBER);
                });

        bookLogRepository.save(BookLog.builder()
                .book(book)
                .member(member)
                .readStatus(ReadStatus.READING).build());
    }

    private Member getMember(long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(MEMBER_IS_NOT_EXIST));
        return member;
    }

    @Transactional
    public void endRead(long memberId, long bookId) {
        BookLog bookLog = bookLogRepository.findBookLogByMemberIdAndBookId(memberId, bookId)
                .orElseThrow(() -> new CustomException(BOOKLOG_IS_NOT_EXIST));
        bookLog.updateStatus();
    }

}
