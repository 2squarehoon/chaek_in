package com.team7.chaekin.domain.booklog.entity;

import com.team7.chaekin.domain.book.entity.Book;
import com.team7.chaekin.domain.common.entity.BaseTimeEntity;
import com.team7.chaekin.domain.member.entity.Member;
import com.team7.chaekin.domain.todaybook.entity.TodayBook;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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

    @OneToMany(mappedBy = "bookLog")
    private List<TodayBook> todayBooks = new ArrayList<>();

    @Builder
    public BookLog(Member member, Book book) {
        this.member = member;
        this.book = book;
        this.readStatus = ReadStatus.READING;
        this.startDate = LocalDate.now();
    }

    public void updateStatus() {
        //TODO: 만약 Complete 상태를 이후 변경 불가한지 정하기.
        this.readStatus = ReadStatus.COMPLETE;
    }

    public void addTodayBook(TodayBook todayBook) {
        this.todayBooks.add(todayBook);
    }

}
