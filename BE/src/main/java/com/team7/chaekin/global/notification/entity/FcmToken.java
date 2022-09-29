package com.team7.chaekin.global.notification.entity;

import com.team7.chaekin.domain.member.entity.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class FcmToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id")
    private Member member;

    private String token;

    private LocalDateTime useDateTime;

    @Builder
    public FcmToken(Member member, String token) {
        this.member = member;
        this.token = token;
        useDateTime = LocalDateTime.now();
    }

    public void updateToken(String token) {
        this.token = token;
        useDateTime = LocalDateTime.now();
    }

    public void removeToken() {
        token = "";
        useDateTime = null;
    }
}
