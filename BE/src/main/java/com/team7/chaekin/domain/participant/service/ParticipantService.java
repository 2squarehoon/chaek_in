package com.team7.chaekin.domain.participant.service;

import com.team7.chaekin.domain.meeting.entity.Meeting;
import com.team7.chaekin.domain.meeting.repository.MeetingRepository;
import com.team7.chaekin.domain.member.entity.Member;
import com.team7.chaekin.domain.member.repository.MemberRepository;
import com.team7.chaekin.domain.participant.dto.ParticipantListDto;
import com.team7.chaekin.domain.participant.dto.ParticipantListResponse;
import com.team7.chaekin.domain.participant.entity.Participant;
import com.team7.chaekin.domain.participant.repository.ParticipantRepository;
import com.team7.chaekin.global.error.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

import static com.team7.chaekin.global.error.errorcode.DomainErrorCode.*;

@RequiredArgsConstructor
@Service
public class ParticipantService {

    private final ParticipantRepository participantRepository;
    private final MeetingRepository meetingRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public ParticipantListResponse getParticipants(long meetingId) {
        Meeting meeting = getMeeting(meetingId);
        List<Participant> participants = participantRepository.findByMeetingAndIsRemovedIsFalse(meeting);

        return new ParticipantListResponse(participants.stream()
                .map(p -> ParticipantListDto.builder()
                        .participantId(p.getId())
                        .name(p.getMember().getNickname())
                        .gender(p.getMember().getGender().name())
                        .age(p.getMember().getAge())
                        .isLeader(p.isLeader())
                        .build()).collect(Collectors.toList()));
    }

    @Transactional
    public long joinMeeting(long memberId, long meetingId) {
        Member member = getMember(memberId);
        Meeting meeting = getMeeting(meetingId);

        return participantRepository.save(Participant.makeParticipant(meeting, member, false))
                .getId();
    }

    @Transactional
    public void leaveMeeting(long meetingId, long participantId, long memberId) {
        Meeting meeting = getMeeting(meetingId);

        Participant participant = participantRepository.findByIdAndIsRemovedIsFalse(participantId)
                .orElseThrow(() -> new CustomException(PARTICIPANT_IS_NOT_EXIST));
        if (!participant.getMember().getId().equals(memberId)) {
            throw new CustomException(DO_NOT_HAVE_AUTHORIZATION);
        }
        if (!participant.getMeeting().equals(meeting)) {
            throw new CustomException(MEMBER_IS_NOT_BELONG_MEETING);
        }
        meeting.getParticipants().remove(participant);
        participant.leave();
    }

    private Meeting getMeeting(long meetingId) {
        return meetingRepository.findByIdAndIsRemovedIsFalse(meetingId)
                .orElseThrow(() -> new CustomException(MEETING_IS_NOT_EXIST));
    }

    private Member getMember(long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(MEMBER_IS_NOT_EXIST));
    }
}
