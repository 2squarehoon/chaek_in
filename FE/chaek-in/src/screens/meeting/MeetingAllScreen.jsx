import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { HOST } from '@env';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { StyleSheet, Text, View, TextInput } from 'react-native';

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
    <View style={styles.container}>
      {/* 모임 검색 */}
      <TextInput
        style={styles.input}
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
        <Text key={item.meetingId}>{item.bookTitle}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fcf9f0',
  },
});

export default MeetingAllScreen;
