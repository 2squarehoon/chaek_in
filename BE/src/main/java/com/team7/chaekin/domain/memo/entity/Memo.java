package com.team7.chaekin.domain.memo.entity;

import com.team7.chaekin.domain.booklog.entity.BookLog;
import com.team7.chaekin.domain.common.entity.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;

@Builder
@AllArgsConstructor
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Memo extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booklog_id")
    private BookLog bookLog;

    @Column
    private String color;

    @Column
    private String content;

    @Column
    private Boolean isRemoved;
}
