package com.team7.chaekin.domain.booklog.entity;

import com.team7.chaekin.domain.book.entity.Book;
import com.team7.chaekin.domain.common.entity.BaseTimeEntity;
import com.team7.chaekin.domain.member.entity.Member;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Builder
@AllArgsConstructor
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class BookLog extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id")
    private Book book;

    @Column
    private String read_status;

    @Column
    private LocalDate start_date;

    @Column
    private LocalDate end_date;
}
