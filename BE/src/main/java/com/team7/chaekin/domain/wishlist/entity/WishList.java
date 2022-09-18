package com.team7.chaekin.domain.wishlist.entity;

import com.team7.chaekin.domain.book.entity.Book;
import com.team7.chaekin.domain.member.entity.Member;
import lombok.*;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class WishList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //    member id
    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    //    book id
    @ManyToOne(fetch = FetchType.LAZY)
    private Book book;

    private boolean isRemoved;
}
