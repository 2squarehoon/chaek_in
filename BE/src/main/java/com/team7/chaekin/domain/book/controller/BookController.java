package com.team7.chaekin.domain.book.controller;

import com.team7.chaekin.domain.book.dto.*;
import com.team7.chaekin.domain.book.service.BookService;
import com.team7.chaekin.global.oauth.config.LoginMemberId;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequestMapping("/api/v1/books")
@RestController
@RequiredArgsConstructor
@Slf4j
public class BookController {

    private final BookService bookService;

    @GetMapping
    public ResponseEntity<?> searchBook(@Valid BookSearchRequest bookSearchRequest){
        BookListResponse bookListResponse = bookService.search(bookSearchRequest.getKeyword());
        return ResponseEntity.ok(bookListResponse);
    }

    @GetMapping("/me")
    public ResponseEntity<BookMyListResponse> getMyBooks(@RequestParam(defaultValue = "true") Boolean isReading, @LoginMemberId long memberId) {
        return ResponseEntity.ok(bookService.getMyBooks(memberId, isReading));
    }

    @GetMapping("/{bookId}")
    public ResponseEntity<?> getBookDetail(@PathVariable long bookId, @LoginMemberId long memberId) {
        BookDetailResponse bookDetailResponse = bookService.detail(bookId, memberId);
        return ResponseEntity.ok(bookDetailResponse);
    }

    @GetMapping("/calender")
    public ResponseEntity<?> getCalenderData(@LoginMemberId long memberId) {
        return ResponseEntity.ok(bookService.getCalenderData(memberId));
    }

    @PostMapping
    public ResponseEntity<BookReadResponse> startReadBook(@Valid @RequestBody BookReadRequest bookReadRequest, @LoginMemberId long memberId) {
        return ResponseEntity.ok(bookService.registReadBook(bookReadRequest.getIsbn(), memberId));
    }

    @PatchMapping("/{bookId}/complete")
    public ResponseEntity<?> endReadBook(@LoginMemberId long memberId, @PathVariable long bookId){
        bookService.endRead(memberId, bookId);
        return ResponseEntity.ok().build();
    }

}
