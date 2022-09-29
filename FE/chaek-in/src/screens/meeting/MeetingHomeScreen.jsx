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
          <MeetingCreateText>모임 만들기</MeetingCreateText>
        </MeetingCreateButton>
        <MyMeetingView>
          <MyMeetingText>내 모임</MyMeetingText>
          {myMeetingList.map((meeting) => (
            <MyMeetingText
              key={meeting.meetingId}
              item={meeting.meetingTitle}
              onPress={() => navigation.navigate('MeetingDetail', { meetingId: meeting.meetingId })}
            >
              {meeting.meetingTitle}
            </MyMeetingText>
          ))}
        </MyMeetingView>
        <MyMeeting></MyMeeting>
        <AllMeetingText onPress={goToMeetingAll}>모든 모임 보기 ▷</AllMeetingText>
        <RecomView>
          <RecomHalfView>
            <MyBook>
              <MyBookText>내가 읽고 있는 책</MyBookText>
            </MyBook>
            <Similar>
              <SimilarText>{nickname}님과 비슷한 사람들</SimilarText>
            </Similar>
          </RecomHalfView>
          <RecomHalfView>
            <Challenge>
              <ChallengeText>도전! 완독 모임</ChallengeText>
            </Challenge>
            <Opposite>
              <OppositeText>이런 책도 같이 읽어봐요</OppositeText>
            </Opposite>
          </RecomHalfView>
        </RecomView>
      </ScrollViewContainer>
    </MeetingHomeView>
  );
}

// styled-components
const MeetingCreateButton = styled.TouchableOpacity`
  width: 100%;
  height: 100px;
  background-color: #f2f2f2;
  border-radius: 10px;
  margin: 10px 0px;
  justify-content: center;
  align-items: center;
`;

const MeetingCreateText = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const ScrollViewContainer = styled.ScrollView`
  flex: 1;
`;

const MeetingHomeView = styled.View`
  flex: 1;
  background-color: #fcf9f0;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
`;

const MyMeetingView = styled.View`
  width: 100%;
  height: 200px;
  background-color: #f2f2f2;
`;

const MyMeetingText = styled.Text`
  flex: 1;
  font-size: 18px;
  font-weight: bold;
`;

const MyMeetingList = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const MyMeetingItem = styled.Text`
  font-size: 15px;
`;

const MyMeeting = styled.View`
  flex: 3;
  background-color: #f2d8a7;
  border-radius: 15px;
  padding: 15px;
  margin: 10px 10px;
`;

const AllMeetingText = styled.Text`
  flex: 1;
  font-size: 18px;
  font-weight: bold;
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

const MyBook = styled.TouchableOpacity`
  background-color: #f2d8a7;
  width: 100px;
  height: 150px;
  border-radius: 15px;
  padding: 15px;
  margin: 10px 10px;
`;

const Similar = styled.TouchableOpacity`
  background-color: #f2d8a7;
  width: 100px;
  height: 150px;
  border-radius: 15px;
  padding: 15px;
  margin: 10px 10px;
`;

const Challenge = styled.TouchableOpacity`
  background-color: #f2d8a7;
  width: 100px;
  height: 150px;
  border-radius: 15px;
  padding: 15px;
  margin: 10px 10px;
`;

const Opposite = styled.TouchableOpacity`
  background-color: #f2d8a7;
  width: 100px;
  height: 150px;
  border-radius: 15px;
  padding: 15px;
  margin: 10px 10px;
`;

const MyBookText = styled.Text`
  font-size: 15px;
  font-weight: bold;
`;

const SimilarText = styled.Text`
  font-size: 15px;
  font-weight: bold;
`;

const ChallengeText = styled.Text`
  font-size: 15px;
  font-weight: bold;
`;

const OppositeText = styled.Text`
  font-size: 15px;
  font-weight: bold;
`;

export default MeetingHomeScreen;
