import { StyleSheet, View, Text, Dimensions, FlatList, Image, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { HOST } from '@env';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

function MeetingAllScreen({ navigation }) {
  const { accessToken } = useSelector((state) => state.main);
  const [meeting, setMeeting] = useState([]);
  const [search, setSearch] = useState('');
  const [meetingList, setMeetingList] = useState([]);
  useEffect(() => {
    Axios.get(`${HOST}/api/v1/meetings`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(function (response) {
        console.log(response.data);
        setMeetingList(response.data.meetings);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // /api/v1/meetings : 모임 검색
  function getMeeting() {
    Axios.get(`${HOST}/api/v1/meetings`, {
      params: { keyword: search },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(function (response) {
        setMeeting(response.data.meetings);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const fetchMore = () => {
    setMeetingList((prevState) => [
      ...prevState,
      ...Array.from({ length: 20 }).map((_, i) => i + 1 + prevState.length),
    ]);
  };

  return (
    <View style={styles.container}>
      <View>
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
      </View>
      <MeetingListView>
        <FlatList
          data={meetingList}
          onEndReached={fetchMore}
          renderItem={({ item }) => (
            <MeetingCard style={styles.card}>
              <Text style={styles.title}>{item.meetingTitle}</Text>
              <View
                style={styles.detailButton}
                onPress={() => navigation.navigate('MeetingDetail', { meetingId: item.meetingId })}
              >
                <Text style={styles.buttonText}>상세보기</Text>
              </View>
              <View style={styles.member}>
                <Text>
                  {item.currentMember}/{item.maxCapacity}
                </Text>
              </View>
            </MeetingCard>
          )}
        ></FlatList>
        {/* {meetingList.map((item) => (
          <MeetingCard style={styles.card}>
            <MeetingText key={item.meetingId}>{item.bookTitle}</MeetingText>
          </MeetingCard>
        ))} */}
      </MeetingListView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcf9f0',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: WIDTH * 0.845,
    height: HEIGHT * 0.15,
    borderWidth: 2,
    borderRadius: 20,
  },
  title: {
    margin: 10,
    fontFamily: 'Cochin',
    fontSize: 12,
    fontWeight: 'bold',
  },
  detailButton: {
    width: WIDTH * 0.2,
    height: HEIGHT * 0.04,
    backgroundColor: '#728EA6',
    marginTop: 40,
    marginLeft: 10,
    borderRadius: 20,
  },
  buttonText: {
    top: 5,
    left: 14,
    fontColor: '#010811',
  },
  member: {
    left: 300,
    bottom: 20,
  },
});

const SearchTextInput = styled.TextInput`
  margin: 10px;
  width: 300px;
  height: 50px;
  border-radius: 10px;
  padding: 10px;
  background-color: #f8dfaa;
`;

const MeetingText = styled.Text`
  margin: 10px;
  font-size: 10px;
`;

const MeetingListView = styled.View`
  background-color: #fcf9f0;
`;

const MeetingCard = styled.View`
  background-color: white;
  margin: 5px;
`;

export default MeetingAllScreen;
