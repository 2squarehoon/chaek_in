package com.team7.chaekin.domain.book.service;

import com.team7.chaekin.domain.book.dto.BookDetailResponse;
import com.team7.chaekin.domain.book.dto.BookListDto;
import com.team7.chaekin.domain.book.dto.BookListResponse;
import com.team7.chaekin.domain.book.dto.BookSearchRequest;
import com.team7.chaekin.domain.book.entity.Book;
import com.team7.chaekin.domain.book.repository.BookRepository;
import com.team7.chaekin.domain.booklog.entity.BookLog;
import com.team7.chaekin.domain.booklog.repository.BookLogRepository;
import com.team7.chaekin.global.error.exception.CustomException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

import static com.team7.chaekin.global.error.errorcode.DomainErrorCode.BOOKLOG_IS_NOT_EXIST;
import static com.team7.chaekin.global.error.errorcode.DomainErrorCode.BOOK_IS_NOT_EXIST;

@Service
@RequiredArgsConstructor
@Slf4j
public class BookService {
    private final BookRepository bookRepository;

    private final BookLogRepository bookLogRepository;

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

    @Transactional(readOnly = true)
    public BookDetailResponse detail(long bookId) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new CustomException(BOOK_IS_NOT_EXIST));

        return BookDetailResponse.builder().bookId(book.getId()).isbn(book.getIsbn()).author(book.getAuthor()).description(book.getDescription()).cover(book.getCover()).title(book.getTitle()).ratingScore(book.getRatingScore()).build();
    }

    @Transactional
    public void endRead(long memberId, long bookId) {
        BookLog bookLog = bookLogRepository.findBookLogByMemberIdAndBookId(memberId, bookId)
                .orElseThrow(() -> new CustomException(BOOKLOG_IS_NOT_EXIST));
        bookLog.updateStatus();
    }
}
