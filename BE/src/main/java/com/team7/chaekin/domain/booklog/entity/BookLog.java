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
@Table(name = "booklog")
public class BookLog extends BaseTimeEntity {

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
    public BookLog(Member member, Book book, ReadStatus readStatus) {
        this.member = member;
        this.book = book;
        this.readStatus = readStatus;
        this.startDate = LocalDate.now();
    }

    public void completeReadBook() {
        if (readStatus.equals(ReadStatus.COMPLETE))
            return;
        readStatus = ReadStatus.COMPLETE;
        endDate = LocalDate.now();
    }

}
