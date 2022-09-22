package com.team7.chaekin.domain.book.controller;

import com.team7.chaekin.domain.book.dto.BookDetailResponse;
import com.team7.chaekin.domain.book.dto.BookListResponse;
import com.team7.chaekin.domain.book.dto.BookSearchRequest;
import com.team7.chaekin.domain.book.service.BookService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RequestMapping("/api/v1/books")
@RestController
@RequiredArgsConstructor
@Slf4j
public class BookController {

    private final BookService bookService;

    //TODO: 로그인 로직 도입 후 삭제
    private static long memberId = 1;

    @GetMapping
    public ResponseEntity<?> searchBook(@RequestBody BookSearchRequest bookSearchRequest,
                                        Pageable pageable){
        BookListResponse bookListResponse = bookService.search(bookSearchRequest, pageable);
        return ResponseEntity.ok(bookListResponse);
    }

    @GetMapping("/{bookId}")
    public ResponseEntity<?> getBookDetail(@PathVariable long bookId){
        BookDetailResponse bookDetailResponse = bookService.detail(bookId);
        return ResponseEntity.ok(bookDetailResponse);
    }

    @PatchMapping("/{bookId}/complete")
    public ResponseEntity<?> endReadBook(long memberId, @PathVariable long bookId){
        bookService.endRead(memberId, bookId);
        return ResponseEntity.ok().build();
    }

}
