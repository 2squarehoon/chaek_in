package com.team7.chaekin.domain.wishlist.controller;

import com.team7.chaekin.domain.wishlist.service.WishListService;
import com.team7.chaekin.global.oauth.config.LoginMemberId;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequestMapping("/api/v1/wishlist")
@RestController
@RequiredArgsConstructor
public class WishListController {

    private final WishListService wishListService;

    @GetMapping
    public ResponseEntity<?> getWishList(@LoginMemberId long memberId) {
        return ResponseEntity.ok(wishListService.getWishList(memberId));
    }

    @PostMapping("/books/{bookId}")
    public ResponseEntity<?> createWishList(@PathVariable long bookId, @LoginMemberId long memberId){
        wishListService.createWishListBook(memberId, bookId);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/books/{bookId}")
    public ResponseEntity<?> deleteWishList(@PathVariable long bookId, @LoginMemberId long memberId){
        wishListService.deleteWishListBook(memberId, bookId);
        return ResponseEntity.noContent().build();
    }
}
