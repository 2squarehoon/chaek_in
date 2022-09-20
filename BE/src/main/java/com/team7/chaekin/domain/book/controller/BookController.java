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

    @GetMapping
    public ResponseEntity<?> searchBook(@RequestBody BookSearchRequest bookSearchRequest,
                                        Pageable pageable){
        return ResponseEntity.ok(new BookListResponse());
    }
    @GetMapping("/{bookId}")
    public ResponseEntity<?> getBookDetail(@PathVariable long bookId){
        return ResponseEntity.ok(new BookDetailResponse());
    }

    @PatchMapping("/{bookId}/complete")
    public ResponseEntity<?> endReadBook(@PathVariable long bookId){
        return ResponseEntity.ok().build();
    }

}
