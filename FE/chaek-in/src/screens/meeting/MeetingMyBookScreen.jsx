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
    Axios.get(`${HOST}/api/data/meeting/recent-book/${userId}`, {
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
    <View style={styles.container}>
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
        <Text>추천할 만한 책이 없습니다.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const MyMeetingView = styled.View`
  flex; 1;
  flex-direction: column;
  align-items: center;
  width: 95%;
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

const MyMeetingItem = styled.Text`
  flex-direction: column;
  width: 100%;
  height: 100px;
  background-color: white;
  border: 1px solid black;
  border-radius: 18px;
  margin-bottom: 10px;
  padding: 20px;
`;

export default MeetingMyBookScreen;
