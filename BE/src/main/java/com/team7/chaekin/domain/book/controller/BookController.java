package com.team7.chaekin.domain.book.controller;

import com.team7.chaekin.domain.book.dto.*;
import com.team7.chaekin.domain.book.service.BookService;
import com.team7.chaekin.global.oauth.config.LoginMemberId;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin
@RequestMapping("/api/v1/books")
@RestController
@RequiredArgsConstructor
@Slf4j
public class BookController {

    private final BookService bookService;

    @GetMapping
    public ResponseEntity<?> searchBook(@RequestBody BookSearchRequest bookSearchRequest,
                                        Pageable pageable){
        BookListResponse bookListResponse = bookService.search(bookSearchRequest, pageable);
        return ResponseEntity.ok(bookListResponse);
    }

    @GetMapping("/me")
    public ResponseEntity<BookMyListResponse> getMyBooks(@RequestParam(defaultValue = "true") Boolean isReading, @LoginMemberId long memberId) {
        return ResponseEntity.ok(bookService.getMyBooks(memberId, isReading));
    }

    @PostMapping("/{bookId}")
    public ResponseEntity<?> startReadBook(@PathVariable long bookId, @LoginMemberId long memberId) {
        bookService.startReadBook(bookId, memberId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{bookId}")
    public ResponseEntity<?> getBookDetail(@PathVariable long bookId){
        BookDetailResponse bookDetailResponse = bookService.detail(bookId);
        return ResponseEntity.ok(bookDetailResponse);
    }

    @PatchMapping("/{bookId}/complete")
    public ResponseEntity<?> endReadBook(@LoginMemberId long memberId, @PathVariable long bookId){
        bookService.endRead(memberId, bookId);
        return ResponseEntity.ok().build();
    }

}
