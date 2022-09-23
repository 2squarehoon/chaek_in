package com.team7.chaekin.domain.wishlist.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class WishListDto {
    private long wishListId;
    private long bookId;
    private String isbn;
    private String title;
    private String author;
    private String cover;
}
