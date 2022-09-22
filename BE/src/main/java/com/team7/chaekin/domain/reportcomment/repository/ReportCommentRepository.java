package com.team7.chaekin.domain.reportcomment.repository;

import com.team7.chaekin.domain.reportcomment.entity.ReportComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportCommentRepository extends JpaRepository<ReportComment, Long> {
}
