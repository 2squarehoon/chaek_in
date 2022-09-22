package com.team7.chaekin.domain.participant.service;

import com.team7.chaekin.domain.meeting.entity.Meeting;
import com.team7.chaekin.domain.meeting.repository.MeetingRepository;
import com.team7.chaekin.domain.member.entity.Member;
import com.team7.chaekin.domain.member.repository.MemberRepository;
import com.team7.chaekin.domain.participant.dto.ParticipantListDto;
import com.team7.chaekin.domain.participant.dto.ParticipantListResponse;
import com.team7.chaekin.domain.participant.entity.Participant;
import com.team7.chaekin.domain.participant.repository.ParticipantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

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
    public void leaveMeeting(long meetingId, long participantId) {
        Meeting meeting = getMeeting(meetingId);

        Participant participant = participantRepository.findById(participantId)
                .orElseThrow(() -> new RuntimeException("해당 참가자가 존재하지 않습니다."));
        if (!participant.getMeeting().equals(meeting)) {
            throw new RuntimeException("미팅 참가자가 아닙니다.");
        }
        participant.leave();
    }

    private Meeting getMeeting(long meetingId) {
        return meetingRepository.findById(meetingId)
                .orElseThrow(() -> new RuntimeException("해당 모임이 존재하지 않습니다."));
    }

    private Member getMember(long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("해당 회원이 존재하지 않습니다."));
    }
}
