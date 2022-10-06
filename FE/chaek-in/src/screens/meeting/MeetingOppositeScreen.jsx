import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { HOST } from '@env';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { StyleSheet, Text, View } from 'react-native';

function MeetingOppositeScreen({ navigation }) {
  const { accessToken, userId } = useSelector((state) => state.main);
  const [myMeetingList, setMyMeetingList] = useState([]);
  const [fakeMeetingList, setFakeMeetingList] = useState([]);

  // /api/data/meeting/opposite/{memberId} : 반대 모임
  // useEffect(() => {
  //   Axios.get(`${HOST}/api/data/meeting/opposite/${userId}`, {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   })
  //     .then(function (response) {
  //       setMyMeetingList(response.data.meetings);
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, [accessToken, userId]);

  useEffect(() => {
    Axios.get(`${HOST}/api/v1/meetings`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(function (response) {
        const meetings = response.data.meetings;
        let randomIndexArray = [];
        let meetingListArray = [];
        for (var i = 0; i < 5; i++) {
          var randomNum = Math.floor(Math.random() * meetings.length + 1);
          if (randomIndexArray.indexOf(randomNum) === -1) {
            randomIndexArray.push(randomNum);
          } else {
            i--;
          }
        }
        for (var j = 0; j < 5; j++) {
          // meetingListArray.push(randomIndexArray[j]);
          meetingListArray.push(meetings[randomIndexArray[j]]);
        }
        // console.log(meetingListArray);
        setFakeMeetingList(meetingListArray);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // 실제 미팅값을 넣을때는 fakeMeetingList를 실제 미팅리스트로 바꾸고 key를 meetingId로 설정한다
  return (
    <>
      <ScrollViewContainer>
        <MyBookView>
          {fakeMeetingList ? (
            <MyMeetingView>
              {fakeMeetingList.map((meeting, index) => (
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
          ) : (
            <Text>추천할 만한 모임이 없습니다.</Text>
          )}
          {/* 모임 형태 */}
          {/* <MyMeetingView>
        <MyMeetingItem>
          <MyMeetingCoverImage source={{ uri: 'https://picsum.photos/200/300' }} />
          <MyMeetingLeftView>
            <MyMeetingTitleText>모임 제목</MyMeetingTitleText>
            <MyMeetingText numberOfLines={2} elipseMode='tail'>
              모임에 대한 설명
            </MyMeetingText>
          </MyMeetingLeftView>
        </MyMeetingItem>
      </MyMeetingView> */}
        </MyBookView>
        <BlankContainer></BlankContainer>
      </ScrollViewContainer>
    </>
  );
}

const ScrollViewContainer = styled.ScrollView`
  background-color: #fcf9f0;
`;

const MyBookView = styled.View`
  justify-content: center;
  align-items: center;
  background-color: #fcf9f0;
`;

const MyMeetingView = styled.View`
  flex-direction: column;
  align-items: center;
  width: 90%;
`;

const MyMeetingContentsContainer = styled.View`
  width: 80%;
`;

const MyMeetingTitleText = styled.Text`
  font-size: 18px;
  font-family: 'Medium';
  margin-bottom: 5px;
  flex-wrap: wrap;
`;

const MyMeetingText = styled.Text`
  font-size: 15px;
  font-family: 'Light';
  margin-bottom: 10px;
  flex-wrap: wrap;
`;

const MyMeetingMembersText = styled.Text`
  font-size: 10px;
  font-family: 'Light';
  margin-left: auto;
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

const MyMeetingCoverImage = styled.Image`
  width: 50px;
  height: 75px;
  border-radius: 10px;
  margin-right: 10px;
`;

const MyMeetingLeftView = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const BlankContainer = styled.View`
  height: 150px;
`;

export default MeetingOppositeScreen;
