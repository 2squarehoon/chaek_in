package com.team7.chaekin.domain.member.repository;

import com.team7.chaekin.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
}
