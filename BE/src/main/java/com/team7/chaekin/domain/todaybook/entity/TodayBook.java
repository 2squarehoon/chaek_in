package com.team7.chaekin.domain.todaybook.entity;

import com.team7.chaekin.domain.book.entity.Book;
import com.team7.chaekin.domain.common.entity.BaseTimeEntity;
import com.team7.chaekin.domain.member.entity.Member;
import lombok.*;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TodayBook extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    member id
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

//    book id
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id")
    private Book book;
}
