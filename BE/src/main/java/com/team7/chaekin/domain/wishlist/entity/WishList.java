package com.team7.chaekin.domain.wishlist.entity;

import com.team7.chaekin.domain.book.entity.Book;
import com.team7.chaekin.domain.member.entity.Member;
import lombok.*;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
public class WishList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //    member id
    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    private Member memberId;

    //    book id
    @ManyToOne(targetEntity = Book.class, fetch = FetchType.LAZY)
    private Book bookId;

    private boolean isRemoved;
}
