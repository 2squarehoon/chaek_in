package com.team7.chaekin.domain.wishlist.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class WishlistResponse {
    long wishListId;
    String isbn;
    String title;
    String author;
    String image;

}
