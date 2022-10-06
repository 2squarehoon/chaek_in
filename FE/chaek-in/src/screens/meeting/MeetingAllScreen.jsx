import { StyleSheet, View, Text, Dimensions, FlatList, Image, Button, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { HOST } from '@env';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

<<<<<<< FE/chaek-in/src/screens/meeting/MeetingAllScreen.jsx
function MeetingAllScreen( {navigation} ) {
=======
function MeetingAllScreen({ navigation }) {
>>>>>>> FE/chaek-in/src/screens/meeting/MeetingAllScreen.jsx
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
<<<<<<< FE/chaek-in/src/screens/meeting/MeetingAllScreen.jsx
      ...Array.from({length: 10}).map((_, i) => i + 1 + prevState.length),
    ])
=======
      ...Array.from({ length: 20 }).map((_, i) => i + 1 + prevState.length),
    ]);
>>>>>>> FE/chaek-in/src/screens/meeting/MeetingAllScreen.jsx
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
        <View>
          {meeting.map((item) => (
            <MeetingText key={item.meetingId}>{item.bookTitle}</MeetingText>
          ))}
        </View>
      </View>
      <MeetingListView>
        <FlatList
<<<<<<< FE/chaek-in/src/screens/meeting/MeetingAllScreen.jsx
        data={meetingList}
        // onEndReached={fetchMore}
        renderItem={({item}) =>  (
          <MeetingCard 
          style={styles.card}
          >
          <TitleCoverView>
            <View style={styles.titleView}>
              <Text style={styles.title}>{item.meetingTitle}</Text>
            </View>
            <View style={styles.coverView}>
              <Image style={styles.cover} source={{ uri: item.cover }} resizeMode='stretch'/>
            </View>
          </TitleCoverView>
          <TouchableOpacity
            key={item.meetingId}
            onPress={() => navigation.navigate('MeetingDetail', { meetingId: item.meetingId })}
          >
            <View 
              style={styles.detailButton}
              >
              <Text style={styles.buttonText}>상세보기</Text>
            </View>
            <View style={styles.member}>
              <View>
                <Image style={styles.memberIcon} source={require('../../../assets/image/meeting/meetingMember.png')}/>
              </View>
              <View>
                <Text style={styles.memberText}>{item.currentMember}/{item.maxCapacity}</Text>
              </View>
            </View>
          </TouchableOpacity>
          </MeetingCard>
        )}>
        </FlatList>
=======
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
>>>>>>> FE/chaek-in/src/screens/meeting/MeetingAllScreen.jsx
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
<<<<<<< FE/chaek-in/src/screens/meeting/MeetingAllScreen.jsx
    height: HEIGHT * 0.25,
    borderWidth: 1,
    borderRadius: 20
=======
    height: HEIGHT * 0.15,
    borderWidth: 2,
    borderRadius: 20,
>>>>>>> FE/chaek-in/src/screens/meeting/MeetingAllScreen.jsx
  },
  titleView:{
    width: WIDTH * 0.45,
    height: HEIGHT * 0.17,
  },
  title: {
    margin: 20,
    fontFamily: 'Cochin',
    fontSize: 15,
    fontWeight: 'bold',
  },
  coverView:{
    width: WIDTH * 0.4,
    height: HEIGHT * 0.17,
  },
  cover: {
    width: WIDTH * 0.2,
    height: HEIGHT * 0.15,
    marginTop: 10,
    marginLeft:40
  },
  detailButton: {
    width: WIDTH * 0.2,
    height: HEIGHT * 0.04,
    backgroundColor: '#728EA6',
    marginTop: 20,
    marginLeft: 10,
    borderRadius: 20,
  },
  buttonText: {
    top: 5,
    left: 14,
    fontColor: '#010811',
  },
  member: {
<<<<<<< FE/chaek-in/src/screens/meeting/MeetingAllScreen.jsx
    left: 270,
    bottom: 35,
    flexDirection: 'row',
    width: WIDTH * 0.2,
    height: HEIGHT * 0.1,
  },
  memberIcon: {
    marginBottom: 20,
    width: WIDTH * 0.05,
    height: HEIGHT * 0.04,
  },
  memberText: {
    fontSize: 15,
    marginTop: 10,
    marginLeft: 10,
    width: WIDTH * 0.1,
    height: HEIGHT * 0.05,
=======
    left: 300,
    bottom: 20,
>>>>>>> FE/chaek-in/src/screens/meeting/MeetingAllScreen.jsx
  },
});

const SearchTextInput = styled.TextInput`
  margin: 10px;
  width: 300px;
  height: 50px;
  border: 1px;
  border-radius: 20px;
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
const TitleCoverView = styled.View`
  display: flex;
  flex-direction: row;
`;

export default MeetingAllScreen;
