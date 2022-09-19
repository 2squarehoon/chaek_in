package com.team7.chaekin.domain.wishlist.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RequestMapping("/api/v1/wi")
@RestController
@RequiredArgsConstructor
@Slf4j
public class WishListController {



    @GetMapping
    public ResponseEntity<?> getWishList(){
        return ResponseEntity.ok().build();
    }

    @PostMapping("/books/{bookId}")
    public ResponseEntity<?> createWishList(){
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/books/{bookId}")
    public ResponseEntity<?> deleteWishList(){
        return ResponseEntity.noContent().build();
    }
}
