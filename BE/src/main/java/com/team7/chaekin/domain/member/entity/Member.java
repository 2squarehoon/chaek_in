package com.team7.chaekin.domain.member.entity;

import com.team7.chaekin.domain.common.entity.BaseTimeEntity;
import com.team7.chaekin.domain.member.dto.MemberUpdateRequest;
import com.team7.chaekin.global.notification.entity.FcmToken;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(uniqueConstraints = {
        @UniqueConstraint(columnNames = {"identifier", "refreshToken"})
})
public class Member extends BaseTimeEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 255, nullable = false)
    private String identifier;

    @Column(length = 45, nullable = false)
    private String nickname;

    @Column(length = 500, nullable = false)
    private String password;

    @Column(length = 45)
    private String job;

    private int age;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "char(6) NOT NULL")
    private Gender gender;

    @Column
    private String refreshToken;

    @OneToMany(mappedBy = "member")
    private List<FcmToken> fcmTokens;

    @Builder
    public Member(String identifier, String password, String nickname, String job, int age, Gender gender) {
        this.identifier = identifier;
        this.nickname = nickname;
        this.job = job;
        this.age = age;
        this.gender = gender;
    }

    public void updateInformation(MemberUpdateRequest memberUpdateRequest) {
        nickname = memberUpdateRequest.getNickname();
        job = memberUpdateRequest.getJob();
        age = memberUpdateRequest.getAge();
        gender = memberUpdateRequest.getGender();
    }

    public void saveRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public void removeRefreshToken() {
        this.refreshToken = "";
    }

}
