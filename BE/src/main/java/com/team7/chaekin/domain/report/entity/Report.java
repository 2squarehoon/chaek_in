package com.team7.chaekin.domain.report.entity;

import com.team7.chaekin.domain.booklog.entity.BookLog;
import com.team7.chaekin.domain.common.entity.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Report extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booklog_id")
    private BookLog bookLog;

    @Column(length = 100)
    private String title;

    @Column(length = 10000)
    private String content;

    @Column
    private int like;

    @Column
    private boolean isRemoved;
}
