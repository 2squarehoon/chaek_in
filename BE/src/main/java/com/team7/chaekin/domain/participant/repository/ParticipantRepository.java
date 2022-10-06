package com.team7.chaekin.domain.participant.repository;

import com.team7.chaekin.domain.meeting.entity.Meeting;
import com.team7.chaekin.domain.member.entity.Member;
import com.team7.chaekin.domain.participant.entity.Participant;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ParticipantRepository extends JpaRepository<Participant, Long> {

    @EntityGraph(attributePaths = {"member"})
    List<Participant> findByMeetingAndIsRemovedIsFalse(Meeting meeting);

    Optional<Participant> findByIdAndIsRemovedIsFalse(long id);

    @Query("SELECT p FROM Participant p " +
            "WHERE p.member.id = :memberId " +
            "AND p.isRemoved IS NOT TRUE")
    @EntityGraph(attributePaths = {"member", "meeting"})
    List<Participant> findByMemberId(@Param("memberId") long memberId);

    Optional<Participant> findByMemberAndMeeting(Member member, Meeting meeting);
}
