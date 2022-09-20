package com.team7.chaekin.domain.wishlist.controller;

import com.team7.chaekin.domain.wishlist.dto.WishListResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RequestMapping("/api/v1/wishlist")
@RestController
@RequiredArgsConstructor
@Slf4j
public class WishListController {



    @GetMapping
    public ResponseEntity<?> getWishList(){
        return ResponseEntity.ok(new WishListResponse());
    }

    @PostMapping("/books/{bookId}")
    public ResponseEntity<?> createWishList(@PathVariable long bookId){
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/books/{bookId}")
    public ResponseEntity<?> deleteWishList(@PathVariable long bookId){
        return ResponseEntity.noContent().build();
    }
}
