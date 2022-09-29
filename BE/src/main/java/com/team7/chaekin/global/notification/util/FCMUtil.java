package com.team7.chaekin.global.notification.util;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.team7.chaekin.global.notification.entity.FcmToken;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class FCMUtil {

    //TODO: 오래된 토큰 삭제하는 스케줄러 추가하기

    public void sendMessage(List<FcmToken> fcmTokens) {
        Notification notification = Notification.builder()
                //TODO: 알림 양식 정하기 (이미지도 넣을건지?)
                .setTitle("알림 제목")
                .setBody("알림 내용").build();

        fcmTokens.stream().forEach(fcmToken -> {
            //TODO: 알림 보내기 실패는 어떻게 체크?? -> 실패하면 토큰 삭제하고 재발급
            Message message = Message.builder()
                    .setNotification(notification)
                    .setToken(fcmToken.getToken()).build();
            send(message);
        });

    }

    public void sendMessage(FcmToken fcmToken) {
        Notification notification = Notification.builder()
                .setTitle("알림 제목")
                .setBody("알림 내용").build();

        Message message = Message.builder()
                .setNotification(notification)
                .setToken(fcmToken.getToken())
                .build();
        send(message);
    }

    public void send(Message message) {
        FirebaseMessaging.getInstance().sendAsync(message);
    }

}
