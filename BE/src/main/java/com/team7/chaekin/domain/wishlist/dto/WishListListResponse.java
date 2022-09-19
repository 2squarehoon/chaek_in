package com.team7.chaekin.domain.wishlist.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class WishListListResponse {
    List<WishlistResponse> wishlist;
}
