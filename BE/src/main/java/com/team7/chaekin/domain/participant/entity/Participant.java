package com.team7.chaekin.domain.participant.entity;

import com.team7.chaekin.domain.common.entity.BaseTimeEntity;
import com.team7.chaekin.domain.meeting.entity.Meeting;
import com.team7.chaekin.domain.member.entity.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Participant extends BaseTimeEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "meeting_id")
    private Meeting meeting;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id")
    private Member member;

    private boolean isLeader;

    private boolean isRemoved;

    @Builder
    public Participant(Member member, boolean isLeader) {
        this.member = member;
        this.isLeader = isLeader;
    }

    public Participant addMeeting(Meeting meeting) {
        this.meeting = meeting;
        meeting.getParticipants().add(this);
        return this;
    }

    public static Participant makeParticipant(Meeting meeting, Member member, boolean isLeader) {
        Participant participant = Participant.builder()
                .member(member)
                .isLeader(isLeader).build();
        return participant.addMeeting(meeting);
    }
}
