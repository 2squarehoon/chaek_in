import { StyleSheet, View, Text, Dimensions, FlatList, Image, Button, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { HOST } from '@env';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { AntDesign, Ionicons } from '@expo/vector-icons';

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
      <View>
        {/* 모임 검색 */}
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
          <View>
            <MeetingListView>
              <FlatList
                data={meeting}
                // onEndReached={fetchMore}
                renderItem={({ item }) => {
                  return (
                    <MeetingCard style={styles.card}>
                      <TitleCoverView>
                        <View style={styles.titleView}>
                          <Text style={styles.title}>{item.meetingTitle}</Text>
                        </View>
                        <View style={styles.coverView}>
                          <Image style={styles.cover} source={{ uri: item.cover }} resizeMode='stretch' />
                        </View>
                      </TitleCoverView>
                      <TouchableOpacity
                        key={item.meetingId}
                        onPress={() => navigation.navigate('MeetingDetail', { meetingId: item.meetingId })}
                      >
                        <View style={styles.detailButton}>
                          <Text style={styles.buttonText}>상세보기</Text>
                        </View>
                        <View style={styles.member}>
                          <View>
                            <Ionicons name='person' size={24} color='#728EA6' />
                          </View>
                          <View>
                            <Text style={styles.memberText}>
                              {item.currentMember}/{item.maxCapacity}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </MeetingCard>
                  );
                }}
              ></FlatList>
            </MeetingListView>
          </View>
        ) : (
          <MeetingListView>
            <FlatList
              data={meetingList}
              // onEndReached={fetchMore}
              renderItem={({ item }) => {
                return (
                  <MeetingCard style={styles.card}>
                    <TitleCoverView>
                      <View style={styles.titleView}>
                        <Text style={styles.title}>{item.meetingTitle}</Text>
                      </View>
                      <View style={styles.coverView}>
                        <Image style={styles.cover} source={{ uri: item.cover }} resizeMode='stretch' />
                      </View>
                    </TitleCoverView>
                    <TouchableOpacity
                      key={item.meetingId}
                      onPress={() => navigation.navigate('MeetingDetail', { meetingId: item.meetingId })}
                    >
                      <View style={styles.detailButton}>
                        <Text style={styles.buttonText}>상세보기</Text>
                      </View>
                      <View style={styles.member}>
                        <View>
                          <Ionicons name='person' size={24} color='#728EA6' />
                        </View>
                        <View>
                          <Text style={styles.memberText}>
                            {item.currentMember} / {item.maxCapacity}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </MeetingCard>
                );
              }}
            ></FlatList>
          </MeetingListView>
        )}
      </View>
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
    marginLeft: 55,
  },
  searchIcon: {
    position: 'relative',
    width: WIDTH * 0.06,
    height: HEIGHT * 0.03,
    left: 315,
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
