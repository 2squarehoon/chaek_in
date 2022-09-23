package com.team7.chaekin.domain.wishlist.repository;

import com.team7.chaekin.domain.wishlist.entity.WishList;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface WishListRepository extends JpaRepository<WishList, Long> {
    @Query("SELECT w FROM WishList w " +
            "WHERE w.member.id = :memberId " +
            "AND w.book.id = :bookId")
    Optional<WishList> findByMemberIdAndBookId(@Param("memberId") long memberId, @Param("bookId") long bookId);

    @Query("SELECT w FROM WishList w " +
            "WHERE w.member.id = :memberId " +
            "AND w.isRemoved is false")
    @EntityGraph(attributePaths = {"book"})
    List<WishList> findByMemberId(@Param("memberId") long memberId);
}
