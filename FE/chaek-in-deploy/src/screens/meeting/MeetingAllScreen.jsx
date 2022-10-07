import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { HOST } from '@env';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

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
        console.log(response.data.meetings);
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
        console.log('실행됨');
        setMeeting(response.data.meetings);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const fetchMore = () => {
    setMeetingList((prevState) => [
      ...prevState,
      ...Array.from({ length: 10 }).map((_, i) => i + 1 + prevState.length),
    ]);
  };

  return (
    <View style={styles.container}>
      {/* 모임 검색 */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SearchTextInput
          style={styles.searchInput}
          placeholder='모임 검색'
          placeholderTextColor='#aaaaaa'
          onChangeText={(text) => setSearch(text)}
          value={search}
          underlineColorAndroid='transparent'
          autoCapitalize='none'
          onSubmitEditing={getMeeting}
        />
        <TouchableOpacity>
          <AntDesign
            onChangeText={(text) => setSearch(text)}
            value={search}
            onPress={getMeeting}
            style={styles.searchIcon}
            name='search1'
            size={24}
            color='black'
          />
        </TouchableOpacity>
        {/* 모임 출력 */}
        {search.length !== 0 ? (
          <ScrollView>
            <MeetingListView>
              {/* <FlatList
                data={meeting}
                onEndReached={fetchMore}
                renderItem={({ item }) => {
                  return (
                    // <MeetingCard style={styles.card}>
                    //   <TitleCoverView>
                    //     <View style={styles.titleView}>
                    //       <Text style={styles.title}>{item.meetingTitle}</Text>
                    //     </View>
                    //     <View style={styles.coverView}>
                    //       <Image style={styles.cover} source={{ uri: item.cover }} resizeMode='stretch' />
                    //     </View>
                    //   </TitleCoverView>
                    //   <TouchableOpacity
                    //     key={item.meetingId}
                    //     onPress={() => navigation.navigate('MeetingDetail', { meetingId: item.meetingId })}
                    //   >
                    //     <View style={styles.detailButton}>
                    //       <Text style={styles.buttonText}>상세보기</Text>
                    //     </View>
                    //     <View style={styles.member}>
                    //       <View>
                    //         <Ionicons name='person' size={24} color='#728EA6' />
                    //       </View>
                    //       <View>
                    //         <Text style={styles.memberText}>
                    //           {item.currentMember}/{item.maxCapacity}
                    //         </Text>
                    //       </View>
                    //     </View>
                    //   </TouchableOpacity>
                    // </MeetingCard>
                  );
                }}
              ></FlatList> */}
              <MyMeetingView>
                {meeting.map((meeting, index) => (
                  <MyMeetingSearchItem
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
                  </MyMeetingSearchItem>
                ))}
              </MyMeetingView>
              <BlankContainer></BlankContainer>
            </MeetingListView>
          </ScrollView>
        ) : (
          <MeetingListView>
            {/* <FlatList */}
            {/* // data={meetingList}
          // onEndReached={fetchMore}
          // renderItem={({ item }) => {
          //   return (
          // <MeetingCard style={styles.card}>
          //   <TitleCoverView>
          //     <View style={styles.titleView}>
          //       <Text style={styles.title}>{item.meetingTitle}</Text>
          //     </View>
          //     <View style={styles.coverView}>
          //       <Image style={styles.cover} source={{ uri: item.cover }} resizeMode='stretch' />
          //     </View>
          //   </TitleCoverView>
          //   <TouchableOpacity
          //     key={item.meetingId}
          //     onPress={() => navigation.navigate('MeetingDetail', { meetingId: item.meetingId })}
          //   >
          //     <View style={styles.detailButton}>
          //       <Text style={styles.buttonText}>상세보기</Text>
          //     </View>
          //     <View style={styles.member}>
          //       <View>
          //         <Ionicons name='person' size={24} color='#728EA6' />
          //       </View>
          //       <View>
          //         <Text style={styles.memberText}>
          //           {item.currentMember} / {item.maxCapacity}
          //         </Text>
          //       </View>
          //     </View>
          //   </TouchableOpacity>
          // </MeetingCard>
          //     <MyMeetingItem
          //       // key={meeting.meetingId}
          //       onPress={() => navigation.navigate('MeetingDetail', { meetingId: item.meetingId })}
          //     >
          //       <MyMeetingCoverImage source={{ uri: item.cover }} />
          //       <MyMeetingContentsContainer>
          //         <MyMeetingTitleText numberOfLines={2} elipseMode='tail'>
          //           {item.meetingTitle}
          //         </MyMeetingTitleText>
          //         <MyMeetingText numberOfLines={2} elipseMode='tail'>
          //           {item.bookTitle}
          //         </MyMeetingText>
          //         <MyMeetingMembersText>
          //           {item.currentMember} / {item.maxCapacity}
          //         </MyMeetingMembersText>
          //       </MyMeetingContentsContainer>
          //     </MyMeetingItem>
          //   );
          // }}
          // ></FlatList> */}
            <MyMeetingView>
              {meetingList.map((meeting, index) => (
                <MyMeetingSearchItem
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
                </MyMeetingSearchItem>
              ))}
            </MyMeetingView>
            <BlankContainer></BlankContainer>
          </MeetingListView>
        )}
      </TouchableWithoutFeedback>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcf9f0',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  searchInput: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  searchIcon: {
    position: 'relative',
    width: WIDTH * 0.06,
    height: HEIGHT * 0.03,
    left: '80%',
    bottom: 47,
  },
  card: {
    width: WIDTH * 0.845,
    height: HEIGHT * 0.25,
    borderWidth: 1,
    borderRadius: 20,
    marginLeft: 33,
  },
  titleView: {
    width: WIDTH * 0.45,
    height: HEIGHT * 0.17,
  },
  title: {
    margin: 10,
    fontFamily: 'Cochin',
    fontSize: 12,
    fontWeight: 'bold',
  },
  coverView: {
    width: WIDTH * 0.4,
    height: HEIGHT * 0.17,
  },
  cover: {
    width: WIDTH * 0.2,
    height: HEIGHT * 0.15,
    marginTop: 10,
    marginLeft: 40,
  },
  detailButton: {
    position: 'relative',
    width: WIDTH * 0.2,
    height: HEIGHT * 0.04,
    backgroundColor: '#728EA6',
    top: 20,
    left: 10,
    borderRadius: 20,
  },
  buttonText: {
    top: 5,
    left: 14,
    fontColor: '#010811',
  },
  member: {
    position: 'relative',
    left: 260,
    bottom: 5,
    flexDirection: 'row',
  },
  memberText: {
    left: 5,
    fontSize: 18,
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

const MeetingListView = styled.ScrollView`
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
  width: 90%;
  margin: 1% 5%;
  height: 110px;
  background-color: white;
  border: 1px solid black;
  border-radius: 18px;
  margin-bottom: 10px;
  padding: 20px;
`;

const MyMeetingSearchItem = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  margin: 1% 0 1% 10%;
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

export default MeetingAllScreen;
