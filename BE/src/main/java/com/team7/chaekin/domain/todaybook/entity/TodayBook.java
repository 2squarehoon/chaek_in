package com.team7.chaekin.domain.todaybook.entity;

import com.team7.chaekin.domain.booklog.entity.BookLog;
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
    private BookLog bookLog;

    @Builder
    public TodayBook(BookLog bookLog) {
        this.bookLog = bookLog;
        if (!bookLog.getTodayBooks().contains(this))
            bookLog.addTodayBook(this);
    }

    public void delete() {
        if (bookLog == null) return;
        if (this.bookLog != null) {
            this.bookLog.getTodayBooks().remove(this);
        }
    }

}
