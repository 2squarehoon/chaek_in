package com.team7.chaekin.domain.meeting.entity;

import com.team7.chaekin.domain.book.entity.Book;
import com.team7.chaekin.domain.common.entity.BaseTimeEntity;
import com.team7.chaekin.domain.meeting.dto.MeetingDetailResponse;
import com.team7.chaekin.domain.meeting.dto.MeetingListDto;
import com.team7.chaekin.domain.meeting.dto.MeetingUpdateRequest;
import com.team7.chaekin.domain.member.entity.Member;
import com.team7.chaekin.domain.participant.entity.Participant;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Meeting extends BaseTimeEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "book_id")
    private Book book;

    @Column(length = 100, nullable = false)
    private String title;

    @Column(length = 2000)
    private String description;

    private int capacity;

    @Enumerated(EnumType.STRING)
    private MeetingStatus meetingStatus;

    @OneToMany(mappedBy = "meeting")
    private List<Participant> participants = new ArrayList<>();

    private boolean isRemoved;

    @Builder
    public Meeting(Book book, String title, String description, String meetingStatus, int capacity) {
        this.book = book;
        this.title = title;
        this.meetingStatus = MeetingStatus.NONE.name().equals(meetingStatus) ? MeetingStatus.NONE : MeetingStatus.COMPLETE;
        this.description = description;
        this.capacity = capacity;
    }

    public void update(Book book, MeetingUpdateRequest meetingUpdateRequest) {
        this.book = book;
        this.title = meetingUpdateRequest.getTitle();
        this.description = meetingUpdateRequest.getDescription();
        this.capacity = meetingUpdateRequest.getMaxCapacity();
    }

    public void delete() {
        isRemoved = true;
    }

    public MeetingDetailResponse toDetailDto() {
        return MeetingDetailResponse.builder()
                .meetingId(id)
                .bookTitle(book.getTitle())
                .author(book.getAuthor())
                .cover(book.getCover())
                .meetingTitle(title)
                .description(description)
                .currentMember(getCurrentParticipants())
                .maxCapacity(capacity)
                .createdAt(getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH.mm")))
                .meetingStatus(meetingStatus.name())
                .build();
    }

    public MeetingListDto toListDto() {
        return MeetingListDto.builder()
                .meetingId(id)
                .bookTitle(book.getTitle())
                .cover(book.getCover())
                .meetingTitle(title)
                .currentMember(getCurrentParticipants())
                .maxCapacity(capacity)
                .meetingStatus(meetingStatus.name())
                .createdAt(getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH.mm")))
                .build();
    }

    public int getCurrentParticipants() {
        return (int) participants.stream()
                .filter(p -> !p.isRemoved())
                .count();
    }

    public Member getMeetingLeader() {
        Member member = null;
        for (Participant participant : participants) {
            if (participant.isLeader()) {
                member = participant.getMember();
                break;
            }
        }
        return member;
    }
}
