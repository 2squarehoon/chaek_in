package com.team7.chaekin.domain.wishlist.entity;

import com.team7.chaekin.domain.book.entity.Book;
import com.team7.chaekin.domain.member.entity.Member;
import lombok.*;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "wishlist")
public class WishList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id")
    private Book book;

    private boolean isRemoved;

    @Builder
    public WishList(Member member, Book book) {
        this.member = member;
        this.book = book;
    }

    public void gotDibs() {
        isRemoved = false;
    }

    public void delete() {
        isRemoved = true;
    }
}
