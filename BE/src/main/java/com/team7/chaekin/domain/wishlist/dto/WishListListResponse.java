package com.team7.chaekin.domain.wishlist.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
public class WishListListResponse {
    private List<WishListDto> wishlist;
}
