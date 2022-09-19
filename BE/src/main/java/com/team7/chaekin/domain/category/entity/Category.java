package com.team7.chaekin.domain.category.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 70)
    private String cid;

    @Column(nullable = false, length = 70)
    private String name;

    @Column(nullable = false, columnDefinition = "char(4)")
    private String mall;

    @Column(nullable = false, length = 70)
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
