import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native';

function MeetingHomeScreen() {
  return (
    <MeetingHomeView>
      <ScrollViewContainer>
        <MyMeetingText>내가 참여하는</MyMeetingText>
        <MyMeeting></MyMeeting>
        <AllMeetingText>모든 모임 보기 ▷</AllMeetingText>
        <RecomView>
          <RecomHalfView>
            <MyBook></MyBook>
            <Similar></Similar>
          </RecomHalfView>
          <RecomHalfView>
            <Challenge></Challenge>
            <Opposite></Opposite>
          </RecomHalfView>
        </RecomView>
      </ScrollViewContainer>
    </MeetingHomeView>
  );
}

// styled-components

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

const MyMeetingText = styled.Text`
  flex: 1;
  font-size: 18px;
  font-weight: bold;
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

export default MeetingHomeScreen;
