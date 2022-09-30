package com.team7.chaekin.domain.member.repository;

import com.team7.chaekin.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByIdentifier(String identifier);

    List<Member> findByIdentifierIn(List<String> identifierList);
}
