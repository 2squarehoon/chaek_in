package com.team7.chaekin.domain.meeting.service;

import com.team7.chaekin.domain.book.entity.Book;
import com.team7.chaekin.domain.book.repository.BookRepository;
import com.team7.chaekin.domain.meeting.dto.*;
import com.team7.chaekin.domain.meeting.entity.Meeting;
import com.team7.chaekin.domain.meeting.repository.MeetingRepository;
import com.team7.chaekin.domain.member.entity.Member;
import com.team7.chaekin.domain.member.repository.MemberRepository;
import com.team7.chaekin.domain.participant.entity.Participant;
import com.team7.chaekin.domain.participant.repository.ParticipantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class MeetingService {

    private final MeetingRepository meetingRepository;
    private final BookRepository bookRepository;
    private final MemberRepository memberRepository;
    private final ParticipantRepository participantRepository;

    @Transactional
    public MeetingListResponse getMeetings(MeetingListRequest meetingListRequest, Pageable pageable) {
        Page<Meeting> pageList = meetingRepository.findByTitleContainingAndIsRemovedIsFalse(meetingListRequest.getKeyword(), pageable);

        List<MeetingListDto> meetings = pageList.toList().stream()
                .map(Meeting::toListDto)
                .collect(Collectors.toList());

        return new MeetingListResponse(pageList.getTotalPages(), meetings);
    }

    @Transactional
    public MeetingDetailResponse getMeetingDetail(long meetingId) {
        return getMeeting(meetingId).toDetailDto();
    }

    @Transactional
    public long createMeeting(long memberId, MeetingCreateRequest meetingCreateRequest) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("해당 회원이 존재하지 않습니다."));
        Book book = bookRepository.findById(meetingCreateRequest.getBookId())
                .orElseThrow(() -> new RuntimeException("해당 책이 존재하지 않습니다."));

        Meeting meeting = meetingRepository.save(Meeting.builder()
                .book(book)
                .title(meetingCreateRequest.getTitle())
                .description(meetingCreateRequest.getDescription())
                .capacity(meetingCreateRequest.getMaxCapacity()).build());

        participantRepository.save(Participant.makeParticipant(meeting, member, true));
        return meeting.getId();
    }

    @Transactional
    public void updateMeeting(long meetingId, MeetingUpdateRequest meetingUpdateRequest) {
        Meeting meeting = getMeeting(meetingId);
        Book book = bookRepository.findById(meetingUpdateRequest.getBookId())
                .orElseThrow(() -> new RuntimeException("해당 책이 존재하지 않습니다."));

        if (meetingUpdateRequest.getMaxCapacity() < meeting.getCurrentParticipants()) {
            throw new RuntimeException("현재 인원이 최대 인원보다 많습니다.");
        }
        meeting.update(book, meetingUpdateRequest);
    }

    @Transactional
    public void deleteMeeting(long meetingId) {
        Meeting meeting = getMeeting(meetingId);
        meeting.delete();
    }

    private Meeting getMeeting(long meetingId) {
        return meetingRepository.findByIdAndIsRemovedIsFalse(meetingId)
                .orElseThrow(() -> new RuntimeException("해당 모임이 존재하지 않습니다."));
    }

}
