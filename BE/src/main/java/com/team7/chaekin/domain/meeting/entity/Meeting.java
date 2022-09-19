package com.team7.chaekin.domain.meeting.entity;

import com.team7.chaekin.domain.book.entity.Book;
import com.team7.chaekin.domain.common.entity.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Meeting extends BaseTimeEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "book_id")
    private Book book;

    @Column(length = 100, nullable = false)
    private String title;

    @Column(length = 2000)
    private String description;

    private int capacity;

    private boolean isRemoved;
}
