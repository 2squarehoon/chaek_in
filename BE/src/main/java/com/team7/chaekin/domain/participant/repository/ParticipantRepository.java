package com.team7.chaekin.domain.participant.repository;

import com.team7.chaekin.domain.meeting.entity.Meeting;
import com.team7.chaekin.domain.member.entity.Member;
import com.team7.chaekin.domain.participant.entity.Participant;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ParticipantRepository extends JpaRepository<Participant, Long> {

    @EntityGraph(attributePaths = {"member"})
    List<Participant> findByMeetingAndIsRemovedIsFalse(Meeting meeting);

    Optional<Participant> findByIdAndIsRemovedIsFalse(long id);
}
