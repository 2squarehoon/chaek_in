import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  RefreshControl,
} from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { HOST } from '@env';
import BookItem from '../components/common/BookItem';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

function HomeScreen({ navigation }) {
  const { accessToken, nickname, userId } = useSelector((state) => state.main);
  const [bookNumber, changeBookNumber] = useState('');
  const [readingBooks, setReadingBooks] = useState([]);
  const [bookActive, setbookActive] = useState(0);
  const [meetingList, setMeetingList] = useState([]);
  const [randomNumber, setRandomNumber] = useState(1);
  const [meeting, setMeeting] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    Axios.get(`${HOST}/api/v1/books/me?isReading=true`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(function (response) {
        // console.log(response.data);
        setReadingBooks(response.data.books);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  function randomNum(min, max) {
    var randNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return randNum;
  }
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
    setRandomNumber(randomNum(1, meetingList.length + 1));
    // console.log(userId);
  }, []);

  useEffect(() => {
    Axios.get(`${HOST}/api/v1/meetings/${randomNumber}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(function (response) {
        setMeeting(response.data);
        console.log(randomNumber);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [randomNumber]);
  // 위도, 경도 받아오기

  const goToBookLog = (e) => {
    navigation.navigate('BookLogs');
  };

  const goToBookDetail = (e) => {
    navigation.navigate('BookDetail', { bookId: bookNumber });
  };

  const goBookDetail = (bookNumber) => {
    navigation.navigate('BookDetail', { bookId: bookNumber });
  };
  const printBook = (book) => {
    console.log(book);
  };
  const onchange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
      if (slide != bookActive) {
        setbookActive(slide);
      }
    }
  };

  return (
    <HomeScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      {/* <View>
        <Text>{nickname}님의 서재</Text>
        <Text>{userId}</Text>
      </View> */}
      <BookItemsContainer>
        <TitleText>{nickname}님이 읽고있는 책</TitleText>
        <ScrollView
          onScroll={({ nativeEvent }) => onchange(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
        >
          {readingBooks.map((book) => (
            <TouchableOpacity key={book.bookId} onPress={() => goBookDetail(book.bookId)}>
              <View style={styles.wrap}>
                <Image source={{ uri: book.cover }} resizeMode='stretch' style={styles.cover}></Image>
                <View style={styles.textView}>
                  <Text style={styles.title}>{book.title}</Text>
                  <Text style={styles.author}>{book.author}</Text>
                </View>
              </View>
            </TouchableOpacity>
            // <TouchableOpacity
            //   key={book.bookId}
            //   onPress={() => goBookDetail(book.bookId)}>
            //     <BookItem item={book} />
            // </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.wrapDot}>
          {readingBooks.map((book, index) => (
            <Text key={book.bookId} style={bookActive == index ? styles.dotActive : styles.dot}>
              ●
            </Text>
          ))}
        </View>
      </BookItemsContainer>
      <View style={styles.bottomSpace}></View>
      <MeetingText>이런 독서모임 어때요?</MeetingText>
      {/* 일단 placeholder를 책 cover로 해서 모임 예시 만들고 meetingId로 detail로 연결 */}
      {/* bookTitle, cover, meetingTitle, currentMember, maxCapacity */}
      <MyMeetingView onPress={() => navigation.navigate('MeetingDetail', { meetingId: 1 })}>
        <MyMeetingContainer>
          <MyMeetingCoverImage source={{ uri: meeting.cover }} />
          <MyMeetingContents>
            <MyMeetingTextContainer>
              <MyMeetingBookTitleText>책 제목</MyMeetingBookTitleText>
              <MyMeetingContentsText>{meeting.bookTitle}</MyMeetingContentsText>
            </MyMeetingTextContainer>
            <MyMeetingTextContainer>
              <MyMeetingTitleText>모임 제목</MyMeetingTitleText>
              <MyMeetingContentsText>{meeting.meetingTitle}</MyMeetingContentsText>
            </MyMeetingTextContainer>
            <MyMeetingTextContainer>
              <MyMeetingTitleText>모임 인원</MyMeetingTitleText>
              <MyMeetingContentsText>
                {meeting.currentMember} / {meeting.maxCapacity}
              </MyMeetingContentsText>
            </MyMeetingTextContainer>
          </MyMeetingContents>
        </MyMeetingContainer>
      </MyMeetingView>
      <View style={styles.bottomSpace}></View>
    </HomeScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcf9f0',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  wrap: {
    width: WIDTH * 0.845,
    height: HEIGHT * 0.21,
    flexDirection: 'row',
  },
  wrapDot: {
    position: 'relative',
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 10,
  },
  dotActive: {
    margin: 3,
    color: '#A8CA47',
  },
  dot: {
    margin: 3,
    color: 'gray',
  },
  cover: {
    width: WIDTH * 0.2,
    height: HEIGHT * 0.15,
    marginLeft: 15,
    marginRight: 15,
  },
  textView: {
    width: WIDTH * 0.5,
    height: HEIGHT * 0.3,
  },
  title: {
    marginTop: 10,
    fontFamily: 'Cochin',
    fontSize: 15,
    fontWeight: 'bold',
  },
  author: {
    marginTop: 10,
    fontFamily: 'Cochin',
    fontSize: 13,
    fontWeight: 'bold',
  },
  bottomSpace: {
    left: 45,
    width: WIDTH * 0.75,
    height: 8,
    borderWidth: 0.5,
    backgroundColor: '#728EA6',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});

const HomeScrollView = styled.ScrollView`
  flex: 1;
  background-color: #fcf9f0;
`;

const ChangeInput = styled.TextInput`
  width: 300px;
  height: 40px;
  border: 1px solid #000;
  border-radius: 5px;
`;

const TitleText = styled.Text`
  font-family: Light;
  font-size: 18px;
  margin-left: 8%;
  margin-top: 5%;
  margin-bottom: 5%;
`;

const BookItemsContainer = styled.View`
  margin-top: 5%;
  margin-left: 7.5%;
  margin-right: 7.5%;
  display: flex;
  border: 1px solid #000;
  border-radius: 20px;
  background-color: white;
`;

const MeetingText = styled.Text`
  flex: 1;
  font-family: 'Medium';
  font-size: 18px;
  margin: 20px 30px;
`;

const BookText = styled.Text`
  font-family: 'Medium';
  font-size: 14px;
  color: #b1d8e8;
`;

const MyMeetingContainer = styled.View`
  flex-direction: row;
  margin: 4%;
`;

const MyMeetingContents = styled.View`
  margin-left: 5%;
`;

const MyMeetingCoverImage = styled.Image`
  width: 20%;
  height: 100%;
  border-radius: 20px;
`;

const MyMeetingTitleText = styled.Text`
  font-family: 'Medium';
  font-size: 12px;
  margin-right: 3%;
`;

const MyMeetingBookTitleText = styled.Text`
  font-family: 'Medium';
  font-size: 12px;
  margin-right: 10%;
`;

const MyMeetingContentsText = styled.Text`
  font-family: 'Light';
  font-size: 12px;
`;

const MyMeetingTextContainer = styled.View`
  width: 70%
  flex-direction: row;
`;

const MyMeetingView = styled.TouchableOpacity`
  flex: 1;
  margin: 0 30px;
  border: 1px solid #000;
  border-radius: 20px;
  background-color: white;
`;

export default HomeScreen;
