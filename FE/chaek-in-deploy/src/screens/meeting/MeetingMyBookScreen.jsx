import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { StyleSheet, Text, View } from 'react-native';
import { HOST } from '@env';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

function MeetingMyBookScreen({ navigation }) {
  const { accessToken, userId } = useSelector((state) => state.main);
  const [myMeetingList, setMyMeetingList] = useState([]);
  // 최근에 읽은 책 관련 모임 추천 가져오기(최근에 읽은 책이 없으면 추천 없음)
  // /api/data/meeting/recent-book/{memberId}
  useEffect(() => {
    Axios.get(`${HOST}/api/data/meeting/recent-book/70`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [accessToken, userId]);

  return (
    <MyBookView>
      {myMeetingList ? (
        <MyMeetingView>
          {myMeetingList.map((meeting) => (
            <MyMeetingItem
              key={meeting.meetingId}
              onPress={() => navigation.navigate('MeetingDetail', { meetingId: meeting.meetingId })}
            >
              {/* <MyMeetingCoverImage source={{ uri: meeting.cover }} /> */}

              <MyMeetingTitleText>{meeting.meetingTitle}</MyMeetingTitleText>
              <MyMeetingText numberOfLines={2} elipseMode='tail'>
                {meeting.bookTitle}
              </MyMeetingText>
            </MyMeetingItem>
          ))}
        </MyMeetingView>
      ) : (
        <Text>추천할 만한 모임이 없습니다.</Text>
      )}
      {/* 모임 형태 */}
      <MyMeetingView>
        <MyMeetingItem>
          <MyMeetingCoverImage source={{ uri: 'https://picsum.photos/200/300' }} />
          <MyMeetingLeftView>
            <MyMeetingTitleText>모임 제목</MyMeetingTitleText>
            <MyMeetingText numberOfLines={2} elipseMode='tail'>
              모임에 대한 설명
            </MyMeetingText>
          </MyMeetingLeftView>
        </MyMeetingItem>
      </MyMeetingView>
    </MyBookView>
  );
}

const MyBookView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fcf9f0;
`;

const MyMeetingView = styled.View`
  flex; 1;
  flex-direction: column;
  align-items: center;
  width: 90%;
  height: 250px;
  
`;

const MyMeetingTitleText = styled.Text`
  font-size: 18px;
  font-family: 'Medium';
  margin-bottom: 5px;
  flex-wrap: wrap;
`;

const MyMeetingText = styled.Text`
  font-size: 14px;
  font-family: 'Light';
  margin-bottom: 10px;
  flex-wrap: wrap;
`;

const MyMeetingItem = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 100px;
  background-color: white;
  border: 1px solid black;
  border-radius: 18px;
  margin-bottom: 10px;
  padding: 20px;
`;

const MyMeetingCoverImage = styled.Image`
  flex: 3;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  margin-right: 10px;
`;

const MyMeetingLeftView = styled.View`
  flex: 7;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export default MeetingMyBookScreen;
