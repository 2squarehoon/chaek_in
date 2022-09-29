package com.team7.chaekin.global.notification.repository;

import com.team7.chaekin.global.notification.entity.FcmToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FcmTokenRepository extends JpaRepository<FcmToken, Long> {
}
