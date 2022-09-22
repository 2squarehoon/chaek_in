package com.team7.chaekin.domain.book.service;

import com.team7.chaekin.domain.book.dto.BookDetailResponse;
import com.team7.chaekin.domain.book.dto.BookListDto;
import com.team7.chaekin.domain.book.dto.BookListResponse;
import com.team7.chaekin.domain.book.dto.BookSearchRequest;
import com.team7.chaekin.domain.book.entity.Book;
import com.team7.chaekin.domain.book.repository.BookRepository;
import com.team7.chaekin.domain.booklog.entity.BookLog;
import com.team7.chaekin.domain.booklog.repository.BookLogRepository;
import com.team7.chaekin.domain.member.entity.Member;
import com.team7.chaekin.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class BookService {
    private final BookRepository bookRepository;

    private final MemberRepository memberRepository;
    private final BookLogRepository bookLogRepository;

    @Transactional(readOnly = true)
    public BookListResponse search(BookSearchRequest bookSearchRequest, Pageable pageable) {
        Page<Book> page = bookRepository.findByTitleContaining(bookSearchRequest.getKeyword(), pageable).orElseThrow(() -> new NoSuchElementException("검색 결과가 존재하지 않습니다."));

        return new BookListResponse(page.stream().map(book -> BookListDto.builder().bookId(book.getId()).title(book.getTitle()).cover(book.getCover()).build()).collect(Collectors.toList()));
    }

    @Transactional(readOnly = true)
    public BookDetailResponse detail(long bookId) {
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new NoSuchElementException("검색 결과가 존재하지 않습니다."));

        return BookDetailResponse.builder().bookId(book.getId()).isbn(book.getIsbn()).author(book.getAuthor()).description(book.getDescription()).cover(book.getCover()).title(book.getTitle()).ratingScore(book.getRatingScore()).build();
    }

    @Transactional
    public void endRead(long memberId, long bookId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new NoSuchElementException("존재하지 않는 유저입니다."));
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new NoSuchElementException("해당 책이 존재하지 않습니다."));

        BookLog bookLog = bookLogRepository.findByMemberAndBook(member, book).get();
        bookLog.updateStatus();
    }
}
