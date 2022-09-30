import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { HOST } from '@env';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

function MeetingHomeScreen({ navigation }) {
  const { accessToken, nickname } = useSelector((state) => state.main);
  const [myMeetingList, setMyMeetingList] = useState([]);

  const goToMeetingAll = (e) => {
    navigation.navigate('MeetingAll');
  };
  const goToMeetingCreate = (e) => {
    navigation.navigate('MeetingCreate');
  };

  // meetings/me에 내가 속한 모임 조회
  useEffect(() => {
    Axios.get(`${HOST}/api/v1/meetings/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(function (response) {
        console.log(response.data);
        setMyMeetingList(response.data.meetings);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <MeetingHomeView>
      <ScrollViewContainer>
        <MeetingCreateButton onPress={goToMeetingCreate}>
          <MeetingCreateText>모임 시작하기</MeetingCreateText>
        </MeetingCreateButton>
        <TitleTextView>
          <TitleText>내가 속한 모임</TitleText>
        </TitleTextView>
        <MyMeetingView>
          {myMeetingList.map((meeting) => (
            <MyMeetingItem
              key={meeting.meetingId}
              item={meeting.meetingTitle}
              onPress={() => navigation.navigate('MeetingDetail', { meetingId: meeting.meetingId })}
            >
              <MyMeetingText>{meeting.meetingTitle}</MyMeetingText>
              <MyMeetingText>
                {meeting.currentMember}/{meeting.maxCapacity}
              </MyMeetingText>
              <BookCoverImage source={{ uri: meeting.bookCover }} />
            </MyMeetingItem>
          ))}
        </MyMeetingView>
        <TitleText onPress={goToMeetingAll}>모든 모임 보기 &gt;</TitleText>
        <RecomView>
          <RecomHalfView>
            <MeetingRecom>
              <MyBookText>내가 읽고 있는 책</MyBookText>
            </MeetingRecom>
            <MeetingRecom>
              <SimilarText>{nickname}님과 비슷한 사람들</SimilarText>
            </MeetingRecom>
          </RecomHalfView>
          <RecomHalfView>
            <MeetingRecom>
              <ChallengeText>도전! 완독 모임</ChallengeText>
            </MeetingRecom>
            <MeetingRecom>
              <OppositeText>이런 책도 같이 읽어봐요</OppositeText>
            </MeetingRecom>
          </RecomHalfView>
        </RecomView>
      </ScrollViewContainer>
    </MeetingHomeView>
  );
}

// styled-components
const MeetingHomeView = styled.View`
  flex: 1;
  background-color: #fcf9f0;
  flex-direction: column;
  justify-content: space-around;
  padding: 0 5%;
`;

const MeetingCreateButton = styled.TouchableOpacity`
  width: 40%;
  height: 5%;
  background-color: #a8ca47;
  border: 1px solid black;
  border-radius: 18px;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
`;

const MeetingCreateText = styled.Text`
  font-size: 14px;
  font-family: 'Medium';
`;

const ScrollViewContainer = styled.ScrollView`
  flex: 1;
`;

const MyMeetingView = styled.View`
  flex; 1;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const MyMeetingText = styled.Text`
  flex: 1;
  font-size: 16px;
  font-family: 'Medium';
`;

const MyMeetingItem = styled.Text`
  flex: 1;
  width: 100%;
  height: 100px;
  background-color: white;
  border: 1px solid black;
  border-radius: 18px;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
`;

const RecomView = styled.View`
  flex: 5;
`;

const RecomHalfView = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const MeetingRecom = styled.TouchableOpacity`
  background-color: #f2d8a7;
  width: 100px;
  height: 150px;
  border-radius: 15px;
  padding: 15px;
  margin: 10px 10px;
`;

const MyBookText = styled.Text`
  font-family: 'Medium';
  font-size: 14px;
`;

const SimilarText = styled.Text`
  font-family: 'Medium';
  font-size: 14px;
`;

const ChallengeText = styled.Text`
  font-family: 'Medium';
  font-size: 14px;
`;

const OppositeText = styled.Text`
  font-family: 'Medium';
  font-size: 14px;
`;

const TitleTextView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
`;

const TitleText = styled.Text`
  flex: 1;
  font-family: 'Medium';
  font-size: 18px;
  margin: 10px 0;
`;

const BookCoverImage = styled.Image`
  width: 50px;
  height: 50px;
`;

export default MeetingHomeScreen;
