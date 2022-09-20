package com.team7.chaekin.domain.wishlist.dto;

import lombok.Data;

import java.util.List;

@Data
public class WishListResponse {
    private List<WishListDto> wishlist;
}
