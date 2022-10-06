import React, { useEffect, useState, useCallback } from 'react';
import Axios from 'axios';
import { View, RefreshControl } from 'react-native';
import { HOST } from '@env';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

function MeetingHomeScreen({ navigation }) {
  const { accessToken, nickname, email } = useSelector((state) => state.main);
  const [myMeetingList, setMyMeetingList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const goToMeetingAll = (e) => {
    navigation.navigate('MeetingAll');
  };
  const goToMeetingCreate = (e) => {
    navigation.navigate('MeetingCreate');
  };

  // refresh control
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

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
  }, [refreshing]);

  return (
    <MeetingHomeView>
      <ScrollViewContainer refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <MeetingCreateButton onPress={goToMeetingCreate}>
          <MeetingCreateText>모임 시작하기</MeetingCreateText>
        </MeetingCreateButton>
        <TitleText onPress={goToMeetingAll}>모든 모임 보기 &gt;</TitleText>
        <TitleTextView>
          <TitleText>내가 속한 모임</TitleText>
        </TitleTextView>
        <MyMeetingView>
          {myMeetingList.map((meeting, index) => (
            <MyMeetingItem
              key={index}
              // key={meeting.meetingId}
              onPress={() => navigation.navigate('MeetingDetail', { meetingId: meeting.meetingId })}
            >
              <MyMeetingCoverImage source={{ uri: meeting.cover }} />
              <MyMeetingContentsContainer>
                <MyMeetingTitleText numberOfLines={2} elipseMode='tail'>
                  {meeting.meetingTitle}
                </MyMeetingTitleText>
                <MyMeetingText numberOfLines={2} elipseMode='tail'>
                  {meeting.bookTitle}
                </MyMeetingText>
                <MyMeetingMembersText>
                  {meeting.currentMember} / {meeting.maxCapacity}
                </MyMeetingMembersText>
              </MyMeetingContentsContainer>
            </MyMeetingItem>
          ))}
        </MyMeetingView>
        <RecomView>
          <RecomHalfView>
            <MeetingRecom
              style={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-end',
              }}
              onPress={() => navigation.navigate('MeetingMyBook', { memberId: email })}
            >
              <MeetingRecomImage source={require('../../../assets/image/meeting/current_book.png')} />
              <MyBookText>최근 읽은 책</MyBookText>
            </MeetingRecom>
            <MeetingRecom
              style={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-end',
              }}
              onPress={() => navigation.navigate('MeetingSimilar', { memberId: email })}
            >
              <MeetingRecomImage source={require('../../../assets/image/meeting/similar.png')} />
              <NicknameText>{nickname}</NicknameText>
              <SimilarText>님과 비슷한 사람들</SimilarText>
            </MeetingRecom>
          </RecomHalfView>
          <RecomHalfView>
            <MeetingRecom
              style={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-end',
              }}
              onPress={() => navigation.navigate('MeetingChallenge', { memberId: email })}
            >
              <MeetingRecomImage source={require('../../../assets/image/meeting/finish.png')} />
              <ChallengeText>도전! 완독 모임</ChallengeText>
            </MeetingRecom>
            <MeetingRecom
              style={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-end',
              }}
              onPress={() => navigation.navigate('MeetingOpposite', { memberId: email })}
            >
              <MeetingRecomImage source={require('../../../assets/image/meeting/opposite.png')} />
              <OppositeText>이런 책도</OppositeText>
              <OppositeText>같이 읽어봐요</OppositeText>
            </MeetingRecom>
          </RecomHalfView>
        </RecomView>
        <BlankContainer></BlankContainer>
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

const RecomView = styled.View`
  flex: 7;
`;

const RecomHalfView = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const MeetingRecom = styled.TouchableOpacity`
  background-color: white;
  border: 1px solid black;
  width: 45%;
  height: 200px;
  border-radius: 15px;
  padding: 15px;
  margin: 10px 10px;
  justify-content: space-around;
  align-items: flex-start;
`;

const MyBookText = styled.Text`
  font-family: 'Medium';
  font-size: 14px;
`;

const NicknameText = styled.Text`
  font-family: 'Medium';
  font-size: 14px;
  color: #a8ca47;
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

const MeetingRecomImage = styled.Image`
  width: 85px;
  height: 85px;
  resize-mode: contain;
  margin-bottom: 25px;
  align-self: center;
`;

const MyMeetingCoverImage = styled.Image`
  width: 50px;
  height: 75px;
  border-radius: 10px;
  margin-right: 10px;
`;

// const MyMeetingCoverImage = styled.Image`
//   flex: 3;
//   width: 50px;
//   height: 50px;
//   resize-mode: contain;
//   margin-right: 10px;
// `;

const MyMeetingView = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  width: 95%;
  margin-bottom: 20%;
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
const MyMeetingMembersText = styled.Text`
  font-size: 10px;
  font-family: 'Light';
  margin-left: auto;
`;

const MyMeetingContentsContainer = styled.View`
  width: 80%;
`;

const MyMeetingItem = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 110px;
  background-color: white;
  border: 1px solid black;
  border-radius: 18px;
  margin-bottom: 10px;
  padding: 20px;
`;

const BlankContainer = styled.View`
  height: 150px;
`;

export default MeetingHomeScreen;
