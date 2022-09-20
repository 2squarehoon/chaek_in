package com.team7.chaekin.domain.todaybook.entity;

import com.team7.chaekin.domain.booklog.entity.Booklog;
import com.team7.chaekin.domain.common.entity.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TodayBook extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "booklog_id")
    private Booklog booklog;

    @Builder
    public TodayBook(Booklog booklog) {
        this.booklog = booklog;
    }
}
