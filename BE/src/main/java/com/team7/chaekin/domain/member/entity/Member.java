package com.team7.chaekin.domain.member.entity;

import com.team7.chaekin.domain.common.entity.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Member extends BaseTimeEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 255, nullable = false)
    private String identifier;

    @Column(length = 45, nullable = false)
    private String nickname;

    @Column(length = 45)
    private String job;

    private int age;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "char(6) NOT NULL")
    private Gender gender;

    private boolean isRemoved;

}
