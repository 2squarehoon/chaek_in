package com.team7.chaekin.domain.wishlist.repository;

import com.team7.chaekin.domain.wishlist.entity.WishList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WishListRepository extends JpaRepository<WishList, Long> {
}
