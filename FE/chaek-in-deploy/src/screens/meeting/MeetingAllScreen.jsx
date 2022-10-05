import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { HOST } from '@env';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

function MeetingAllScreen() {
  const { accessToken } = useSelector((state) => state.main);
  const [meeting, setMeeting] = useState([]);
  const [search, setSearch] = useState('');

  // /api/v1/meetings : 모임 검색
  function getMeeting() {
    Axios.get(
      `${HOST}/api/v1/meetings`,
      { params: { keyword: search } },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
      .then(function (response) {
        setMeeting(response.data.meetings);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <MeetingSearchView>
      {/* 모임 검색 */}
      <SearchTextInput
        placeholder='모임 검색'
        placeholderTextColor='#aaaaaa'
        onChangeText={(text) => setSearch(text)}
        value={search}
        underlineColorAndroid='transparent'
        autoCapitalize='none'
        onSubmitEditing={getMeeting}
      />
      {/* 모임 출력 */}
      {meeting.map((item) => (
        <MeetingText key={item.meetingId}>{item.bookTitle}</MeetingText>
      ))}
    </MeetingSearchView>
  );
}

const MeetingSearchView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const SearchTextInput = styled.TextInput`
  margin: 10px;
  width: 300px;
  height: 50px;
  border-radius: 10px;
  padding: 10px;
  background-color: #ffffff;
`;

const MeetingText = styled.Text`
  margin: 10px;
  font-size: 20px;
`;

export default MeetingAllScreen;
