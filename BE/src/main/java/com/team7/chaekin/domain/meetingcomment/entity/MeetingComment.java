package com.team7.chaekin.domain.meetingcomment.entity;

import com.team7.chaekin.domain.common.entity.BaseTimeEntity;
import com.team7.chaekin.domain.meeting.entity.Meeting;
import com.team7.chaekin.domain.member.entity.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class MeetingComment extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "meeting_id")
    private Meeting meeting;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private MeetingComment parent;

    @OneToMany(mappedBy = "parent")
    private List<MeetingComment> children = new ArrayList<>();

    @Column(length = 500, nullable = false)
    private String content;

    private boolean isRemoved;

    @Builder
    public MeetingComment(Meeting meeting, Member member, String content) {
        this.meeting = meeting;
        this.member = member;
        this.content = content;
    }

    public void addParent(MeetingComment parent) {
        if (parent == null)
            return;
        this.parent = parent;
        parent.getChildren().add(this);
    }

    public void update(String content) {
        this.content = content;
    }

    public void delete() {
        isRemoved = true;
    }
}
