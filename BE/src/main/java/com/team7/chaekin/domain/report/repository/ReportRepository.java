package com.team7.chaekin.domain.report.repository;

import com.team7.chaekin.domain.report.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, Long> {
}
