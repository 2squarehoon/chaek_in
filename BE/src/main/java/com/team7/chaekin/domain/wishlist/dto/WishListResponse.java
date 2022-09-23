package com.team7.chaekin.domain.wishlist.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Data
public class WishListResponse {
    private List<WishListDto> wishlist;
}
