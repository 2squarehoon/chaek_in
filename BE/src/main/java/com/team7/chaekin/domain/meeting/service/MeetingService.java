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
import com.team7.chaekin.global.error.errorcode.DomainErrorCode;
import com.team7.chaekin.global.error.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

import static com.team7.chaekin.global.error.errorcode.DomainErrorCode.BOOK_IS_NOT_EXIST;
import static com.team7.chaekin.global.error.errorcode.DomainErrorCode.MEMBER_IS_NOT_EXIST;

@RequiredArgsConstructor
@Service
public class MeetingService {

    private final MeetingRepository meetingRepository;
    private final BookRepository bookRepository;
    private final MemberRepository memberRepository;
    private final ParticipantRepository participantRepository;

    @Transactional
    public MeetingListResponse getMeetings(MeetingListRequest meetingListRequest, Pageable pageable) {
        Page<Meeting> pageList = meetingRepository.searchMeetingList(meetingListRequest.getKeyword(), pageable);

        List<MeetingListDto> meetings = pageList.toList().stream()
                .map(Meeting::toListDto)
                .collect(Collectors.toList());

        return new MeetingListResponse(pageList.getTotalPages(), meetings);
    }

    @Transactional
    public MeetingDetailResponse getMeetingDetail(long meetingId, long memberId) {
        Meeting meeting = getMeeting(meetingId);
        MeetingDetailResponse meetingDetailResponse = meeting.toDetailDto();

        Member meetingLeader = meeting.getMeetingLeader();
        meetingDetailResponse.setIsMine(meetingLeader.getId().equals(memberId));
        return meetingDetailResponse;
    }

    @Transactional
    public MeetingMyResponse getMyMeetings(long memberId) {
        List<Participant> participants = participantRepository.findByMemberId(memberId);
        List<MeetingListDto> dtoList = participants.stream()
                .map(participant -> participant.getMeeting())
                .map(Meeting::toListDto)
                .collect(Collectors.toList());
        return new MeetingMyResponse(dtoList);
    }

    @Transactional
    public long createMeeting(long memberId, MeetingCreateRequest meetingCreateRequest) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(MEMBER_IS_NOT_EXIST));
        Book book = getBook(meetingCreateRequest.getBookId());

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
        Book book = getBook(meetingUpdateRequest.getBookId());

        if (meetingUpdateRequest.getMaxCapacity() < meeting.getCurrentParticipants()) {
            throw new CustomException(DomainErrorCode.IMPOSSIBLE_CAPACITY_LESS_THAN_CURRENT_MEMBERS);
        }
        meeting.update(book, meetingUpdateRequest);
    }

    @Transactional
    public void deleteMeeting(long memberId, long meetingId) {
        Meeting meeting = getMeeting(meetingId);
        if (!meeting.getMeetingLeader().getId().equals(memberId)) {
            throw new CustomException(DomainErrorCode.ONLY_LEADER_CAN_DELETE_MEETING);
        }
        meeting.delete();
    }

    private Book getBook(long bookId) {
        return bookRepository.findById(bookId)
                .orElseThrow(() -> new CustomException(BOOK_IS_NOT_EXIST));
    }

    private Meeting getMeeting(long meetingId) {
        return meetingRepository.findByIdAndIsRemovedIsFalse(meetingId)
                .orElseThrow(() -> new CustomException(DomainErrorCode.MEETING_IS_NOT_EXIST));
    }


}
