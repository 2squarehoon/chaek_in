package com.team7.chaekin.domain.book.controller;

import com.team7.chaekin.domain.book.service.BookService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    public ResponseEntity<?> searchBook(@RequestParam String keyword,
                                 @RequestParam String page,
                                 @RequestParam String size,
                                 @RequestParam String sort){
        return ResponseEntity.ok().build();
    }
    @GetMapping("/{bookId}")
    public ResponseEntity<?> getBookDetail(@PathVariable Long bookId){
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{bookId}/complete")
    public ResponseEntity<?> endReadBook(){
        return ResponseEntity.ok().build();
    }

}
