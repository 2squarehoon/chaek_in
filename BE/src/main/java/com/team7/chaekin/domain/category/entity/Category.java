package com.team7.chaekin.domain.category.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
public class Category {
    @Id
    @Column(columnDefinition = "bigint(20)")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 70)
    private String cid;

    @Column(length = 70)
    private String name;

    @Column(columnDefinition = "char(4)")
    private String mall;

    @Column(length = 70)
    private String depth1;

    @Column(length = 70)
    private String depth2;

    @Column(length = 70)
    private String depth3;

    @Column(length = 70)
    private String depth4;

    @Column(length = 70)
    private String depth5;
}
