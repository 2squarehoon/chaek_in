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
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String identifier;

    private String nickname;

    private String job;

    private int age;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private boolean isRemoved;
}
