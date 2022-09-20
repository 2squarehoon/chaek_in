package com.team7.chaekin.domain.booklog.entity;

import com.team7.chaekin.domain.book.entity.Book;
import com.team7.chaekin.domain.common.entity.BaseTimeEntity;
import com.team7.chaekin.domain.member.entity.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Booklog extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "book_id")
    private Book book;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "char(8)", nullable = false)
    private ReadStatus readStatus;

    @Column
    private LocalDate startDate;

    @Column
    private LocalDate endDate;

    @Builder
    public Booklog(Member member, Book book) {
        this.member = member;
        this.book = book;
        this.readStatus = ReadStatus.READING;
        this.startDate = LocalDate.now();
    }

    public void updateStatus(){
        this.readStatus = ReadStatus.COMPLETE;
    }
}
