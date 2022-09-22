package com.team7.chaekin.domain.category.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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

    //Test를 위해 만든 Builder, 이후 수정해도 괜찮음.
    @Builder
    public Category(String cid, String name, String mall, String depth1) {
        this.cid = cid;
        this.name = name;
        this.mall = mall;
        this.depth1 = depth1;
    }
}
