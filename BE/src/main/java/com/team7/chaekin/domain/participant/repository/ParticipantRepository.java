package com.team7.chaekin.domain.participant.repository;

import com.team7.chaekin.domain.participant.entity.Participant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParticipantRepository extends JpaRepository<Participant, Long> {
}
