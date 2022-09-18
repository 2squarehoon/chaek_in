package com.team7.chaekin.domain.category.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Builder
@Entity
@Table(name = "category")
@NoArgsConstructor
@AllArgsConstructor
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cid;
    private String name;
    private String mall;
    private String depth1;
    private String depth2;
    private String depth3;
    private String depth4;
    private String depth5;
}
